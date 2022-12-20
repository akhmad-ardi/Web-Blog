/* eslint-disable @typescript-eslint/no-unused-vars */
import http from "http";
import dotenv from "dotenv";
import app from "./app";
import Logger from "./utils/Logger";

dotenv.config();

const port: number | string = process.env.PORT || 4000;

const server = http.createServer(app);

server.listen(port, () => {
  Logger("Server running on local:", "info", `http://localhost:${port}`);
});
