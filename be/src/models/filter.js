import mongoose from "mongoose";

const filterSchema = new mongoose.Schema({
    filter_id: {
        type: Number,
        unique: false,
        Array: true,
    },
    name: {
        type: String,
        required: true,
    },
}, { timestamps: true });

export default mongoose.model("Filter", filterSchema);