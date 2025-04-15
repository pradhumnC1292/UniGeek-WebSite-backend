import Course from "../models/CourseCards.js";

export const getCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.status(200).json({ success: true, data: courses });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch courses" });
  }
};

export const createCourse = async (req, res) => {
  try {
    // If the request body is an array, create multiple courses using insertMany
    if (Array.isArray(req.body)) {
      const coursesData = req.body.map((courseData) => {
        const {
          title,
          courseSubheading,
          batchSize,
          duration,
          features,
          courseRoute,
          disabled,
        } = courseData;
        const brochureFileName = courseData.brochureFileName || "";
        return {
          title,
          courseSubheading,
          batchSize,
          duration,
          features,
          courseRoute,
          brochureFileName,
          disabled: disabled || false,
        };
      });
      const courses = await Course.insertMany(coursesData);
      return res.status(201).json({
        success: true,
        message: "Courses created successfully",
        data: courses,
      });
    } else {
      const {
        title,
        courseSubheading,
        batchSize,
        duration,
        features,
        courseRoute,
        disabled,
      } = req.body;
      let brochureFileName = req.body.brochureFileName || "";
      if (req.file) {
        brochureFileName = req.file.filename;
      }
      const course = new Course({
        title,
        courseSubheading,
        batchSize,
        duration,
        features:
          typeof features === "string"
            ? JSON.parse(features || "[]")
            : features,
        courseRoute,
        brochureFileName,
        disabled: disabled || false,
      });
      await course.save();
      return res.status(201).json({
        success: true,
        message: "Course created successfully",
        data: course,
      });
    }
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to create course", error });
  }
};

export const updateCourse = async (req, res) => {
  try {
    const { id } = req.params;
    let updateData = { ...req.body };
    if (updateData.features && typeof updateData.features === "string") {
      updateData.features = JSON.parse(updateData.features);
    }
    if (req.file) {
      updateData.brochureFileName = req.file.filename;
    }
    const updatedCourse = await Course.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });
    if (!updatedCourse) {
      return res
        .status(404)
        .json({ success: false, message: "Course not found" });
    }
    res.status(200).json({
      success: true,
      message: "Course updated successfully",
      data: updatedCourse,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to update course" });
  }
};

export const deleteCourse = async (req, res) => {
  try {
    // If the request body is an array, delete multiple courses
    if (req.body && Array.isArray(req.body)) {
      const ids = req.body;
      const result = await Course.deleteMany({ _id: { $in: ids } });
      return res.status(200).json({
        success: true,
        message: "Courses deleted successfully",
        data: result,
      });
    } else if (req.params.id) {
      const course = await Course.findByIdAndDelete(req.params.id);
      if (!course) {
        return res
          .status(404)
          .json({ success: false, message: "Course not found" });
      }
      return res
        .status(200)
        .json({ success: true, message: "Course deleted successfully" });
    } else {
      return res.status(400).json({
        success: false,
        message: "No course ID provided for deletion",
      });
    }
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to delete course" });
  }
};
