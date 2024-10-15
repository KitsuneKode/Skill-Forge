const express = require('express');
const {
  getLearnerProfile,
  getPurchasedCourses,
} = require('../controllers/learner.controlller');

const router = express.Router();

router.get('/profile', getLearnerProfile);
router.get('/purchased-courses', getPurchasedCourses);

module.exports = router;
