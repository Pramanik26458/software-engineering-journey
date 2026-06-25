import { createSlice } from '@reduxjs/toolkit';

const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    chats: {},
    currentChatId: null,
    isLoading: false,
    isStreaming: false,
    streamingChatId: null,
    error: null,
  },
  reducers: {
    createNewChat: (state, action) => {
      const { chatId, title } = action.payload;
      state.chats[chatId] = {
        id: chatId, title,
        messages: [],
        lastUpdated: new Date().toISOString(),
      };
      state.currentChatId = chatId;
    },

    addNewMessage: (state, action) => {
      const { chatId, content, role } = action.payload;
      if (!state.chats[chatId]) return;
      state.chats[chatId].messages.push({
        id: `${Date.now()}-${Math.random()}`,
        content, role, feedback: null, isStreaming: false,
      });
      state.chats[chatId].lastUpdated = new Date().toISOString();
    },

    startStreamingMessage: (state, action) => {
      const { chatId } = action.payload;
      if (!state.chats[chatId]) return;
      state.isStreaming = true;
      state.streamingChatId = chatId;
      state.chats[chatId].messages.push({
        id: `streaming-${Date.now()}`,
        content: '', role: 'assistant', feedback: null, isStreaming: true,
      });
    },

    finaliseStreamingMessage: (state, action) => {
      const { chatId, finalContent } = action.payload;
      if (!state.chats[chatId]) return;
      const last = state.chats[chatId].messages.at(-1);
      if (last?.isStreaming) {
        last.isStreaming = false;
        if (finalContent !== undefined) last.content = finalContent;
      }
      state.isStreaming = false;
      state.streamingChatId = null;
    },

    setMessageFeedback: (state, action) => {
      const { chatId, messageId, feedback } = action.payload;
      if (!state.chats[chatId]) return;
      const msg = state.chats[chatId].messages.find(m => m.id === messageId);
      if (msg) msg.feedback = msg.feedback === feedback ? null : feedback;
    },

    removeLastAssistantMessage: (state, action) => {
      const { chatId } = action.payload;
      if (!state.chats[chatId]) return;
      const msgs = state.chats[chatId].messages;
      for (let i = msgs.length - 1; i >= 0; i--) {
        if (msgs[i].role === 'assistant') { msgs.splice(i, 1); break; }
      }
    },

    setMessages: (state, action) => {
      const { chatId, messages, title } = action.payload;

      // Ensure the chat slot always exists before writing messages
      if (!state.chats[chatId]) {
        state.chats[chatId] = {
          id: chatId,
          title: title || 'Conversation',
          messages: [],
          lastUpdated: new Date().toISOString(),
        };
      }

      // REPLACE entirely — never append (prevents duplicates on re-click)
      state.chats[chatId].messages = messages.map(m => ({
        id: m.id || `${Date.now()}-${Math.random()}`,
        content: m.content,
        role: m.role,
        feedback: null,
        isStreaming: false,
      }));
    },

    setChats: (state, action) => {
      state.chats = action.payload;
    },

    setCurrentChatId: (state, action) => {
      state.currentChatId = action.payload;
    },

    deleteChatFromState: (state, action) => {
      const chatId = action.payload;
      delete state.chats[chatId];
      if (state.currentChatId === chatId) {
        const next = Object.values(state.chats)
          .sort((a, b) => new Date(b.lastUpdated) - new Date(a.lastUpdated))[0];
        state.currentChatId = next?.id || null;
      }
    },

    setLoading: (state, action) => { state.isLoading = action.payload; },
    setError:   (state, action) => { state.error     = action.payload; },
    clearCurrentChat: (state)   => { state.currentChatId = null; },
  },
});

export const {
  createNewChat, addNewMessage, startStreamingMessage,
  finaliseStreamingMessage, setMessageFeedback,
  removeLastAssistantMessage, setMessages, setChats,
  setCurrentChatId, deleteChatFromState,
  setLoading, setError, clearCurrentChat,
} = chatSlice.actions;

export default chatSlice.reducer;