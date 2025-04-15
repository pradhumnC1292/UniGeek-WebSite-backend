import express from "express";
import multer from "multer";
import {
  getMentors,
  createMentor,
  updateMentor,
} from "../controllers/mentorController.js";

const router = express.Router();
const storage = multer.diskStorage({});
const upload = multer({ storage });

router.get("/mentors", getMentors);
router.post("/mentors", upload.single("image"), createMentor);
router.put("/mentors/:id", upload.single("image"), updateMentor);

export default router;
