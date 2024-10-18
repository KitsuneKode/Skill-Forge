//[x]  Checked
const express = require('express');
const {
  getAllCourses,
  createCourse,
  enrollInCourse,
  getCourseById,
} = require('../controllers/course.controller');
const {
  authenticateToken,
  authenticateRole,
} = require('../middleware/auth.middleware');

const router = express.Router();

router.get('/', getAllCourses);
router.get('/:id', getCourseById);
router.post(
  '/:id/purchase',
  authenticateToken,
  authenticateRole('learner'),
  enrollInCourse
);
router.post(
  '/',
  authenticateToken,
  authenticateRole('instructor'),
  createCourse
);

module.exports = router;
