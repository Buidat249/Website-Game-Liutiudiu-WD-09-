import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    cart_id: {
        type: Number,
        required: true,
        unique: true,
    },
    user_id: {
        type: mongoose.Schema.Types.Number,
        required: true,
        ref: 'User', // Tham chiếu đến model User
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
}, { timestamps: true });

export default mongoose.model("Cart", cartSchema);