const express=require("express")
const authMiddleware=require("../middleware/authMiddleware")
const {createReply,getRepliesByThread,deleteReply}=require("../controllers/replyController")
const router=express.Router()

router.post("/",authMiddleware,createReply)

router.get("/thread/:threadId",getRepliesByThread)
router.delete("/:id",authMiddleware,deleteReply)
