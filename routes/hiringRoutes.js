// routes/hiringRoutes.js
import express from "express";
import multer from "multer";
import { createHiring } from "../controllers/hiringController.js";

const router = express.Router();

// Configure Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Ensure that the "uploads" folder exists in your project root.
    cb(null, "hiring_forms/");
  },
  filename: (req, file, cb) => {
    // Prepend a timestamp to avoid filename collisions
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// POST endpoint to accept hiring form submissions.
// The field name for the file must match the form field ("requrment_doc").
router.post("/", upload.single("requrment_doc"), createHiring);

export default router;
