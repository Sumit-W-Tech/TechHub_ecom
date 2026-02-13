import mongoose from "mongoose";

const favoriteSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" }
  },
  { timestamps: true }
);

export default mongoose.model("Favorite", favoriteSchema);
