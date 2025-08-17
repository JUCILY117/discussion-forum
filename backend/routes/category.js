import express from "express";
import { getCategories, addCategories, deleteCategories } from "../controllers/categoryController.js";
import authMiddleware from '../middleware/authMiddleware.js';
import adminMiddleware from '../middleware/adminMiddleware.js';
import { validate } from '../middleware/validationMiddleware.js';
import { createCategorySchema } from '../validations/categorySchema.js';

const router = express.Router();

router.get('/', getCategories);
router.post('/', authMiddleware, adminMiddleware, validate(createCategorySchema), addCategories);
router.delete('/:id', authMiddleware, adminMiddleware, deleteCategories);


export default router;