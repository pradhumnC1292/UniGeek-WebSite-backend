import mongoose from "mongoose";

const formSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  course: { type: String, required: true },
  submittedAt: { type: Date, default: Date.now },
});

const FormSubmission = mongoose.model("FormSubmission", formSchema);

export default FormSubmission;
