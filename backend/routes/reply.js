import express from 'express';
import { createReply, getRepliesForThread, deleteReply } from '../controllers/replyController.js';
import authMiddleware from '../middleware/authMiddleware.js';
import { validate } from '../middleware/validationMiddleware.js';
import { createReplySchema } from '../validations/replySchema.js';

const router = express.Router();

router.get('/thread/:threadId', getRepliesForThread);
router.post('/', authMiddleware, validate(createReplySchema), createReply);
router.delete('/:id', authMiddleware, deleteReply);

export default router;