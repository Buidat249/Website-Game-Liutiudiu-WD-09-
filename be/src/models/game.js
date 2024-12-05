
import mongoose from "mongoose";

const gameSchema = new mongoose.Schema({
  game_id: { type: Number, required: true, unique: false, Array: true },
  brand_id: [
    {
      type: mongoose.Schema.Types.Number,
      required: true,
      unique: false,
      ref: "Brand", // Tham chiếu đến model Brand
    },
  ],

  category_id: [
    {
      type: mongoose.Schema.Types.Number,
      required: true,
      unique: false,
      ref: "Category", // Tham chiếu đến model Category
    },
  ],
  platform_id: [
    {
      type: mongoose.Schema.Types.Number,
      required: true,
      unique: false,
      ref: "Platform", // Tham chiếu đến model Platform
    },
  ],
  filter_id: [
    {
      type: mongoose.Schema.Types.Number,
      required: true,
      unique: false,
      ref: "Filter",
    },
  ],
  name: { type: String, required: true },
  price: { type: Number, required: true },
  discount: { type: Number, default: 0 },
  final_price: {
    type: Number,
    default: function () {
      return this.price; // Nếu không có giá trị giảm giá, giá cuối cùng là giá gốc
    },
  },
  image: { type: Array, required: true },
  description_id: [
    {
      type: mongoose.Schema.Types.Number,
      required: true,
      unique: false,
      ref: "Description", // Tham chiếu đến model description
    },
  ],
  configuration: { type: String, required: true }, 
  key_id: [
    {
      type: mongoose.Schema.Types.Number,
      required: true,
      unique: false,
      ref: "Key", // Tham chiếu đến model description
    },
  ], // Mảng chứa các key game
});

gameSchema.pre("save", function (next) {
  // Tính giá cuối cùng sau giảm giá
  if (this.price && this.discount >= 0) {
    const discountAmount = this.price * (this.discount / 100);
    this.final_price = this.price - discountAmount; // Giá cuối cùng
  }
  next();
});

export default mongoose.model("Game", gameSchema);
