/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable no-underscore-dangle */
/* eslint-disable default-case */
/* eslint-disable @typescript-eslint/naming-convention */
import fs from "fs";
import { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { ResJsonPost, ResJsonUser } from "../utils/Responses";
import UserModel from "../models/User";
import PostModel from "../models/Post";
import { IPostSchema } from "../utils/Types";
import ValidationError from "../utils/ValidationError";

const { PORT } = process.env;

/* Get Posts */
async function getPosts(req: Request, res: Response) {
  const { category, author, user_id } = req.query;
  const Posts: IPostSchema[] = [];

  try {
    let PostsDB: IPostSchema[] = [];

    if (!category && !author) {
      PostsDB = await PostModel.find({});
    }

    if (category) {
      PostsDB = await PostModel.find({ category });
    }

    if (author) {
      PostsDB = await PostModel.find({ author });
    }

    if (user_id) {
      PostsDB = await PostModel.find({ user_id });
      return res.status(200).json(ResJsonPost(200, "OK", "posts found", PostsDB));
    }

    // if array's PostsDB is empty
    if (PostsDB.length === 0) throw new ValidationError(404, "post not found");

    for (let i = 0; i < PostsDB.length; i += 1) {
      if (Posts.length < 20) {
        Posts.push(PostsDB[i]);
      }
    }

    return res.status(200).json(ResJsonPost(200, "OK", "posts found", Posts));
  } catch (error) {
    if (error instanceof ValidationError) {
      switch (error.code) {
        case 400:
          return res.status(error.code).json(ResJsonPost(error.code, "BAD REQUEST", error.message));
        case 404:
          return res.status(error.code).json(ResJsonPost(error.code, "NOT FOUND", error.message));
      }
    }
    return res.send("something error");
  }
}

/* Get Post by Slug */
async function getPostBySlug(req: Request, res: Response) {
  const { slug } = req.params;

  try {
    const Post = await PostModel.findOne({ slug });
    if (!Post) throw new ValidationError(404, "post not found");

    return res.status(200).json(ResJsonPost(200, "OK", "post found", Post));
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(error.code).json(ResJsonPost(error.code, "NOT FOUND", error.message));
    }
    return res.send("something error");
  }
}

/* Get Post by Id */
async function getPostById(req: Request, res: Response) {
  const { id } = req.params;

  try {
    const Post = await PostModel.findById(id);
    if (!Post) throw new ValidationError(404, "post not found");

    return res.status(200).json(ResJsonPost(200, "OK", "post found", Post));
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(error.code).json(ResJsonPost(error.code, "BAD REQUEST", error.message));
    }
    return res.send("something error");
  }
}

/* Create Post */
async function createPost(req: Request, res: Response) {
  const { _id } = req.headers;
  const image = req.file;
  const {
    title, slug, category, body,
  } = req.body;

  let img: string | undefined = "";

  try {
    // validation input
    if (!title && !slug && !category && !body) throw new ValidationError(400, "all input is required");
    if (!title) throw new ValidationError(400, "title is required");
    if (!slug) throw new ValidationError(400, "slug is required");
    if (!category) throw new ValidationError(400, "category is required");
    if (!body) throw new ValidationError(400, "post is required");

    const Slug = await PostModel.findOne({ slug });
    if (Slug) throw new ValidationError(400, "post already exist");

    const User = await UserModel.findById(_id);
    if (!User) throw new ValidationError(404, "user not found");

    if (image) img = `${req.protocol}://${req.hostname}:${PORT}/${image?.filename}`;

    const newPost = new PostModel({
      user_id: _id,
      image: img,
      title,
      slug,
      category,
      excerpt: `${body.substring(3, 100)}...`,
      body,
      author: User.username,
    });

    newPost.save();
    return res.status(201).json(ResJsonPost(201, "OK", "created post", newPost));
  } catch (error) {
    if (error instanceof ValidationError) {
      switch (error.code) {
        case 400:
          return res.status(error.code).json(ResJsonPost(error.code, "BAD REQUEST", error.message));
        case 404:
          return res.status(error.code).json(ResJsonUser(error.code, "NOT FOUND", error.message));
      }
    }
    return res.send("something error");
  }
}

/* Update Post */
async function updatePost(req: Request, res: Response) {
  const { id } = req.params;
  const image = req.file;
  const {
    title, slug, category, body,
  } = req.body;

  try {
    // validation input
    if (!title && !slug && !category && !body) throw new ValidationError(400, "all input is required");
    if (!title) throw new ValidationError(400, "title is required");
    if (!slug) throw new ValidationError(400, "slug is required");
    if (!category) throw new ValidationError(400, "category is required");
    if (!body) throw new ValidationError(400, "body is required");

    const Post = await PostModel.findById(id);
    if (!Post) throw new ValidationError(404, "post not found");

    const PostAlreadyExist = await PostModel.findOne({ slug });
    if (PostAlreadyExist) {
      const PostAlreadyExistID = new ObjectId(PostAlreadyExist._id).toString();
      const PostID = new ObjectId(Post._id).toString();
      if (PostAlreadyExist.slug === slug && PostAlreadyExistID !== PostID) {
        throw new ValidationError(400, "post already exist");
      }
    }

    // update post
    Post.title = title;
    Post.slug = slug;
    Post.category = category;
    Post.excerpt = `${body.substring(3, 100)}...`;
    Post.body = body;

    // upload / update image
    if (image) {
      if (Post.image) {
        fs.unlinkSync(`public/${Post.image.replace("http://localhost:4000/", "")}`);
      }

      Post.image = `${req.protocol}://${req.hostname}:${PORT}/${image?.filename}`;
    }

    Post.save();
    return res.status(201).json(ResJsonPost(201, "OK", "post updated"));
  } catch (error) {
    if (error instanceof ValidationError) {
      switch (error.code) {
        case 400:
          return res.status(error.code).json(ResJsonPost(error.code, "BAD REQUEST", error.message));
        case 404:
          return res.status(error.code).json(ResJsonPost(error.code, "NOT FOUND", error.message));
      }
    }
    return res.send("something error");
  }
}

/* Delete Post */
async function deletePost(req: Request, res: Response) {
  const { id } = req.params;

  try {
    if (!id) throw new ValidationError(400, "id is required");

    // delete post
    const Post = await PostModel.findByIdAndDelete(id);
    if (!Post) throw new ValidationError(404, "post not found");

    // delete image
    if (Post.image) {
      fs.unlinkSync(`public/${Post.image.replace("http://localhost:4000/", "")}`);
    }

    return res.status(200).json(ResJsonPost(200, "OK", "post deleted"));
  } catch (error) {
    if (error instanceof ValidationError) {
      switch (error.code) {
        case 400:
          return res.status(error.code).json(ResJsonPost(error.code, "BAD REQUEST", error.message));
        case 404:
          return res.status(error.code).json(ResJsonPost(error.code, "NOT FOUND", error.message));
      }
    }
    return res.send("something error");
  }
}

export {
  getPosts, getPostBySlug, getPostById, createPost, updatePost, deletePost,
};
