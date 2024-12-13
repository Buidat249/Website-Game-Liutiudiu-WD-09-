import mongoose from "mongoose";

const descriptionSchema = new mongoose.Schema({

    description_id: {
        type: Number,
        unique: false,
        required: true,
        Array: true,
    },
    descriptiondetail_id: [
        {
          type: mongoose.Schema.Types.Number,
          required: true,
          unique: false,
          ref: "Descriptiondetail", // Tham chiếu đến model description
        },
      ],
    name: {
        type: String,
        required: true,
    },
}, { timestamps: true });

export default mongoose.model("Description", descriptionSchema);
