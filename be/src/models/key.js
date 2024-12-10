import mongoose from "mongoose";

const keySchema = new mongoose.Schema(
  {
    game_id: {
      type: mongoose.Schema.Types.Number, // Đảm bảo là ObjectId
      ref: "Game", // Tham chiếu đến model Game
      required: false,
    },
    user_id: {
      type: mongoose.Schema.Types.Number, // Đảm bảo là ObjectId
      ref: "User", // Tham chiếu đến model Game
      required: false,
    },
    key_id: {
      type: Number,
      required: true,
      unique: false,
      Array: true,
    },
    is_used: {
      type: Boolean,
      default: false, // Mặc định key chưa được sử dụng
    },
    used_at: {
      type: Date,
      default: false,
    },
    name: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Key", keySchema);
