import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRouter from './routes/auth.js';
import threadRoutes from './routes/thread.js'
import voteRoutes from './routes/vote.js';
import replyRoutes from './routes/reply.js';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use('/auth', authRouter);
app.use('/threads', threadRoutes);
app.use('/vote', voteRoutes);
app.use('/replies', replyRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server running on http://localhost:${process.env.PORT || 5000}`);
});