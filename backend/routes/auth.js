import express from 'express';
import { register, login, refreshToken, logout } from '../controllers/authController.js';
import authMiddleware from '../middleware/authMiddleware.js';
import { validate } from '../middleware/validationMiddleware.js';
import { registerSchema, loginSchema } from '../validations/authSchema.js';

const router = express.Router();

router.post('/register', validate(registerSchema), register);
router.post('/login', validate(loginSchema), login);
router.post('/refresh-token', refreshToken);
router.post('/logout', authMiddleware, logout);

router.get('/me', authMiddleware, (req, res) => {
  res.json({ message: 'User info', user: req.user });
});

export default router;