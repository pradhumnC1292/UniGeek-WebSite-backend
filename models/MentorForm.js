// models/MentorForm.js
import mongoose from "mongoose";

const mentorFormSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    role: { type: String, required: true },
    resume: { type: String }, // Will store the file path to the uploaded resume (PDF/DOC)
  },
  { timestamps: true }
);

export default mongoose.model("MentorForm", mentorFormSchema);
