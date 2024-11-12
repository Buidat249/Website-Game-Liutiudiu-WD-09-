import mongoose from "mongoose";

const descriptiondetailSchema = new mongoose.Schema({

    descriptiondetail_id: {
        type: Number,
        unique: false,
        required: true,
        Array: true,
    },
    name: {
        type: String,
        required: true,
    },
    image: {
        type: Array,
    },
    content: {
        type: String,
        required: true,
    }
}, { timestamps: true });

export default mongoose.model("Descriptiondetail", descriptiondetailSchema);
