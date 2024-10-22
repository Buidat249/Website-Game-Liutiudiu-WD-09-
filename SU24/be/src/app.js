import express from "express";
import gameRouter from "./routers/game";
import brandRouter from "./routers/brand";
import categoryRouter from "./routers/category";
import { connectDB } from "./config/db";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import authRouter from "./routers/auth";
const app = express();
// middleware
app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));




// connect database
connectDB("mongodb://0.0.0.0:27017/GAME_LIUTIUDIU");
app.use("", gameRouter);
app.use("", brandRouter);
app.use("", categoryRouter);
app.use("", authRouter);
export const viteNodeApp = app;

