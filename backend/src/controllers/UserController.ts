/* eslint-disable default-case */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { ResJsonUser } from "../utils/Responses";
import UserModel from "../models/User";
import ValidationError from "../utils/ValidationError";

/* Auth User */
async function authUser(req: Request, res: Response) {
  const { email, password } = req.body;
  const { SECRET_KEY } = process.env;

  try {
    // validation input
    if (!email && !password) throw new ValidationError(400, "all input is required");
    if (!email) throw new ValidationError(400, "email is required");
    if (!password) throw new ValidationError(400, "password is required");

    const User = await UserModel.findOne({ email });
    // validation user
    if (!User) throw new ValidationError(400, "email or password is invalid");

    // check password
    const isCheckedPassword = await bcrypt.compare(password, User.password);
    if (!isCheckedPassword) throw new ValidationError(400, "email or password is invalid");

    // create token user
    let token;
    if (User.isAdmin) {
      token = jwt.sign({ _id: User!._id, isAdmin: User.isAdmin }, SECRET_KEY as string, { expiresIn: "16h" });
    } else {
      token = jwt.sign({ _id: User!._id }, SECRET_KEY as string, { expiresIn: "12h" });
    }

    res.cookie("token_user", token, { maxAge: 4.32e+7 });

    return res.status(201).json(ResJsonUser(201, "OK", "authenticated"));
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(error.code).json(ResJsonUser(error.code, "BAD REQUEST", error.message));
    }
    return res.send("something error");
  }
}

/* Get User */
async function getUser(req: Request, res: Response) {
  const { _id } = req.headers;

  try {
    const User = await UserModel.findById(_id);
    if (!User) throw new ValidationError(404, "user not found");

    return res.status(200).json(ResJsonUser(200, "OK", "user found", undefined, User));
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(error.code).json(ResJsonUser(error.code, "NOT FOUND", error.message));
    }
    return res.send("something error");
  }
}

/* Get Users */
async function getUsers(req: Request, res: Response) {
  try {
    const UserAdmin = await UserModel.find({ isAdmin: true });
    const UserNotAdmin = await UserModel.find({ isAdmin: false });

    return res.status(200).json(ResJsonUser(200, "OK", "users found", undefined, [...UserAdmin, ...UserNotAdmin]));
  } catch (error) {
    return res.send("something error");
  }
}

/* Create User */
async function createUser(req: Request, res: Response) {
  const {
    username, email, password, confirmPassword,
  } = req.body;

  try {
    // Validation Input
    if (!username && !email && !password) throw new ValidationError(400, "all input is required");
    if (!username) throw new ValidationError(400, "username is required");
    if (!email) throw new ValidationError(400, "email is required");
    if (!password) throw new ValidationError(400, "password is required");
    if (password.length < 6) throw new ValidationError(400, "password must contain six characters");
    if (password !== confirmPassword) throw new ValidationError(400, "password is invalid");

    // Validation User
    const UserAlreadyExist = await UserModel.findOne({ email });
    if (UserAlreadyExist) throw new ValidationError(400, "user already exist");

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new UserModel({ username, email, password: hashedPassword });

    newUser.save();
    return res.status(201).json(ResJsonUser(201, "OK", "user created"));
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(error.code).json(ResJsonUser(error.code, "BAD REQUEST", error.message));
    }
    return res.send("something error");
  }
}

/* Update User */
async function updateUser(req: Request, res: Response) {
  const { _id } = req.headers;
  const {
    username, email, bio, github, website, linkedin, instagram,
  } = req.body;

  try {
    // validation input
    if (!username && !email) throw new ValidationError(400, "all input is required");
    if (!username) throw new ValidationError(400, "username is requied");
    if (!email) throw new ValidationError(400, "email is requied");

    const User = await UserModel.findById(_id);
    if (!User) throw new ValidationError(404, "not found");

    User.username = username;
    User.email = email;

    if (bio) User.bio = bio;
    if (github) User.github = github;
    if (website) User.website = website;
    if (linkedin) User.linkedin = linkedin;
    if (instagram) User.instagram = instagram;

    User.save();
    return res.status(201).json(ResJsonUser(200, "OK", "updated user"));
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(error.code).json(ResJsonUser(error.code, "BAD REQUEST", error.message));
    }
    return res.send("something error");
  }
}

/* Update Password's user */
async function updatePassword(req: Request, res: Response) {
  const { _id } = req.headers;
  const { oldPassword, newPassword, confirmPassword } = req.body;

  try {
    // validation input
    if (!oldPassword && !newPassword && !confirmPassword) throw new ValidationError(400, "all input is required");
    if (!oldPassword) throw new ValidationError(400, "old password is required");
    if (!newPassword) throw new ValidationError(400, "new password is required");
    if (!confirmPassword) throw new ValidationError(400, "confirm password is required");
    if (newPassword.length < 6) throw new ValidationError(400, "password must contain six characters");
    if (newPassword !== confirmPassword) throw new ValidationError(400, "password is invalid");

    const User = await UserModel.findById(_id);
    if (!User) throw new ValidationError(404, "user not found");

    // check old password
    const passwordsUser = await bcrypt.compare(oldPassword, User.password);
    if (!passwordsUser) throw new ValidationError(400, "old password is invalid");

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    User.password = hashedPassword;

    User.save();
    return res.status(201).json(ResJsonUser(201, "OK", "password updated"));
  } catch (error) {
    if (error instanceof ValidationError) {
      switch (error.code) {
        case 400:
          return res.status(error.code).json(ResJsonUser(error.code, "BAD REQUEST", error.message));
          break;
        case 404:
          return res.status(error.code).json(ResJsonUser(error.code, "NOT FOUND", error.message));
          break;
      }
    }
    return res.send("something error");
  }
}

/* Update Role */
async function updateRole(req: Request, res: Response) {
  const { id } = req.params;

  try {
    const User = await UserModel.findById(id);
    if (!User) throw new ValidationError(404, "user not found");

    if (!User.isAdmin) {
      User.isAdmin = true;
    } else {
      User.isAdmin = false;
    }

    User.save();
    return res.status(201).json(ResJsonUser(201, "OK", `${User.username}'s role is changed`));
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(error.code).json(ResJsonUser(error.code, "NOT FOUND", error.message));
    }
    return res.send("something error");
  }
}

/* Delete User */
async function deleteUser(req: Request, res: Response) {
  const { id } = req.params;

  try {
    if (!id) throw new ValidationError(400, "id is required");

    // delete user
    const User = await UserModel.findByIdAndDelete(id);
    if (!User) throw new ValidationError(404, "user not found");

    return res.status(200).json(ResJsonUser(200, "OK", "user deleted"));
  } catch (error) {
    if (error instanceof ValidationError) {
      switch (error.code) {
        case 400:
          return res.status(error.code).json(ResJsonUser(error.code, "BAD REQUEST", error.message));
        case 404:
          return res.status(error.code).json(ResJsonUser(error.code, "NOT FOUND", error.message));
      }
    }
    return res.send("something error");
  }
}

export {
  getUser, getUsers, createUser, updateUser, updatePassword, deleteUser, authUser, updateRole,
};
