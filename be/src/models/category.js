import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({

    category_id: {
        type: Number,
        unique: false,
        required: true,
        Array: true,
    },
    name: {
        type: String,
        required: true,
    },
}, { timestamps: true });

export default mongoose.model("Category", categorySchema);
