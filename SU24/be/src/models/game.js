import mongoose from "mongoose";

const gameSchema = new mongoose.Schema({
    game_id: {
        type: Number,
        required: true,
        unique: true,
    },
    brand_id: {
        type: mongoose.Schema.Types.Number,
        required: true,
        ref: 'brand', // Tham chiếu đến model Brand
        unique: true,
    },
    category_id: {
        type: mongoose.Schema.Types.Number,
        required: true,
        ref: 'category', // Tham chiếu đến model Category
        unique: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: String,
    price: {
        type: Number,
        required: true,
    },
    discount: {
        type: Number,
        required: true,
    },
    platform: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
        min: 1, // Tối thiểu 1
        max: 10, // Tối đa 10
    },
    image: {
        type: String,
        required: true,
    },
}, { timestamps: true });

export default mongoose.model("Game", gameSchema);