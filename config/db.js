import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config({ path: "./config.env" });

export const dbConnection = () => {
  mongoose
    .connect(process.env.MONGODB_URI, {
      dbName: process.env.DB_NAME || "UniGeek_Web_DataBase",
    })
    .then(() => {
      console.log("Database connection established successfully");
    })
    .catch((error) => {
      console.error(`Error connecting to DATABASE: ${error}`);
    });
};
