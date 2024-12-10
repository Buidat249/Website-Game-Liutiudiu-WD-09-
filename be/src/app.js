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
import cartRouter from "./routers/cart";
import cart_itemRouter from "./routers/cart_item";
import platformRouter from "./routers/platform";
import roleRouter from "./routers/role";
import pay from "./routers/pay";
import filter from "./routers/filter";
import description from "./routers/description";
import description_detail from "./routers/desciption_detail";
import tintuc from "./routers/tintuc";
import categorynews from "./routers/categorynew";
import key from "./routers/key";
import transaction from "./routers/transaction";
const app = express();
// middleware
app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));

const PORT = 8080; // Đặt cổng cho backend

app.use(
  cors({
    origin: "http://localhost:5173", // Thay đổi thành địa chỉ frontend của bạn
  })
);

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
app.use("", cartRouter);
app.use("", cart_itemRouter);
app.use("", platformRouter);
app.use("", roleRouter);
app.use("", filter);
app.use("", description);
app.use("", description_detail);
app.use("", pay);
app.use("", tintuc)
app.use("", categorynews);
app.use("", key);
app.use("", transaction);
export const viteNodeApp = app;

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
