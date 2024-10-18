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
router.get('/profile', getInstructorProfile);
// router.put('/profile', updateInstructorProfile);
// router.delete('/profile', deleteInstructorProfile);

module.exports = router;
