import express from 'express';
import { createReply, getRepliesForThread, deleteReply } from '../controllers/replyController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/thread/:threadId', getRepliesForThread);
router.post('/', authMiddleware, createReply);
router.delete('/:id', authMiddleware, deleteReply);

export default router;