import express from 'express';
import { getProfile, getPublicProfileByUsername, updateProfile } from '../controllers/profileController.js';
import authMiddleware from '../middleware/authMiddleware.js';
import { upload } from '../middleware/uploadMiddleware.js';

const router = express.Router();

router.get('/me', authMiddleware, getProfile);
router.get('/:username', getPublicProfileByUsername);
router.put('/me', authMiddleware, upload.fields([
    { name: "avatar", maxCount: 1 },
    { name: "bannerImage", maxCount: 1 },
]), updateProfile);

export default router;