import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    user_id: {
        type: Number,
        required: true,
        unique: true,
    },
    role_id: {
        type: mongoose.Schema.Types.Number,
        unique: false,
        ref: 'Role', // Tham chiếu đến model Role
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
        unique: false, // Đảm bảo rằng email là duy nhất
        match: /.+\@.+\..+/, // Biểu thức chính quy để kiểm tra định dạng email
    }, 
    phone: {
        type: Number,
    },
    money: {
        type: Number, 
    },
    address: {
        type: String,
    },
    avatar:{
        type: String,
    },
    fullname:{
        type: String,
    },
    idCard:{
        type: Number,
    },
    gender:{
        type: String,
    },
    district:{
        type: String,
    },
    ward:{
        type: String,
    },
    city:{
        type: String,
    },

    
}, { timestamps: true });

export default mongoose.model("User", userSchema);


