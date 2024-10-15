const express = require('express');
const {
  getAllCourses,
  createCourse,
  enrollInCourse,
  getCourseById,
} = require('../controllers/course.controller');

const router = express.Router();

//FIXME roleAuth
router.get('/courses', getAllCourses);
router.get('/courses/:id', getCourseById);
router.post('/courses', createCourse);
router.post('/courses/:id/purchase', enrollInCourse);

module.exports = router;
