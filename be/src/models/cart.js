import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
  {
    cart_id: {
      type: Number,
      unique: true, // Đảm bảo mỗi giỏ hàng có một cart_id duy nhất
      default: function () {
        return Date.now(); // Sử dụng Date.now() hoặc UUID để tạo giá trị duy nhất cho cart_id
      },
    },
    user_id: {
      type: Number, // Sử dụng Number nếu user_id của bạn là số
      ref: "User",
      required: true, // Đảm bảo phải có user_id khi tạo giỏ hàng
    },
    games: [
      {
        game_id: {
          type: Number, // Sử dụng Number nếu game_id của bạn là số
          ref: "Game",
          required: true,
        },
        quantity: {
          type: Number,
          default: 1, // Mặc định là 1 nếu không có giá trị
        },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Cart", cartSchema);
