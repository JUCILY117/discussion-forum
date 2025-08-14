import express from 'express';
import { register, login } from '../controllers/authController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', authMiddleware, register);
router.post('/login', authMiddleware, login);

router.get('/me', authMiddleware, (req, res) => {
  res.json({ message: 'User info', user: req.user });
});

export default router;