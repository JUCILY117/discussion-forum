import cookieParser from 'cookie-parser';
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import http from 'http';
import authRouter from './routes/auth.js';
import categoryRoutes from './routes/category.js';
import profileRoutes from './routes/profile.js';
import replyRoutes from './routes/reply.js';
import searchRoutes from "./routes/search.js";
import tagRoutes from './routes/tag.js';
import threadRoutes from './routes/thread.js';
import voteRoutes from './routes/vote.js';
import { initSocket } from './utils/socketServer.js';

dotenv.config();
const app = express();

app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true,
}));

app.use(express.json());
app.use(cookieParser());

app.use("/uploads", express.static("uploads"));

app.use('/auth', authRouter);
app.use('/threads', threadRoutes);
app.use('/vote', voteRoutes);
app.use('/replies', replyRoutes);
app.use("/tags", tagRoutes);
app.use("/categories", categoryRoutes)
app.use("/search", searchRoutes);
app.use("/profile", profileRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const server = http.createServer(app);
initSocket(server);

server.listen(process.env.PORT || 8080, () => {
  console.log(`Server running on http://localhost:${process.env.PORT || 8080}`);
});
