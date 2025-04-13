// controllers/hiringController.js
import Hiring from "../models/Hiring.js";

export const createHiring = async (req, res) => {
  try {
    // Extract text fields from req.body
    const { fullName, email, phone, linkedin } = req.body;
    // If a file was uploaded, Multer adds it to req.file
    const requrment_doc = req.file ? req.file.path : null;

    // Create a new Hiring document
    const newHiring = new Hiring({
      fullName,
      email,
      phone,
      linkedin,
      requrment_doc,
    });

    await newHiring.save();

    res.status(201).json({
      message: "Hiring form submitted successfully",
      data: newHiring,
    });
  } catch (error) {
    console.error("Error in createHiring:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
