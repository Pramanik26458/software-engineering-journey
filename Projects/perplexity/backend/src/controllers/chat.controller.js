import { generateResponse, generateChatTitle } from '../service/ai.service.js';
import chatModel from '../models/chat.model.js';
import messageModel from '../models/message.model.js';

// ── Retry helper for rate limits ──────────────────────────────────────────────
async function withRetry(fn, maxRetries = 3) {
  let lastErr;
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      return await fn();
    } catch (err) {
      lastErr = err;
      const is429 = err.status === 429
        || err.statusText === 'Too Many Requests'
        || err.message?.includes('429')
        || err.message?.includes('quota');

      if (!is429) throw err;

      const retryDelaySec = err.errorDetails
        ?.find(d => d['@type']?.includes('RetryInfo'))
        ?.retryDelay?.replace('s', '');

      const waitMs = retryDelaySec
        ? parseFloat(retryDelaySec) * 1000 + 500
        : (attempt + 1) * 4000;

      console.log(`Rate limited — retrying in ${Math.round(waitMs / 1000)}s (attempt ${attempt + 1}/${maxRetries})`);
      await new Promise(r => setTimeout(r, waitMs));
    }
  }
  throw lastErr;
}

// ── Send message ──────────────────────────────────────────────────────────────
export async function sendMessage(req, res) {
  try {
    const { message, chat: chatId } = req.body;

    if (!message?.trim()) {
      return res.status(400).json({ message: 'Message is required.' });
    }

    let title = null, chat = null;

    if (!chatId) {
      title = await generateChatTitle(message);
      chat = await chatModel.create({ user: req.user.id, title });
    } else {
      chat = await chatModel.findOne({ _id: chatId, user: req.user.id });
      if (!chat) {
        return res.status(404).json({ message: 'Chat not found.' });
      }
    }

    const targetChatId = chat._id;

    // Save user message
    await messageModel.create({ chat: targetChatId, content: message, role: 'user' });

    // Fetch full conversation history
    const history = await messageModel.find({ chat: targetChatId }).sort({ createdAt: 1 });

    // Generate AI response with retry logic
    const result = await withRetry(() => generateResponse(history));

    // Save AI response
    const aiMessage = await messageModel.create({
      chat: targetChatId,
      content: result,
      role: 'ai',
    });

    res.status(201).json({ chat, aiMessage, title });

  } catch (err) {
    console.error('sendMessage error:', err);

    const is429 = err.status === 429
      || err.message?.includes('429')
      || err.message?.includes('quota');

    if (is429) {
      return res.status(429).json({
        message: "⏱️ AI quota exceeded. Please wait a minute and try again.",
      });
    }

    res.status(500).json({ message: err.message || 'Something went wrong.' });
  }
}

// ── Get all chats for user ────────────────────────────────────────────────────
export async function getChats(req, res) {
  try {
    const chats = await chatModel
      .find({ user: req.user.id })
      .sort({ updatedAt: -1 });

    res.status(200).json({ message: 'Chats retrieved successfully', chats });
  } catch (err) {
    console.error('getChats error:', err);
    res.status(500).json({ message: err.message });
  }
}

// ── Get messages for a chat ───────────────────────────────────────────────────
export async function getMessages(req, res) {
  try {
    const { chatId } = req.params;

    const chat = await chatModel.findOne({ _id: chatId, user: req.user.id });
    if (!chat) {
      return res.status(404).json({ message: 'Chat not found.' });
    }

    const messages = await messageModel
      .find({ chat: chatId })
      .sort({ createdAt: 1 });

    res.status(200).json({ message: 'Messages retrieved successfully', messages });
  } catch (err) {
    console.error('getMessages error:', err);
    res.status(500).json({ message: err.message });
  }
}

// ── Delete a chat ─────────────────────────────────────────────────────────────
export async function deleteChat(req, res) {
  try {
    const { chatId } = req.params;

    const chat = await chatModel.findOneAndDelete({ _id: chatId, user: req.user.id });
    if (!chat) {
      return res.status(404).json({ message: 'Chat not found.' });
    }

    await messageModel.deleteMany({ chat: chatId });

    res.status(200).json({ message: 'Chat deleted successfully.' });
  } catch (err) {
    console.error('deleteChat error:', err);
    res.status(500).json({ message: err.message });
  }
}

// ── Message feedback (like / dislike) ─────────────────────────────────────────
export async function messageFeedback(req, res) {
  try {
    const { messageId } = req.params;
    const { feedback } = req.body;

    if (!['like', 'dislike'].includes(feedback)) {
      return res.status(400).json({ message: 'Invalid feedback value.' });
    }

    // Note: message model doesn't have a feedback field currently.
    // We return success silently so the frontend UI toggle works.
    // To persist feedback, add a `feedback` field to the message schema.
    const message = await messageModel.findById(messageId);
    if (!message) {
      return res.status(404).json({ message: 'Message not found.' });
    }

    res.status(200).json({ message: 'Feedback recorded.', success: true });
  } catch (err) {
    console.error('messageFeedback error:', err);
    res.status(500).json({ message: err.message });
  }
}
