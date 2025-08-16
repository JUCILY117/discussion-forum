import express from "express";
import { getCategories, addCategories, deleteCategories } from "../controllers/categoryController.js";
import authMiddleware from '../middleware/authMiddleware.js';
import adminMiddleware from '../middleware/adminMiddleware.js';

const router = express.Router();

router.get('/', getCategories);
router.post('/', authMiddleware, adminMiddleware, addCategories);
router.delete('/:id', authMiddleware, adminMiddleware, deleteCategories);


export default router;