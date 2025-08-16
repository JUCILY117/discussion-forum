import express from 'express';
import { createThread, getThreads, getThreadById, deleteThread } from '../controllers/threadController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getThreads);
router.get('/:id', getThreadById);
router.post('/', authMiddleware, createThread);
router.delete('/:id', authMiddleware, deleteThread);

export default router;