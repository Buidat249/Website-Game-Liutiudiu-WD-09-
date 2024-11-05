import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    review_id: {
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
    game_id: {
        type: mongoose.Schema.Types.Number,
        required: true,
        ref: 'Game', // Tham chiếu đến model Game
        unique: true,
    },
    title: {
        type: String,
        required: true,
    },
    comment: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
}, { timestamps: true });

export default mongoose.model("Review", reviewSchema);