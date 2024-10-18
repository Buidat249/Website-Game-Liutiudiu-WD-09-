import mongoose from "mongoose";
const UserSchema = mongoose.Schema({
    user_id: Number,
    username: String,
    password: String,
    email: String,
    phone: Number,
    address: String,
    role: String,
    avata: String,
    created_at: String,
    updated_at: String
}, {
    timestamps: true
})
const UsertModel = mongoose.model('users', UserSchema)
export default UsertModel