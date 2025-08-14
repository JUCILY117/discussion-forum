const express=require("express")
const authMiddleware=require("../middleware/authMiddleware.js")
const {voteThread}=require("../controllers/voteController.js")

const router = express.Router();

router.post('/', authMiddleware, voteThread);

module.exports=router