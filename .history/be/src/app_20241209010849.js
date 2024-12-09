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
import payRouter from "./routers/pay";
import filterRouter from "./routers/filter";
import descriptionRouter from "./routers/description";
import description_detailRouter from "./routers/description_detail";
import tintucRouter from "./routers/tintuc";
import categorynewsRouter from "./routers/categorynews";
import keyRouter from "./routers/key";

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));

const PORT = 8080; // Đặt cổng cho backend

app.use(
  cors({
    origin: "http://localhost:5173", // Thay đổi thành địa chỉ frontend của bạn
  })
);

// Kết nối database
connectDB("mongodb://0.0.0.0:27017/GAME_LIUTIUDIU");

// Đảm bảo các router đều được import chính xác
console.log(gameRouter); // Kiểm tra router game có undefined không

// Sử dụng các router với đường dẫn rõ ràng
app.use("/games", gameRouter);
app.use("/brands", brandRouter);
app.use("/categories", categoryRouter);
app.use("/users", userRouter);
app.use("/orders", orderRouter);
app.use("/payment-methods", payment_methodRouter);
app.use("/order-details", order_detailRouter);
app.use("/reviews", reviewRouter);
app.use("/carts", cartRouter);
app.use("/cart-items", cart_itemRouter);
app.use("/platforms", platformRouter);
app.use("/roles", roleRouter);
app.use("/pay", payRouter);
app.use("/filters", filterRouter);
app.use("/descriptions", descriptionRouter);
app.use("/description-details", description_detailRouter);
app.use("/news", tintucRouter);
app.use("/category-news", categorynewsRouter);
app.use("/keys", keyRouter);

// Expose the express app for ViteNode (nếu bạn sử dụng Vite)
export const viteNodeApp = app;

// Lắng nghe cổng backend
app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
