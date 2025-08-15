import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { voteThread } from "../controllers/voteController.js";

const router = express.Router();

router.post("/", authMiddleware, voteThread);

export default router;
