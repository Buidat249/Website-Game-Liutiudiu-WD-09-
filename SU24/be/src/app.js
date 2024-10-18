import express from "express";
import productRouter from "./routers/product";
import { connectDB } from "./config/db";
import cors from "cors";
import morgan from "morgan";
import AuthRouter from " ./auth/router/auth.js"
const app = express();
// middleware
app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));


// connect database
connectDB("mongodb://0.0.0.0:27017/GAME_LIUTIUDIU");
app.use('/auth', AuthRouter)
app.use("/api", productRouter);
export const viteNodeApp = app;