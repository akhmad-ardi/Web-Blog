/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-underscore-dangle */
import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { ResJsonUser } from "../utils/Responses";
import ValidationError from "../utils/ValidationError";

function VerifyToken(req: Request, res: Response, next: NextFunction) {
  const { token_user } = req.cookies;
  const { SECRET_KEY } = process.env;

  try {
    if (!token_user) throw new ValidationError(403, "please login!");
    const decoded = jwt.verify(token_user, SECRET_KEY as string) as JwtPayload;

    req.headers._id = decoded._id;
    if (decoded.isAdmin) {
      req.headers.isAdmin = decoded.isAdmin;
    }
    return next();
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(error.code).json(ResJsonUser(error.code, "FORBIDDEN", error.message, false));
    }
    return res.send("Somthing Error");
  }
}

export default VerifyToken;
