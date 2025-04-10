import express from "express";
import {
  getCurriculums,
  getCurriculumById,
  createCurriculum,
  updateCurriculum,
  deleteCurriculum,
  deleteAllCurriculums,
} from "../controllers/curriculumController.js";

const router = express.Router();

router.get("/curriculum", getCurriculums);
router.get("/curriculum:id", getCurriculumById);
router.post("/curriculum", createCurriculum);
router.put("/curriculum:id", updateCurriculum);
router.delete("/curriculum:id", deleteCurriculum);
router.delete("/curriculum/all", deleteAllCurriculums);

export default router;
