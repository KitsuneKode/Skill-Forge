const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CourseSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    courseImageURL: { type: String, required: true },
    instructor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'instructor',
      required: true,
    },
    category: { type: String },
    status: {
      type: String,
      enum: ['published', 'draft', 'pending'],
      default: 'draft',
      // required: true
    },
    enrolledStudents: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Learner',
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Course', CourseSchema);
