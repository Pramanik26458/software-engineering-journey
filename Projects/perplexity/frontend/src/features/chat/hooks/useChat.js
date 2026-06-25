import { useDispatch, useSelector } from 'react-redux';
import { initializeSocketConnection } from '../service/chat.soket';
import {
  sendMessage, getChats, getMessages,
  deleteChat as deleteChatApi, submitMessageFeedback,
} from '../service/chat.api';
import {
  addNewMessage, setMessages, createNewChat, setChats,
  setCurrentChatId, setError, setLoading, setMessageFeedback,
  removeLastAssistantMessage, startStreamingMessage,
  finaliseStreamingMessage, deleteChatFromState, clearCurrentChat,
} from '../chat.slice';

// Normalize database "ai" role identifier to "assistant"
const norm = r => (r === 'ai' ? 'assistant' : r);

export const useChat = () => {
  const dispatch = useDispatch();
  const chats = useSelector(s => s.chat.chats || {});
  const currentChatId = useSelector(s => s.chat.currentChatId);

  // ── Send message ──────────────────────────────────────────────────────
  async function handleSendMessage({ message, chatId }) {
    try {
      dispatch(setLoading(true));
      dispatch(setError(null));

      // Optimistic user bubble + streaming placeholder
      if (chatId && chats[chatId]) {
        dispatch(addNewMessage({ chatId, content: message, role: 'user' }));
        dispatch(startStreamingMessage({ chatId }));
      }

      const data = await sendMessage({ message, chatId: chatId || null });
      const { chat, aiMessage, AiMessage } = data;
      const aiContent = aiMessage?.content || AiMessage || '';
      const targetChatId = chat?._id || chatId;

      if (!chatId && chat?._id) {
        dispatch(createNewChat({ chatId: chat._id, title: chat.title }));
        dispatch(addNewMessage({ chatId: chat._id, content: message, role: 'user' }));
        dispatch(addNewMessage({ chatId: chat._id, content: aiContent, role: 'assistant' }));
      } else {
        dispatch(finaliseStreamingMessage({ chatId: targetChatId, finalContent: aiContent }));
      }

      dispatch(setCurrentChatId(targetChatId));
    } catch (err) {
      const status = err.response?.status;
      const backendMsg = err.response?.data?.message;

      const friendly = status === 429
        ? "⏱️ AI quota limit reached. Please wait a minute and try again — or upgrade your Gemini API plan at ai.google.dev."
        : backendMsg || '⚠️ Something went wrong. Please try again.';

      if (chatId) {
        dispatch(finaliseStreamingMessage({
          chatId,
          finalContent: friendly,
        }));
      }
      dispatch(setError(friendly));
    } finally {
      dispatch(setLoading(false));
    }
  }

  // ── Open existing chat ────────────────────────────────────────────────
  async function handleOpenChat(chatId) {
    try {
      // Step 1: switch title context immediately
      dispatch(setCurrentChatId(chatId));
      dispatch(setError(null));

      // Step 2: fetch absolute truths from server bypassing volatile UI caches
      const data = await getMessages(chatId);
      const raw = data?.messages || [];

      // Step 3: structure application metrics correctly
      const formatted = raw.map(m => ({
        id: m._id || `msg-${Date.now()}-${Math.random()}`,
        content: m.content,
        role: norm(m.role), 
        feedback: null,
        isStreaming: false,
      }));

      // Step 4: Fallback label management if user loaded app directly on deep link
      const existingTitle = chats[chatId]?.title || 'Untitled Chat';

      // Step 5: Replace collection context
      dispatch(setMessages({ chatId, messages: formatted, title: existingTitle }));

    } catch (err) {
      console.error('handleOpenChat error:', err);
      dispatch(setError('Failed to load chat. Please try again.'));
    }
  }

  // ── Load sidebar list ─────────────────────────────────────────────────
  async function handleGetChats() {
    try {
      dispatch(setLoading(true));
      const data = await getChats();
      const list = data?.chats || [];

      const map = list.reduce((acc, c) => {
        acc[c._id] = {
          id: c._id,
          title: c.title,
          messages: [],
          lastUpdated: c.updatedAt || c.createdAt,
        };
        return acc;
      }, {});

      dispatch(setChats(map));
    } catch (err) {
      dispatch(setError(err.message));
    } finally {
      dispatch(setLoading(false));
    }
  }

  // ── Delete ────────────────────────────────────────────────────────────
  async function handleDeleteChat(chatId) {
    dispatch(deleteChatFromState(chatId));
    try {
      await deleteChatApi(chatId);
    } catch (err) {
      dispatch(setError(err.message));
      await handleGetChats();
    }
  }

  // ── Regenerate ────────────────────────────────────────────────────────
  async function handleRegenerateResponse() {
    if (!currentChatId) return;
    const msgs = chats[currentChatId]?.messages || [];
    const last = [...msgs].reverse().find(m => m.role === 'user');
    if (!last) return;
    dispatch(removeLastAssistantMessage({ chatId: currentChatId }));
    await handleSendMessage({ message: last.content, chatId: currentChatId });
  }

  // ── Feedback ──────────────────────────────────────────────────────────
  async function handleMessageFeedback({ chatId, messageId, feedback }) {
    dispatch(setMessageFeedback({ chatId, messageId, feedback }));
    try {
      await submitMessageFeedback({ messageId, feedback });
    } catch {
      dispatch(setMessageFeedback({ chatId, messageId, feedback: null }));
    }
  }

  const handleNewChat = () => dispatch(clearCurrentChat());

  return {
    initializeSocketConnection,
    handleSendMessage,
    handleGetChats,
    handleOpenChat,
    handleDeleteChat,
    handleRegenerateResponse,
    handleMessageFeedback,
    handleNewChat,
  };
};