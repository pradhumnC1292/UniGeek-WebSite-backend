import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config({ path: "./config.env" });

export const dbConnection = () => {
  mongoose
    .connect(
      "mongodb+srv://chandrawatpradhumn1:F14gCgqE2Ufu40Vu@cluster0.thfyt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
      {
        dbName: process.env.DB_NAME || "test",
      }
    )
    .then(() => {
      console.log("Database connection established successfully");
    })
    .catch((error) => {
      console.error(`Error connecting to DATABASE: ${error}`);
    });
};
