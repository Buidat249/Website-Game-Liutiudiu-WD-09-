import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    user_id: {
        type: Number,
        required: true,
        unique: true,
    },
    username: String,
    password: String,
    email: String,
    phone: Number,
    address: String,
    role: String,
    avatar: String,
}, { timestamps: true });

export default mongoose.model("User", userSchema);


