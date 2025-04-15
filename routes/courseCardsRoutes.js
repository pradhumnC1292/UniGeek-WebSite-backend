import express from "express";
import multer from "multer";
import {
  getCourses,
  createCourse,
  updateCourse,
  deleteCourse,
} from "../controllers/courseCardsController.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "coursecards/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

router.get("/", getCourses);
router.post("/", upload.single("brochureFile"), createCourse);
router.put("/:id", upload.single("brochureFile"), updateCourse);
router.delete("/:id", deleteCourse);
router.delete("/", deleteCourse);

export default router;
