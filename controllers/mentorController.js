// import Mentor from "../models/Mentor.js";

// // GET all mentors
// export const getMentors = async (req, res) => {
//   try {
//     const mentors = await Mentor.find();
//     res.status(200).json(mentors);
//   } catch (error) {
//     console.error("Error fetching mentors:", error);
//     res.status(500).json({ error: "Failed to fetch mentors" });
//   }
// };

// // POST a new mentor
// export const createMentor = async (req, res) => {
//   try {
//     const mentor = new Mentor(req.body);
//     await mentor.save();
//     res.status(201).json(mentor);
//   } catch (error) {
//     console.error("Error creating mentor:", error);
//     res.status(500).json({ error: "Failed to create mentor" });
//   }
// };

// // PUT update an existing mentor by ID
// export const updateMentor = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const updatedMentor = await Mentor.findByIdAndUpdate(id, req.body, {
//       new: true,
//       runValidators: true,
//     });
//     if (!updatedMentor) {
//       return res.status(404).json({ error: "Mentor not found" });
//     }
//     res.status(200).json(updatedMentor);
//   } catch (error) {
//     console.error("Error updating mentor:", error);
//     res.status(500).json({ error: "Failed to update mentor" });
//   }
// };

import Mentor from "../models/Mentor.js";
import cloudinary from "../config/cloudinary.js";

export const getMentors = async (req, res) => {
  try {
    const mentors = await Mentor.find();
    res.status(200).json(mentors);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch mentors" });
  }
};

export const createMentor = async (req, res) => {
  try {
    let imageUrl = req.body.image || "";
    if (req.file) {
      const result = await cloudinary.v2.uploader.upload(req.file.path, {
        folder: "mentors",
      });
      imageUrl = result.secure_url;
    }

    const mentorData = { ...req.body, image: imageUrl };
    const mentor = new Mentor(mentorData);
    await mentor.save();

    res.status(201).json(mentor);
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const updateMentor = async (req, res) => {
  try {
    const { id } = req.params;
    let imageUrl = req.body.image || "";

    if (req.file) {
      const result = await cloudinary.v2.uploader.upload(req.file.path, {
        folder: "mentors",
      });
      imageUrl = result.secure_url;
    }

    const updatedData = { ...req.body, image: imageUrl };

    const updatedMentor = await Mentor.findByIdAndUpdate(id, updatedData, {
      new: true,
      runValidators: true,
    });

    if (!updatedMentor) {
      return res.status(404).json({ error: "Mentor not found" });
    }

    res.status(200).json(updatedMentor);
  } catch (error) {
    res.status(500).json({ error: "Failed to update mentor" });
  }
};
