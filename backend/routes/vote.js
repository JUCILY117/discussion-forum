import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import { vote } from '../controllers/voteController.js';

const router = express.Router();

router.post('/', authMiddleware, vote);

export default router;