import Curriculum from "../models/Curriculum.js";

// Get all curriculums, optionally filtering by program if provided via query parameter.
// For example: GET /api/curriculum?program=mern
export const getCurriculums = async (req, res) => {
  try {
    let filter = {};
    if (req.query.program) {
      filter.program = req.query.program;
    }
    const curriculums = await Curriculum.find(filter);
    res.status(200).json(curriculums);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Get a single curriculum by its ID.
export const getCurriculumById = async (req, res) => {
  try {
    const curriculum = await Curriculum.findById(req.params.id);
    if (!curriculum)
      return res.status(404).json({ message: "Curriculum not found" });
    res.status(200).json(curriculum);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Create a curriculum document or multiple documents if req.body is an array.
export const createCurriculum = async (req, res) => {
  try {
    let result;
    if (Array.isArray(req.body)) {
      // Insert many documents at once.
      result = await Curriculum.insertMany(req.body);
    } else {
      // Create a single document.
      const newCurriculum = new Curriculum(req.body);
      result = await newCurriculum.save();
    }
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Update an existing curriculum by its ID.
export const updateCurriculum = async (req, res) => {
  try {
    const updatedCurriculum = await Curriculum.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedCurriculum)
      return res.status(404).json({ message: "Curriculum not found" });
    res.status(200).json(updatedCurriculum);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Delete a single curriculum by its ID.
export const deleteCurriculum = async (req, res) => {
  try {
    const deletedCurriculum = await Curriculum.findByIdAndDelete(req.params.id);
    if (!deletedCurriculum)
      return res.status(404).json({ message: "Curriculum not found" });
    res.status(200).json({ message: "Curriculum deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Delete all curriculum documents.
export const deleteAllCurriculums = async (req, res) => {
  try {
    await Curriculum.deleteMany({});
    res.status(200).json({ message: "All curriculum data deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
