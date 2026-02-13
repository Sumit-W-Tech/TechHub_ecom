import mongoose from "mongoose";

const inquirySchema = new mongoose.Schema(
  {
    buyer: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    seller: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

    product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },

    message: String,
    quantity: Number,

    status: {
      type: String,
      enum: ["pending", "contacted", "closed"],
      default: "pending"
    }
  },
  { timestamps: true }
);

export default mongoose.model("Inquiry", inquirySchema);
