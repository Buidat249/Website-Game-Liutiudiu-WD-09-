import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
  {
    transaction_id: {
      type: Number,
      required: true,
      unique: true,
    },
    user_id: {
      type: mongoose.Schema.Types.Number,
      ref: "User", // Tham chiếu đến mô hình User
      required: true,
    },
    total_price: {
      type: Number,
      required: true,
      min: 0,
    },
    status: {
      type: String,
      required: true,
      enum: ["completed", "failed"]
    },
  },
  { timestamps: true }
);

export default mongoose.model("Transaction", transactionSchema);
