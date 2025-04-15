import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    courseSubheading: { type: String, required: true },
    batchSize: { type: String, required: true },
    duration: { type: String, required: true },
    features: [{ type: String, required: true }],
    courseRoute: { type: String, required: true },
    brochureFileName: { type: String },
    disabled: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model("Course", courseSchema);
