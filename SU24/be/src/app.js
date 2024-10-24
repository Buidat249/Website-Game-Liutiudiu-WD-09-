import express from "express";
import brandRouter from "./routers/brand";
import categoryRouter from "./routers/category";
import { connectDB } from "./config/db";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import userRouter from "./routers/user";
import orderRouter from "./routers/order";
import payment_methodRouter from "./routers/payment_method";
import order_detailRouter from "./routers/order_detail";
import reviewRouter from "./routers/review";
import gameRouter from "./routers/game";

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
app.use("", userRouter);
app.use("", orderRouter);
app.use("", payment_methodRouter);
app.use("", order_detailRouter);
app.use("", reviewRouter);
export const viteNodeApp = app;
