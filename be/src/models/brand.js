import mongoose from "mongoose";

const brandSchema = new mongoose.Schema({
    brand_id: {
        type: Number,
        unique: false,
        Array: true,
    },
    name: {
        type: String,
        required: true,
    },
    image: {
        type: Array,
    }
}, { timestamps: true });

export default mongoose.model("Brand", brandSchema);
