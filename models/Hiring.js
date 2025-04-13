// models/Hiring.js
import mongoose from "mongoose";

const HiringSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    linkedin: {
      type: String,
      required: true,
    },
    // Store the file path of the uploaded requirement document (if any)
    requrment_doc: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Hiring", HiringSchema);
