//[x]  Checked

const Learner = require('../models/learner.model');
const Course = require('../models/course.model');

//TODO
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
  // try {
  const learner = await Learner.find({ user: req.user._id });
  if (!learner) {
    return res.status(404).json({
      message: 'No user found',
    });
  }
  const purchasedCourcesIds = learner[0].coursesPurchased;
  console.log(purchasedCourcesIds);

  if (purchasedCourcesIds.length === 0) {
    return res.status(404).json({
      message: 'You have not purchased any course',
    });
  }

  const purchasedCourses = await Course.find({
    _id: { $in: purchasedCourcesIds },
  });

  return res.json({
    message: `${purchasedCourcesIds.length} Purchased courses found`,
    purchasedCourses,
  });
  // } catch (error) {
  //   return res.status(500).json({
  //     message: 'Error fetching the Purchased course',
  //     error,
  //   });
  // }
};
