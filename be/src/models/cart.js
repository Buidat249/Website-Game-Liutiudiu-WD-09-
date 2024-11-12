import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
  {
    cart_id: {
      type: Number,
      unique: false,
      default: function () {
        return Date.now(); // hoặc bất kỳ giá trị nào đảm bảo tính duy nhất
      },
    },
    user_id: {
      type: mongoose.Schema.Types.Number,
      ref: "User", // Tham chiếu đến model User
      unique: false,
      default: function () {
        return Date.now(); // hoặc bất kỳ giá trị nào đảm bảo tính duy nhất
      },
    },
    game_id: [
      {
        type: mongoose.Schema.Types.Number,
        ref: "Game", // Tham chiếu đến model User
        unique: false,
        default: function () {
            return Date.now(); // hoặc bất kỳ giá trị nào đảm bảo tính duy nhất
          },
      },
    ],
    quantity: { type: Number },
  },
  { timestamps: true }
);

export default mongoose.model("Cart", cartSchema);
