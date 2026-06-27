import express from 'express';
import {
  sendMessage,
  getChats,
  getMessages,
  deleteChat,
  messageFeedback,
} from '../controllers/chat.controller.js';
import { authUser } from '../middlewares/auth.middleware.js';

const router = express.Router();

// All routes protected by auth middleware
router.use(authUser);

// POST   /api/chats/message → send a message (new or existing chat)
router.post('/message', sendMessage);

// GET    /api/chats → get all chats for logged-in user
router.get('/', getChats);

// GET    /api/chats/:chatId/messages → get all messages for a chat
router.get('/:chatId/messages', getMessages);

// DELETE /api/chats/delete/:chatId → delete a chat + its messages
router.delete('/delete/:chatId', deleteChat);

// POST   /api/chats/message/:messageId/feedback → like/dislike a message
router.post('/message/:messageId/feedback', messageFeedback);

export default router;
