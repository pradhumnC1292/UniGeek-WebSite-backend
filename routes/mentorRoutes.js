import express from "express";
import {
  getMentors,
  createMentor,
  updateMentor,
} from "../controllers/mentorController.js";

const router = express.Router();

// GET all mentors
router.get("/mentors", getMentors);

// POST a new mentor
router.post("/mentors", createMentor);

// PUT update an existing mentor by ID
router.put("/mentors/:id", updateMentor);

export default router;
