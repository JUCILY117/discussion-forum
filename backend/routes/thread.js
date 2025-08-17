import express from 'express';
import { createThread, getThreads, getThreadById, deleteThread, addTagToThread, removeTagFromThread } from '../controllers/threadController.js';
import authMiddleware from '../middleware/authMiddleware.js';
import { validate } from '../middleware/validationMiddleware.js';
import { createThreadSchema } from '../validations/threadSchema.js';

const router = express.Router();

router.get('/', getThreads);
router.get('/:id', getThreadById);
router.post('/', authMiddleware, validate(createThreadSchema), createThread);
router.delete('/:id', authMiddleware, deleteThread);
router.post('/:id/tags', authMiddleware, addTagToThread);
router.delete('/:id/tags/:tagId', authMiddleware, removeTagFromThread);

export default router;