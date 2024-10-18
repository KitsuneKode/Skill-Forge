// [x] CHECKED

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const LearnerSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
    coursesPurchased: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],

    //TODO
    progress: [
      {
        course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
        completedLessons: [
          { type: mongoose.Schema.Types.ObjectId, ref: 'Lesson' },
        ],
        quizScores: [
          {
            quiz: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz' },
            score: Number,
          },
        ],
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Learner', LearnerSchema);
