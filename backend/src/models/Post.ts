import mongoose from "mongoose";
import { IPostSchema } from "../utils/Types";

const PostSchema = new mongoose.Schema<IPostSchema>({
  user_id: { type: String, required: true },
  image: { type: String, default: "", required: false },
  title: { type: String, required: true },
  slug: {
    type: String, unique: true, lowercase: true, required: true,
  },
  category: { type: String, required: true },
  excerpt: { type: String, required: true },
  body: { type: String, required: true },
  author: { type: String, required: true },
}, {
  timestamps: true,
});

const Post = mongoose.model<IPostSchema>("Post", PostSchema);
export default Post;
