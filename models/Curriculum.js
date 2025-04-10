import mongoose from "mongoose";

const subtopicSchema = new mongoose.Schema({
  heading: { type: String, required: true },
  points: [String],
});

const curriculumSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  program: { type: String, required: true }, // New field to indicate the course stack
  details: {
    summary: [String],
    subtopics: [subtopicSchema],
    outcome: [String],
    tools: [String],
  },
});

export default mongoose.model("Curriculum", curriculumSchema);
