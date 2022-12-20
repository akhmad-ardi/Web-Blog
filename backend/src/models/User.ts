import mongoose from "mongoose";
import { IUserSchema } from "../utils/Types";

const UserSchema = new mongoose.Schema<IUserSchema>({
  username: { type: String, required: true },
  email: {
    type: String, unique: true, lowercase: true, required: true,
  },
  bio: { type: String, required: false, default: "" },
  github: { type: String, required: false, default: "" },
  website: { type: String, required: false, default: "" },
  linkedin: { type: String, required: false, default: "" },
  instagram: { type: String, required: false, default: "" },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, default: false },
}, {
  timestamps: true,
});

const User = mongoose.model<IUserSchema>("User", UserSchema);
export default User;
