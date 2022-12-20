import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import database from "./config/database";
import UserRoutes from "./routes/UserRoutes";
import PostRoutes from "./routes/PostRoutes";

const app = express();

app.use(bodyParser.json());
app.use(express.static("public"));
app.use(cors());
app.use(cookieParser());

database();

app.use("/api/user", UserRoutes);
app.use("/api/post", PostRoutes);

export default app;
