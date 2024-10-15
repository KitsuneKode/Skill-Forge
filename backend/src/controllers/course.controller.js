const Course = require('../models/course.model');
const Learner = require('../models/learner.model');

exports.getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find({ status: 'published' });
    console.log(courses);
    if (!courses) {
      res.status(404).json({
        message: 'No courses found',
      });
    }
    res.json(courses);
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching all the courses',
      error,
    });
  }
};

exports.getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    console.log(course);
    if (!course) {
      res.status(404).json({
        message: 'No course found',
      });
    }
    res.json(course);
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching the courses',
      error,
    });
  }
};

exports.createCourse = async (req, res) => {
  try {
    const course = await Course.create({
      ...req.body,
    });

    if (!course) {
      res.status(500).json({
        message: 'Error creating the course',
      });
    }
  } catch (error) {
    res.status(500).json({
      message: 'Error creating the course',
      error,
    });
  }
};

exports.enrollInCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      res.status(404).json({
        message: 'No course found',
      });
    }

    if (course.enrollInCourse.includes(req.user._id)) {
      res.status(400).json({
        message: 'Already enrolled in the course',
      });
    }

    course.enrollInCourse.push(req.user._id);
    await course.save();

    const learner = await Learner.find({ user: req.user._id });
    learner.coursesPurchased.push(course._id);
    await learner.save();

    res.json({
      message: 'Successfully enrolled in the course',
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error enrolling in the course',
      error,
    });
  }
};
