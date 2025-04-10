// routes/MentorFormRoutes.js
import express from "express";
import multer from "multer";
import { createMentorForm } from "../controllers/MentorFormController.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Files will be saved in the "uploads/" folder (make sure this folder exists in your project root)
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    // Replace spaces with underscores in the original filename
    const sanitizedOriginalName = file.originalname.replace(/\s+/g, "_");
    // Create a unique filename using the current timestamp and the sanitized original filename
    cb(null, Date.now() + "-" + sanitizedOriginalName);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "application/pdf" ||
    file.mimetype === "application/msword" ||
    file.mimetype ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  ) {
    cb(null, true);
  } else {
    cb(new Error("Unsupported file format"), false);
  }
};

const upload = multer({ storage, fileFilter });

// POST endpoint for creating a mentor form submission (with file upload if provided)
router.post("/", upload.single("resume"), createMentorForm);

export default router;
