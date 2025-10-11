import express from 'express';
import { getProfile, updateProfile, getPublicProfileByUsername } from '../controllers/profileController.js';
import authMiddleware from '../middleware/authMiddleware.js';
import { validate } from '../middleware/validationMiddleware.js';
import { updateProfileSchema } from '../validations/profileSchema.js';

const router = express.Router();

router.get('/me', authMiddleware, getProfile);
router.get('/:username', getPublicProfileByUsername);
router.put('/me', authMiddleware, validate(updateProfileSchema), updateProfile);

export default router;