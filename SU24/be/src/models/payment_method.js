import mongoose from "mongoose";
const payment_MethodSchema = new mongoose.Schema({
    payment_method_id: {
        type: Number, 
        required: true,
        unique: true, 
    },
    name: {
        type: String,
        required: true,
    },
}, { 
    timestamps: true 
});

export default mongoose.model("Payment_Method", payment_MethodSchema);


