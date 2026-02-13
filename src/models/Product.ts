import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: String,
    description: String,
    price: Number,
    category: String,
    image: String,

    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
