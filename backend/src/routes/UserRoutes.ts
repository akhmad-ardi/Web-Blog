import { Request, Response, Router } from "express";
import { ResJsonUser } from "../utils/Responses";
import VerifyAdmin from "../middlewares/VerifyAdmin";
import VerifyToken from "../middlewares/VerifyToken";
import {
  authUser, getUser, getUsers, createUser, updateUser, updatePassword, updateRole, deleteUser,
} from "../controllers/UserController";

const routes = Router();

routes.get("/", VerifyToken, getUser);
routes.get("/users", VerifyToken, VerifyAdmin, getUsers);

// create user
routes.post("/", createUser);

routes.put("/", VerifyToken, updateUser);
routes.patch("/", VerifyToken, updatePassword);
routes.patch("/:id", VerifyToken, VerifyAdmin, updateRole);
routes.delete("/:id", VerifyToken, VerifyAdmin, deleteUser);

// create token(Authentication)
routes.post("/auth", authUser);
routes.get("/verify", VerifyToken, (req: Request, res: Response) => res.status(200).json(ResJsonUser(200, "OK", "authenticated", true)));

// delete token(sign out)
routes.get("/delete_token_user", (req: Request, res: Response) => res.status(200).clearCookie("token_user").json(ResJsonUser(200, "OK", "unauthenticated", false)));

export default routes;
