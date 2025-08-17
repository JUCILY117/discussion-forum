import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import { vote } from '../controllers/voteController.js';
import { validate } from '../middleware/validationMiddleware.js';
import { voteSchema } from '../validations/voteSchema.js';

const router = express.Router();

router.post('/', authMiddleware, validate(voteSchema), vote);

export default router;