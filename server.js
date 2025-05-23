import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { dbConnection } from "./config/db.js";
import formRoutes from "./routes/formRoutes.js";
import mentorRoutes from "./routes/mentorRoutes.js";
import faqRoutes from "./routes/faqRoutes.js";
import curriculumRoutes from "./routes/curriculumRoutes.js";
import mentorFormRoutes from "./routes/MentorFormRoutes.js";
import hiringRoutes from "./routes/hiringRoutes.js";
import courseRoutes from "./routes/courseCardsRoutes.js";

dotenv.config({ path: "./config.env" });

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to the database
dbConnection();

// Use routes
app.use("/api", formRoutes);
app.use("/api", mentorRoutes);
app.use("/api", faqRoutes);
app.use("/api", curriculumRoutes);
app.use("/api/mentorform", mentorFormRoutes);
app.use("/api/hiring", hiringRoutes);
app.use("/api/courses", courseRoutes);

app.use("/coursecards", express.static("coursecards"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
