import mongoose from "mongoose";

const mentorSchema = new mongoose.Schema({
  tag: { type: String, required: true },
  name: { type: String, required: true },
  position: { type: String, required: true },
  company: { type: String, required: true },
  experience: { type: String, required: true },
  linkedin: { type: String, required: false },
  image: { type: String, required: true }, // URL or path to the mentor image
});

const Mentor = mongoose.model("Mentor", mentorSchema);

export default Mentor;
