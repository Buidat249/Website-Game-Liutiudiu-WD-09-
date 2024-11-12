import mongoose from "mongoose";

const paySchema = new mongoose.Schema({
    pay_id: {
        type: Number,
        required: true,
        unique: false,
    },
    user_id: {
        type: mongoose.Schema.Types.Number,
        ref: "User", // Tham chiếu đến mô hình User
        required: true,
        unique: false,
    },
    game_id: [{
        type: mongoose.Schema.Types.Number,
        ref: "Game", // Tham chiếu đến mô hình Game
        required: true,
        unique: false,
    }],
    quantity: {
        type: Number,
        required: true,
        min: 1, // Số lượng ít nhất là 1
    },
})

export default mongoose.model("Pay", paySchema);