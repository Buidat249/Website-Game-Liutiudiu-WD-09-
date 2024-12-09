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
import description_detailRouter from "./routers/desciption_detail";
import tintucRouter from "./routers/tintuc";
import categorynewsRouter from "./routers/categorynew";
import keyRouter from "./routers/key";

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));

// CORS settings
app.use(
  cors({
    origin: "http://localhost:5173", // Thay đổi thành địa chỉ frontend của bạn
  })
);

// Connect to MongoDB
connectDB("mongodb://localhost:27017/GAME_LIUTIUDIU");  // Đảm bảo rằng MongoDB đang chạy và địa chỉ chính xác

// Define routes
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
app.use("/filter", filterRouter);
app.use("/descriptions", descriptionRouter);
app.use("/description-details", description_detailRouter);
app.use("/pay", payRouter);
app.use("/news", tintucRouter);
app.use("/categorynews", categorynewsRouter);
app.use("/keys", keyRouter);

// Export the app
export const viteNodeApp = app;

// Start server
const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
