import express from "express";
import {
  getFaqs,
  createFaq,
  updateFaq,
  deleteFaq,
  deleteAllFaqs,
} from "../controllers/faqController.js";

const router = express.Router();

router.delete("/all", deleteAllFaqs);
router.delete("/:id", deleteFaq);
router.get("/faqs", getFaqs);
router.post("/faqs", createFaq);
router.put("/faqs/:id", updateFaq);

export default router;
