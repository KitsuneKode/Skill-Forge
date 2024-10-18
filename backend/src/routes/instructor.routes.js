// [x]  Checked

const express = require('express');
const {
  getInstructorProfile,
  getInstructorsCourses,
  updateCourse,
  deleteCourse,
} = require('../controllers/instructor.controller');
const {
  authenticateToken,
  authenticateRole,
} = require('../middleware/auth.middleware');

const router = express.Router();

router.get(
  '/courses',
  authenticateToken,
  authenticateRole('instructor'),
  getInstructorsCourses
);

router.get(
  '/me',
  authenticateToken,
  authenticateRole('instructor'),
  getInstructorProfile
);

router.put(
  '/courses/:id',
  authenticateToken,
  authenticateRole('instructor'),
  updateCourse
);

router.delete(
  '/courses/:id',
  authenticateToken,
  authenticateRole('instructor'),
  deleteCourse
);

//TODO
// router.put('/profile', updateInstructorProfile);
// router.delete('/profile', deleteInstructorProfile);

module.exports = router;
