import { Router } from "express";
import multer from "multer";
import VerifyToken from "../middlewares/VerifyToken";
import {
  getPosts, getPostBySlug, getPostById, createPost, updatePost, deletePost,
} from "../controllers/PostController";

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "public");
  },
  filename(req, file, cb) {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
    cb(null, `${uniqueSuffix}-${file.originalname}`);
  },
});

const upload = multer({ storage });
const routes = Router();

// Get Posts and Get Post
routes.get("/", getPosts);
routes.get("/id/:id", getPostById);
routes.get("/slug/:slug", getPostBySlug);

routes.post("/", VerifyToken, upload.single("image"), createPost);
routes.patch("/:id", VerifyToken, upload.single("image"), updatePost);
routes.delete("/:id", VerifyToken, deletePost);

export default routes;
