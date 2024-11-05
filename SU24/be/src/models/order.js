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
        unique: true,
    },
    payment_method_id: {
        type: mongoose.Schema.Types.Number,
        ref: "Payment_Method", // Tham chiếu đến mô hình PaymentMethod
        required: true,
        unique: true,
    },
    total_price: {
        type: Number,
        required: true,
        min: 0, // Tổng giá tiền không được âm
    },
    status: {
        type: String,
        enum: ["pending", "completed", "canceled"], // Các trạng thái có thể
        default: "pending",
    },
    quantity: {
        type: Number,
        required: true,
        min: 1, // Số lượng ít nhất là 1
    },
}, { timestamps: true });

export default mongoose.model("Order", orderSchema);
