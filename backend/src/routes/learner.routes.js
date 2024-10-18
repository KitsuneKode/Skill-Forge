//[x]  Checked

const express = require('express');
const {
  getLearnerProfile,
  getPurchasedCourses,
} = require('../controllers/learner.controlller');
const {
  authenticateToken,
  authenticateRole,
} = require('../middleware/auth.middleware');

const router = express.Router();

router.get(
  '/courses',
  authenticateToken,
  authenticateRole('learner'),
  getPurchasedCourses
);

//TODO
router.get('/profile', getLearnerProfile);

module.exports = router;
