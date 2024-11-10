import mongoose from 'mongoose';

const gameSchema = new mongoose.Schema({
    game_id: { type: Number, required: true, unique: false, Array: true},
    brand_id: [{
        type: mongoose.Schema.Types.Number,
        required: true,
        unique: false,
        ref: 'Brand', // Tham chiếu đến model Brand
    }],
    
    category_id: [{
        type: mongoose.Schema.Types.Number,
        required: true,
        unique: false,
        ref: 'Category', // Tham chiếu đến model Category
    }],
    platform_id: [{
        type: mongoose.Schema.Types.Number,
        required: true,
        unique: false,
        ref: 'Platform', // Tham chiếu đến model Platform
    }],
    name: { type: String, required: true },
    price: { type: Number, required: true },
    discount: { type: Number, default: 0 },
    image: { type: Array, required: true },
    description: { type: String, required: true }
});

const Game = mongoose.model('Game', gameSchema);
export default Game;
