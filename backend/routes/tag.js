import express from "express";
import { createTag, getTags, deleteTag }  from "../controllers/tagController.js";
import authMiddleware from '../middleware/authMiddleware.js';
import { validate } from '../middleware/validationMiddleware.js';
import { createTagSchema } from '../validations/tagSchema.js';

const router = express.Router();

router.get('/', getTags);
router.post('/', authMiddleware, validate(createTagSchema), createTag);
router.delete('/:id', authMiddleware, deleteTag);

export default router;