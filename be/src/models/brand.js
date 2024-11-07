import mongoose from "mongoose";

const brandSchema = new mongoose.Schema({
    brand_id: {
        type: Number,
        unique: false,
    },
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
    }
}, { timestamps: true });

export default mongoose.model("Brand", brandSchema);
