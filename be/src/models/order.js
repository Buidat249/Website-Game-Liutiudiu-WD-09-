import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    order_id: {
      type: Number,
      required: true,
      unique: true,
    },
    user_id: {
      type: mongoose.Schema.Types.Number,
      ref: "User", // Tham chiếu đến mô hình User
      required: true,
    },
    games: [
      {
        game_id: {
          type: mongoose.Schema.Types.Number,
          ref: "Game", // Tham chiếu đến mô hình Game
          required: true,
        },
        name: {
          type: String,
          required: true,
        },
        price: {
          type: Number,
          required: true,
          min: 0,
        },
        discount: {
          type: Number,
          required: true,
          min: 0,
          max: 100,
        },
        final_price: {
          type: Number,
          required: true,
          min: 0,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
        key_ids: [
          {
            key_id: { type: Number, required: true },
            key_name: { type: String, required: true },
          },
        ],
      },
    ],
    total_price: {
      type: Number,
      required: true,
      min: 0,
    },
    status: {
      type: String,
      required: true,
      enum: ["pending", "completed", "canceled", "payment_failed"], // Các trạng thái có thể
      default: "pending",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
