import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    order_id: {
        type: Number,
        required: true,
        unique: true,
    },
    user_id: {
        type: mongoose.Schema.Types.Number,
        ref: "User", // Tham chiếu đến mô hình User
        required: true,
    },
    payment_method_id: {
        type: mongoose.Schema.Types.Number,
        ref: "payment_method", // Tham chiếu đến mô hình PaymentMethod
        required: true,
    },
    total_price: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        enum: ["pending", "completed", "canceled"], // Các trạng thái có thể
        default: "pending",
    },
    quantity: {
        type: Number,
        required: true,
    },
}, { timestamps: true });

export default mongoose.model("Order", orderSchema);
