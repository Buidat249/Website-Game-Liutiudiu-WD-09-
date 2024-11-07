import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    user_id: {
        type: Number,
        required: true,
        unique: false,
    },
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6, // Tối thiểu 6 ký tự
    },
    email: {
        type: String,
        required: true,
        unique: false, // Đảm bảo rằng email là duy nhất
        match: /.+\@.+\..+/, // Biểu thức chính quy để kiểm tra định dạng email
    }, 
    phone: {
        type: Number,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ["user", "admin", "moderator"], // Các vai trò có thể
        required: true,
    },
    avatar: String,
}, { timestamps: true });

export default mongoose.model("User", userSchema);


