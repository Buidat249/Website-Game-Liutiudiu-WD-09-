import mongoose from "mongoose";

const cart_itemSchema = new mongoose.Schema({
    cart_item_id: {
        type: Number,
        required: true,
        unique: false,
    },
    cart_id: {
        type: mongoose.Schema.Types.Number,
        required: true,
        ref: 'Cart', // Tham chiếu đến model Cart
        unique: false,
    },
    game_id: {
        type: mongoose.Schema.Types.Number,
        required: true,
        ref: 'Game', // Tham chiếu đến model Game
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
    timestamps: true, 
    toJSON: { virtuals: true }, // Bao gồm virtuals trong JSON khi xuất dữ liệu
    toObject: { virtuals: true } 
});

// Tạo trường `subtotal` bằng Virtuals
// Trường subtotal : thường đại diện cho tổng giá trị của một loại sản phẩm cụ thể trong giỏ hàng
// Trường unit_price : giá của một đơn vị sản phẩm
// Trường quantity : số lượng sản phẩm trong giỏ hàng
// subtotal = unit_price * quantity 

cart_itemSchema.virtual('subtotal').get(function() {
    return this.unit_price * this.quantity;
});

export default mongoose.model("Cart_Item", cart_itemSchema);