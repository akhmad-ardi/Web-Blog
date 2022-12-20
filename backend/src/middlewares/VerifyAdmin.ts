/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable default-case */
import { Request, Response, NextFunction } from "express";
import { ResJsonUser } from "../utils/Responses";
import UserModel from "../models/User";
import ValidationError from "../utils/ValidationError";

async function VerifyAdmin(req: Request, res: Response, next: NextFunction) {
  const { _id } = req.headers;

  try {
    const User = await UserModel.findById(_id);
    if (!User) throw new ValidationError(404, "user not found");

    // check isAdmin
    if (!User.isAdmin) throw new ValidationError(403, "you are not admin");
    return next();
  } catch (error) {
    if (error instanceof ValidationError) {
      switch (error.code) {
        case 400:
          return res.status(error.code).json(ResJsonUser(error.code, "BAD REQUEST", error.message));
        case 403:
          return res.status(error.code).json(ResJsonUser(error.code, "FORBIDDEN", error.message));
        case 404:
          return res.status(error.code).json(ResJsonUser(error.code, "NOT FOUND", error.message));
      }
    }
    return res.send("something error");
  }
}

export default VerifyAdmin;
