import { chatbot } from '../controllers/chatbot.js';
import express from 'express';
import Router from 'express';

const router = express.Router();
router.post('/chat', chatbot);

export default router;