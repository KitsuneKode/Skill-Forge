const Learner = require('../models/learner.model');

//FIXME
exports.getLearnerProfile = async (req, res) => {
  try {
    const learner = await Learner.findOne({ user: req.user._id });
    if (!learner) {
      return res.status(404).json({
        message: 'No user found',
      });
    }

    res.json({ learner });
  } catch (error) {}
};

exports.getPurchasedCourses = async (req, res) => {
  try {
    const learner = await Learner.find({ user: req.user._id });
    if (!learner) {
      res.status(404).json({
        message: 'No user found',
      });
    }
    res.json({
      PurchasedCourses: learner.coursesPurchased,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching the Purchased course',
      error,
    });
  }
};
