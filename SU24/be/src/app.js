import express from "express";
import gameRouter from "./routers/game";
import brandRouter from "./routers/brand";
import categoryRouter from "./routers/category";
import { connectDB } from "./config/db";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import AuthRouter from " ./auth/router/auth.js"
const app = express();
// middleware
app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));


<<<<<<< HEAD
app.use("", gameRouter);
app.use("", brandRouter);
app.use("", categoryRouter);
export const viteNodeApp = app;
=======
// connect database
connectDB("mongodb://0.0.0.0:27017/GAME_LIUTIUDIU");
app.use('/auth', AuthRouter)
app.use("/api", productRouter);
export const viteNodeApp = app;
>>>>>>> 6c270a0f4baf48bb281ab4f8271bba2ddab5567d
