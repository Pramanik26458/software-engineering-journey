import { ChatOpenAI } from "@langchain/openai";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { ChatMistralAI } from "@langchain/mistralai";
import { HumanMessage, AIMessage, SystemMessage } from "@langchain/core/messages";
import { tavily } from "@tavily/core";

// ── Tavily ────────────────────────────────────────────────────────────────────
const tvly = tavily({ apiKey: process.env.TAVILY_API_KEY });

// ── Model registry — uses YOUR direct API keys, fastest first ────────────────
function buildModelPool() {
  const pool = [];

  // 1. Gemini 2.0 Flash — fastest, your own key, no rate queue
  if (process.env.GEMINI_API_KEY) {
    pool.push({
      name: "Gemini 2.0 Flash",
      create: () => new ChatGoogleGenerativeAI({
        model: "gemini-2.0-flash",
        apiKey: process.env.GEMINI_API_KEY,
        temperature: 0.3,
        maxOutputTokens: 2048,
      }),
    });
  }

  // 2. Gemini 1.5 Flash — fallback Gemini
  if (process.env.GEMINI_API_KEY) {
    pool.push({
      name: "Gemini 1.5 Flash",
      create: () => new ChatGoogleGenerativeAI({
        model: "gemini-1.5-flash",
        apiKey: process.env.GEMINI_API_KEY,
        temperature: 0.3,
        maxOutputTokens: 2048,
      }),
    });
  }

  // 3. Mistral Small — faster
  if (process.env.MISTRAL_API_KEY) {
    pool.push({
      name: "Mistral Small",
      create: () => new ChatMistralAI({
        model: "mistral-small-latest",
        apiKey: process.env.MISTRAL_API_KEY,
        temperature: 0.3,
        maxTokens: 2048,
      }),
    });
  }

  // 4. Mistral Large — more powerful, slower as compare to the small
  if (process.env.MISTRAL_API_KEY) {
    pool.push({
      name: "Mistral Large",
      create: () => new ChatMistralAI({
        model: "mistral-large-latest",
        apiKey: process.env.MISTRAL_API_KEY,
        temperature: 0.3,
        maxTokens: 2048,
      }),
    });
  }

  // 5. OpenRouter — last resort
  if (process.env.OPENROUTER_API_KEY) {
    pool.push({
      name: "OpenRouter (LLaMA 70B)",
      create: () => new ChatOpenAI({
        model: "meta-llama/llama-3.3-70b-instruct:free",
        apiKey: process.env.OPENROUTER_API_KEY,
        temperature: 0.3,
        configuration: { baseURL: "https://openrouter.ai/api/v1" },
      }),
    });
  }

  if (pool.length === 0) {
    throw new Error("No AI API keys configured. Add GEMINI_API_KEY or MISTRAL_API_KEY to your .env");
  }

  console.log(`✓ AI model pool ready: ${pool.map(m => m.name).join(", ")}`);
  return pool;
}

const MODEL_POOL = buildModelPool();

// ── Invoke with fallback chain ────────────────────────────────────────────────
async function invokeWithFallback(formattedMessages) {
  for (const entry of MODEL_POOL) {
    try {
      console.log(`🤖 Using: ${entry.name}`);
      const model = entry.create();

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 25000);

      const response = await model.invoke(formattedMessages, {
        signal: controller.signal,
      });

      clearTimeout(timeoutId);
      console.log(`✅ Response from: ${entry.name}`);
      return response;
    } catch (err) {
      clearTimeout && clearTimeout();
      const is429 = err.status === 429
        || err.message?.includes('429')
        || err.message?.includes('quota')
        || err.message?.includes('rate');

      console.warn(`⚠️  ${entry.name} failed: ${err.message?.slice(0, 80)}`);

      if (is429) {
        console.log(`   → Rate limited, trying next model...`);
        continue;
      }

      // For non-rate-limit errors, still try next model
      continue;
    }
  }
  throw new Error("All AI models failed to respond. Please try again in a moment.");
}

