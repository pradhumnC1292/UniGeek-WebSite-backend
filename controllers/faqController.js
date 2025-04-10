import Faq from "../models/Faq.js";

export const getFaqs = async (req, res) => {
  try {
    const faqs = await Faq.find();
    res.status(200).json({ success: true, data: faqs });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const createFaq = async (req, res) => {
  try {
    const data = req.body;
    let result;
    if (Array.isArray(data)) {
      // If an array of FAQs is sent, insert them all at once.
      result = await Faq.insertMany(data);
    } else {
      // Otherwise, create a single FAQ.
      const { question, answer, category } = req.body;
      result = await Faq.create({ question, answer, category });
    }
    res.status(201).json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: { error } });
  }
};

export const updateFaq = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedFaq = await Faq.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedFaq) {
      return res.status(404).json({ success: false, message: "FAQ not found" });
    }
    res.status(200).json({ success: true, data: updatedFaq });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error", error });
  }
};

export const deleteAllFaqs = async (req, res) => {
  try {
    const result = await Faq.deleteMany({});
    res.status(200).json({
      success: true,
      message: "All FAQs deleted successfully",
      result,
    });
  } catch (error) {
    console.error("Error deleting all FAQs:", error);
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

export const deleteFaq = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedFaq = await Faq.findByIdAndDelete(id);
    if (!deletedFaq) {
      return res.status(404).json({ success: false, message: "FAQ not found" });
    }
    res
      .status(200)
      .json({ success: true, message: "FAQ deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error", error });
  }
};
