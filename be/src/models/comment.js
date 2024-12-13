import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  game_id: {
    type: mongoose.Schema.Types.Number,
    ref: "Game",
    required: true,
  },
  user_id: {
    type: mongoose.Schema.Types.Number,
    ref: "User", // Tham chiếu đến model User (nếu bạn có model User để lưu thông tin người dùng)
    required: true,
  },  
  content: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
});

export default mongoose.model("Comment", commentSchema);
