// [x]  Checked

const Course = require('../models/course.model');
const Instructor = require('../models/instructor.model');
const mongoose = require('mongoose');

exports.getInstructorsCourses = async (req, res) => {
  try {
    const user = req.user;

    const courses = (
      await Instructor.findOne({ user: user._id }).populate('coursesTaught')
    )?.coursesTaught;

    if (!courses) {
      res.status(404).json({
        message: 'No course found',
      });
    }
    return res.json({
      message: `${courses.length} courses found`,
      courses,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Error fetching the courses',
      error,
    });
  }
};

exports.updateCourse = async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = [
    'title',
    'description',
    'price',
    'category',
    'courseImageURL',
    'status',
  ];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).json({ message: 'Invalid updates!' });
  }
  try {
    const courseId = mongoose.Types.ObjectId.createFromHexString(req.params.id);
    const course = await Course.findByIdAndUpdate(
      courseId,
      { ...req.body },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    return res.json({ message: 'Course was updated', course });
  } catch (error) {
    res.status(500).json({
      message: 'Error updating the course',
      error,
    });
  }
};

exports.deleteCourse = async (req, res) => {
  try {
    const courseId = mongoose.Types.ObjectId.createFromHexString(req.params.id);
    const course = await Course.findOneAndDelete({ _id: courseId });

    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    return res.json({ message: 'Course was deleted successfully' });
  } catch (error) {
    return res.status(500).json({
      message: 'Error deleting the course',
      error,
    });
  }
};

exports.getInstructorProfile = async (req, res) => {
  try {
    const instructor = await Instructor.findOne({
      user: req.user._id,
    }).populate('coursesTaught');
    if (!instructor) {
      return res.status(404).json({
        message: 'Account not found',
      });
    }

    const profile = {
      name: req.user.firstName + ' ' + req.user.lastName,
      email: req.user.email,
      expertise: instructor.expertise,
      bio: instructor.bio,
      coursesTaught: instructor.coursesTaught.length,
      courses: instructor.coursesTaught,
    };

    return res.json({ message: 'Here is your Profile', profile });
  } catch (error) {
    return res.status(500).json({
      message: 'Error fetching the instructor profile',
      error,
    });
  }
};

//TODOS
exports.updateInstructorProfile = async (req, res) => {
  return res.json({ message: 'yet to be implemented' });
};
exports.deleteInstructorProfile = async (req, res) => {
  return res.json({ message: 'yet to be implemented' });
};

exports.getDashboardStats = async (req, res) => {
  // Implement dashboard statistics logic
  res.send('Dashboard stats');
};

exports.getEarnings = async (req, res) => {
  // Implement earnings calculation logic
  res.send('Earnings data');
};
