import mongoose, { Document, Schema } from "mongoose";
import { IUser } from "../types/userTypes";

export interface IUserDocument extends IUser, Document {}

const userSchema = new Schema<IUserDocument>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["buyer", "seller","Admin"],
      default: "buyer"
    }
  },
  { timestamps: true }
);

export default mongoose.model<IUserDocument>("User", userSchema);
