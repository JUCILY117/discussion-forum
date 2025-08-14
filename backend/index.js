import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRouter from './routes/auth.js';
import prisma from './prismaClient.js';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use('/auth', authRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server running on http://localhost:${process.env.PORT || 5000}`);
});