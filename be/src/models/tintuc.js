import mongoose from "mongoose";

const tintucSchema = new mongoose.Schema({
    tintuc_id: {
        type: Number,
        required: true,
        unique: false,
    },
    title: {
        type: String,
        required: true,
    },
    categorynew_id: [{
        type: mongoose.Schema.Types.Number,
        required: true,
        unique: false,
        ref: "Categorynew", // Tham chiếu đến model Description
    }],
    description_id: [{
        type: mongoose.Schema.Types.Number,
        required: true,
        unique: false,
        ref: "Description", // Tham chiếu đến model Description
    }],
    image: {
        type: String,
        Array: true,
    },
}, { timestamps: true });

export default mongoose.model("Tintuc", tintucSchema);