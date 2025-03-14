import express from "express";
import {
  createFormSubmission,
  getFormSubmissions,
} from "../controllers/formController.js";

const router = express.Router();

router.post("/form", createFormSubmission);
router.get("/form", getFormSubmissions);

export default router;
