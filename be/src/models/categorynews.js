import mongoose from "mongoose";

const categorynewSchema = new mongoose.Schema({

    categorynew_id: {
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

export default mongoose.model("Categorynew", categorynewSchema);
