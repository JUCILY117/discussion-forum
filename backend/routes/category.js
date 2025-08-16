import express from "express";
import { getCategories } from "../controllers/categoryController.js";

const router = express.Router();

router.get('/', getCategories);
router.post('/', authMiddleware, addCategories);
router.delete('/:id', authMiddleware, deleteCategories);


export default router;