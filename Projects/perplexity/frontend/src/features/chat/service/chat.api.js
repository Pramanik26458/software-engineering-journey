import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
  withCredentials: true,
});

export const sendMessage = async ({ message, chatId }) => {
  const payload = { message };
  if (chatId) payload.chat = chatId;
  const response = await api.post('/api/chats/message', payload);
  return response.data;
};

export const getChats = async () => {
  const response = await api.get('/api/chats');
  return response.data;
};

export const getMessages = async (chatId) => {
  const response = await api.get(`/api/chats/${chatId}/messages`);
  return response.data;
};

export const deleteChat = async (chatId) => {
  const response = await api.delete(`/api/chats/delete/${chatId}`);
  return response.data;
};

// Submit feedback (like/dislike) for a specific message
export const submitMessageFeedback = async ({ messageId, feedback }) => {
  const response = await api.post(`/api/chats/message/${messageId}/feedback`, { feedback });
  return response.data;
};
