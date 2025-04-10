// controllers/MentorFormController.js
import MentorForm from "../models/MentorForm.js";

export const createMentorForm = async (req, res) => {
  try {
    const { fullName, email, phone, role } = req.body;
    // If a file is uploaded, store its path
    const resumePath = req.file ? req.file.path : "";

    const newMentorForm = new MentorForm({
      fullName,
      email,
      phone,
      role,
      resume: resumePath,
    });

    await newMentorForm.save();
    res.status(201).json({ message: "Mentor form submitted successfully" });
  } catch (error) {
    console.error("Error submitting mentor form:", error);
    res.status(500).json({ error: "Server error" });
  }
};
