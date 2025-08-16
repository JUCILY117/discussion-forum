import express from 'express';
import { createThread, getThreads, getThreadById, deleteThread, addTagToThread, removeTagFromThread } from '../controllers/threadController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getThreads);
router.get('/:id', getThreadById);
router.post('/', authMiddleware, createThread);
router.delete('/:id', authMiddleware, deleteThread);
router.post('/:id/tags', authMiddleware, addTagToThread);
router.delete('/:id/tags/:tagId', authMiddleware, removeTagFromThread);

export default router;