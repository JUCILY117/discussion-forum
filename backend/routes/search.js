import express from 'express';
import { searchThreads } from '../controllers/searchController.js';

const router = express.Router();

router.get('/', searchThreads);

export default router;
