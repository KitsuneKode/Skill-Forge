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

router.get(
  '/me',
  authenticateToken,
  authenticateRole('learner'),
  getLearnerProfile
);

//TODO
// router.put('/me', updateLearnerProfile);

module.exports = router;
