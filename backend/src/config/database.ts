import mongoose from "mongoose";
import dotenv from "dotenv";
import Logger from "../utils/Logger";

dotenv.config();

async function database() {
  const { URI } = process.env;

  try {
    await mongoose.connect(URI as string);
    Logger("Database Connected", "info");
  } catch (error) {
    Logger("Database Unconnected!!!", "error");
  }
}

export default database;
