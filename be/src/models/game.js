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
<<<<<<< HEAD
    review_id: [{
        type: mongoose.Schema.Types.Number,
        required: true,
        unique: false,
        ref: 'Review', // Tham chiếu đến model Review
    }],
    user_id: [{
        type: mongoose.Schema.Types.Number,
        required: true,
        unique: false,
        ref: 'User', // Tham chiếu đến model User
    }],
=======
    filter_id: [{
        type: mongoose.Schema.Types.Number,
        required: true,
        unique: false,
        ref: 'Filter', // Tham chiếu đến model Filter
    }],
    brand_ids: [{ type: Number, ref: 'Brands' }],
    category_ids: [{ type: Number, ref: 'categories' }],
>>>>>>> 1a28ab342f0403d237e4ae4c16aedbd46e6cf76c
    name: { type: String, required: true },
    price: { type: Number, required: true },
    discount: { type: Number, default: 0 },
    image: { type: Array, required: true },
    description: { type: String, required: true },
    rating: {

    }
});

// Virtual field to calculate the average rating
gameSchema.virtual('rating').get(function() {
    if (this.reviews.length === 0) return 0;
    const total = this.reviews.reduce((sum, review) => sum + review.rating, 0);
    return (total / this.reviews.length).toFixed(1); // rounding to one decimal place
});

gameSchema.set('toJSON', { virtuals: true });

const Game = mongoose.model('Game', gameSchema);
export default Game;
