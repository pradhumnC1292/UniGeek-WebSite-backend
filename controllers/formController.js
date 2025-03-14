import FormSubmission from "../models/FormSubmission.js";

export const createFormSubmission = async (req, res) => {
  try {
    const { name, email, phone, course } = req.body;
    const submission = new FormSubmission({ name, email, phone, course });
    await submission.save();
    res.status(201).json({ message: "Form submitted successfully" });
  } catch (error) {
    console.error("Error saving form submission:", error);
    res.status(500).json({ error: "Failed to submit form" });
  }
};

export const getFormSubmissions = async (req, res) => {
  try {
    const submissions = await FormSubmission.find();
    res.json(submissions);
  } catch (error) {
    console.error("Error fetching submissions:", error);
    res.status(500).json({ error: "Failed to fetch submissions" });
  }
};
