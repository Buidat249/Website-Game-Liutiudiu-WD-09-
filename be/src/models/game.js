import mongoose from 'mongoose';

const gameSchema = new mongoose.Schema({
    game_id: { type: Number, required: true, unique: false, },
    brand_id: {
        type: mongoose.Schema.Types.Number,
        required: true,
        unique: false,
        ref: 'Brand', // Tham chiếu đến model Brand
    },
    category_id: {
        type: mongoose.Schema.Types.Number,
        required: true,
        unique: false,
        ref: 'Category', // Tham chiếu đến model Category
    },
    platform_id: {
        type: mongoose.Schema.Types.Number,
        required: true,
        unique: false,
        ref: 'Platform', // Tham chiếu đến model Platform
    },
    brand_ids: [{ type: Number, ref: 'Brands' }],
    category_ids: [{ type: Number, ref: 'categories' }],
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    discount: { type: Number, default: 0 },
    rating: { type: Number, min: 0, max: 5 },
    image: { type: String, required: true }
});

const Game = mongoose.model('Game', gameSchema);
export default Game;
