import mongoose from "mongoose";

const roleSchema = new mongoose.Schema({
    role_id: {
        type: Number,
        unique: false,
    },
    name: {
        type: String,    
        required: true,
    },
}, { timestamps: true });

export default mongoose.model("Role", roleSchema);
