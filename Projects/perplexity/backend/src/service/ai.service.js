import { ChatOpenAI } from "@langchain/openai";
import { HumanMessage, AIMessage, SystemMessage } from "@langchain/core/messages";
import { tavily } from "@tavily/core";

// 1. Initialize Tavily
const tvly = tavily({ apiKey: process.env.TAVILY_API_KEY });

// 2. Best performing free models pool
const FREE_MODELS_POOL = [
  "google/gemini-2.5-flash",
  "meta-llama/llama-3.3-70b-instruct:free",
  "openrouter/auto"
];

function createModelInstance(modelName) {
  return new ChatOpenAI({
    model: modelName,
    apiKey: process.env.OPENROUTER_API_KEY,
    temperature: 0.3,
    configuration: { baseURL: "https://openrouter.ai/api/v1" },
  });
}

// 3. Search function with limit
export const searchInternet = async ({ query }) => {
  try {
    const cleanQuery = String(query || "").trim().slice(0, 350);
    const response = await tvly.search(cleanQuery, { maxResults: 3, searchDepth: "advanced" });
    return response?.results?.length > 0 
      ? response.results.map((r, i) => `[${i + 1}]: ${r.title}\n${r.content}`).join("\n")
      : "No results.";
  } catch { return "No internet."; }
};

// 4. Invocation logic with 30s timeout
async function invokeWithFallback(formattedMessages) {
  for (const modelSlug of FREE_MODELS_POOL) {
    try {
      console.log(`🤖 Using model: ${modelSlug}`);
      const modelInstance = createModelInstance(modelSlug);
      
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000); 

      const response = await modelInstance.invoke(formattedMessages, { signal: controller.signal });
      
      clearTimeout(timeoutId);
      return response;
    } catch (e) {
      console.warn(`⚠️ Model ${modelSlug} failed or timed out.`);
    }
  }
  throw new Error("All available AI models failed to respond.");
}

// 5. Main Generation Function
export async function genertaeResponse(messages) {
  const userMessages = messages.filter(msg => msg.role === 'user');
  let searchQuery = userMessages[userMessages.length - 1]?.content || "";

  if (userMessages.length > 1 && searchQuery.length < 30) {
    searchQuery = `${userMessages[userMessages.length - 2].content} ${searchQuery}`;
  }

  const searchResults = await searchInternet({ query: searchQuery });
  const formattedMessages = [new SystemMessage("You are a helpful assistant.")];

  messages.forEach((msg) => {
    formattedMessages.push(msg.role === "user" ? new HumanMessage(msg.content) : new AIMessage(msg.content));
  });

  if (!searchResults.includes("No internet")) {
    const lastIdx = formattedMessages.length - 1;
    formattedMessages[lastIdx] = new HumanMessage(`Context from Internet:\n${searchResults}\n\nQuestion: ${formattedMessages[lastIdx].content}`);
  }

  const response = await invokeWithFallback(formattedMessages);
  return response.content;
}

// 6. Title Generator
export async function generateChatTitle(message) {
  try {
    const prompt = [new SystemMessage("Short title (max 3 words)."), new HumanMessage(message)];
    const response = await invokeWithFallback(prompt);
    return response.content.replace(/['"*#]/g, "").trim();
  } catch { return "New Chat"; }
}