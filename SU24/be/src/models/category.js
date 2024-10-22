import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({

    category_id: {
        type: Number,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
}, { timestamps: true });

export default mongoose.model("Category", categorySchema);
