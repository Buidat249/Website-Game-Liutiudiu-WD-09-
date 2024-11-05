import mongoose from "mongoose";

const brandSchema = new mongoose.Schema({
    brand_id: {
        type: Number,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
}, { timestamps: true });

export default mongoose.model("Brand", brandSchema);
