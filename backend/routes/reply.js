import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { createReply, getRepliesByThread, deleteReply } from "../controllers/replyController.js";

const router = express.Router();

router.post("/", authMiddleware, createReply);

router.get("/thread/:threadId", getRepliesByThread);
router.delete("/:id", authMiddleware, deleteReply);

export default router;
