//[x]  Checked

const mongoose = require('mongoose');
const Course = require('../models/course.model');
const Learner = require('../models/learner.model');
const Instructor = require('../models/instructor.model');

exports.getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find({ status: 'published' });
    if (!courses) {
      return res.status(404).json({
        message: 'No courses found',
      });
    }
    return res.json({ message: `${courses.length} courses found`, courses });
  } catch (error) {
    return res.status(500).json({
      message: 'Error fetching all the courses',
      error,
    });
  }
};

exports.getCourseById = async (req, res) => {
  try {
    const courseId = mongoose.Types.ObjectId.createFromHexString(req.params.id);
    const course = await Course.findById(courseId);
    if (!course) {
      res.status(404).json({
        message: 'Course not found',
      });
    }
    res.json({ message: `Course found: ${course.title}`, course });
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching the courses',
      error,
    });
  }
};

exports.createCourse = async (req, res) => {
  try {
    const { title, description, price, courseImageURL, category, status } =
      req.body;

    const instructor = await Instructor.findOne({ user: req.user._id });

    if (!instructor) {
      return res.status(404).json({
        message: 'No instructor found',
      });
    }
    const course = await Course.create({
      title,
      description,
      price,
      courseImageURL,
      category,
      instructor: instructor._id,
      status,
      enrolledStudents: [],
    });
    if (!course) {
      return res.status(500).json({
        message: 'Error creating the course',
      });
    }
    await Instructor.findByIdAndUpdate(instructor._id, {
      $addToSet: { coursesTaught: course._id },
    })
      .then((updatedInstructor) => {
        console.log(
          'Updated Instructor, added course taught:',
          updatedInstructor
        );
      })
      .catch((error) => {
        console.error('Error updating Instructor:', error);
      });

    return res.json({
      message: 'Successfully created course',
      courseId: course._id,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Error creating the course',
      error,
    });
  }
};

exports.enrollInCourse = async (req, res) => {
  try {
    const courseId = mongoose.Types.ObjectId.createFromHexString(req.params.id);

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({
        message: 'Course not found',
      });
    }
    const learner = await Learner.findOne({ user: req.user._id });

    if (course.enrolledStudents.includes(learner._id)) {
      return res.status(400).json({
        message: 'Already enrolled in the course',
      });
    }

    await Course.findByIdAndUpdate(
      course._id,
      {
        $addToSet: { enrolledStudents: learner._id }, // Add the user to the enrolledStudents array
      },
      { new: true } // Return the updated user document
    )
      .then((updatedUser) => {
        console.log('Updated Course, added purchased:', updatedUser);
      })
      .catch((error) => {
        console.error('Error updating Course:', error);
      });

    await Learner.findOneAndUpdate(
      { user: req.user._id },
      {
        $addToSet: { coursesPurchased: course._id },
      },
      { new: true }
    )
      .then((updatedLearner) => {
        console.log(
          'Added course to Learner: ',
          updatedLearner.coursesPurchased
        );
      })
      .catch((error) => {
        console.error('Error updating learner:', error);
      });

    return res.json({
      message: `Successfully enrolled in the course:  ${course.title}`,
      courseId: course._id,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Error enrolling in the course',
      error,
    });
  }
};
