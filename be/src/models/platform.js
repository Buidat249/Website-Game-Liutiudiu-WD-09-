import mongoose from "mongoose";

const platformSchema = new mongoose.Schema({

    platform_id: {
        type: Number,
        unique: false,
    },
    name: {
        type: String,
        required: true,
    },
}, { timestamps: true });

export default mongoose.model("Platform", platformSchema);