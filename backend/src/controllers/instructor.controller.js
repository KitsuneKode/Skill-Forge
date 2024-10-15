const Course = require('../models/course.model');

exports.getInstructorsCourses = async (req, res) => {
  try {
    const courses = Course.find({ instructor: req.body.instructorId });
    if (!courses) {
      res.status(404).json({
        message: 'No course found',
      });
    }
    console.log(courses);
    res.json(courses);
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching the courses',
      error,
    });
  }
};

exports.updateCourse = async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['title', 'description', 'price', 'category'];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).json({ message: 'Invalid updates!' });
  }
  try {
    const course = await Course.findByIdAndUpdate(req.params.id, ...req.body, {
      new: true,
      runValidators: true,
    });

    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    res.json({ message: 'Course was updated', course });
  } catch (error) {
    res.status(500).json({
      message: 'Error updating the course',
      error,
    });
  }
};

exports.deleteCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    res.json({ message: 'Course was deleted', course });
  } catch (error) {
    res.status(500).json({
      message: 'Error deleting the course',
      error,
    });
  }
};

//TODO

exports.getInstructorProfile = async (req, res) => {};
exports.updateInstructorProfile = async (req, res) => {};
exports.deleteInstructorProfile = async (req, res) => {};

//TODO

exports.getDashboardStats = async (req, res) => {
  // Implement dashboard statistics logic
  res.send('Dashboard stats');
};

exports.getEarnings = async (req, res) => {
  // Implement earnings calculation logic
  res.send('Earnings data');
};