// ── Web search trigger keywords ───────────────────────────────────────────────
function needsWebSearch(query) {
  const q = query.toLowerCase();
  const triggers = [
    'today', 'news', 'latest', 'current', 'now', 'recent', 'right now',
    'this week', 'this month', 'this year', 'live', 'update', 'happened',
    'score', 'match', 'ipl', 'cricket', 'nfl', 'nba', 'standings', 'result',
    'price', 'bitcoin', 'crypto', 'stock', 'market', 'rate', 'exchange',
    'weather', 'temperature', 'forecast',
    'prime minister', 'president', 'ceo', 'founder', 'who is', 'who won',
    'headline', 'trending', 'viral', 'announced', 'launched', 'released',
  ];
  return triggers.some(t => q.includes(t));
}

// ── Tavily web search ─────────────────────────────────────────────────────────
export const searchInternet = async ({ query }) => {
  try {
    const cleanQuery = String(query || "").trim().slice(0, 350);
    if (!cleanQuery) return null;

    const response = await tvly.search(cleanQuery, {
      maxResults: 4,
      searchDepth: "advanced",
    });

    if (!response?.results?.length) return null;

    return response.results
      .map((r, i) => `[${i + 1}] **${r.title}**\n${r.content}\nSource: ${r.url}`)
      .join("\n\n");
  } catch (err) {
    console.warn("Tavily search failed:", err.message);
    return null;
  }
};

// ── Main response generator ───────────────────────────────────────────────────
export async function generateResponse(messages) {
  const userMessages = messages.filter(msg => msg.role === 'user');
  const latestUserQuery = userMessages[userMessages.length - 1]?.content || "";

  // Build search query with context
  let searchQuery = latestUserQuery;
  if (userMessages.length > 1 && latestUserQuery.length < 40) {
    searchQuery = `${userMessages[userMessages.length - 2].content} ${latestUserQuery}`;
  }

  // Only search when needed
  let searchResults = null;
  if (process.env.TAVILY_API_KEY && needsWebSearch(searchQuery)) {
    console.log(`🔍 Web search triggered for: "${searchQuery.slice(0, 60)}"`);
    searchResults = await searchInternet({ query: searchQuery });
  }

  // System prompt
  const systemPrompt = searchResults
    ? `You are Perplexity, a helpful AI assistant with access to real-time web search results.

Web Search Results:
${searchResults}

Instructions:
- Use the search results above to give accurate, up-to-date answers
- Cite sources inline like [1], [2] etc. when using their information
- If results don't fully answer the question, supplement with your knowledge
- Format responses in clean Markdown (headings, bullets, bold, code blocks)
- Be concise but comprehensive`
    : `You are Perplexity, a helpful AI assistant for research, writing, coding, and analysis.

Format responses in clean Markdown — use headings, bullet points, bold text, and code blocks where appropriate. Be concise yet thorough.`;

  const formattedMessages = [new SystemMessage(systemPrompt)];

  messages.forEach((msg) => {
    if (msg.role === "user") {
      formattedMessages.push(new HumanMessage(msg.content));
    } else {
      formattedMessages.push(new AIMessage(msg.content));
    }
  });

  const response = await invokeWithFallback(formattedMessages);
  return response.content;
}

// Backward-compatible alias
export const genertaeResponse = generateResponse;

// ── Chat title generator ──────────────────────────────────────────────────────
export async function generateChatTitle(message) {
  try {
    const prompt = [
      new SystemMessage("Generate a short title (2-4 words max) for a chat starting with this message. Reply with ONLY the title — no quotes, no punctuation at end."),
      new HumanMessage(message.slice(0, 200)),
    ];
    const response = await invokeWithFallback(prompt);
    return response.content.replace(/['\"*#\n]/g, "").trim().slice(0, 50) || "New Chat";
  } catch {
    return "New Chat";
  }
}