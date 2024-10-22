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
    discount: Number,
    platform: String,
    rating: Number,
    image: String,
}, { timestamps: true });

export default mongoose.model("Game", gameSchema);