import mongoose from "mongoose";
const order_DetailSchema = new mongoose.Schema({
    order_detail_id: {
        type: Number, 
        required: true,
        unique: false,   
    },
    order_id: {
        type: mongoose.Schema.Types.Number,
        ref: "Order", // Tham chiếu đến mô hình Order
        required: true,
        unique: false,
    },
    game_id: {
        type: mongoose.Schema.Types.Number,
        ref: "Game", // Tham chiếu đến mô hình Game
        required: true,
        unique: false,
    },
    quantity: {
        type: Number,
        required: true,
        min: 1, // Số lượng ít nhất là 1
    },
    unit_price : { // unit_price là giá tiền của 1 sản phẩm  
        type: Number,
        required: true,
        min: 0, // 
    },
}, { 
    timestamps: true 
});

export default mongoose.model("Order_Detail", order_DetailSchema);


