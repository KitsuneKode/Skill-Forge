// [x] CHECKED

const mongoose = require('mongoose');
const Learner = require('./learner.model');
const Instructor = require('./instructor.model');

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
      // required: true,
    },
    enrolledStudents: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Learner',
        },
      ],
      default: [],
    },
  },
  { timestamps: true }
);

CourseSchema.pre('findOneAndDelete', async function (next) {
  try {
    // This refers to the learner being removed
    const courseId = await this.getQuery()._id;
    const course = await this.model.findById(courseId).select('instructor');

    console.log('courseId', courseId);
    await Learner.updateMany(
      { coursesPurchased: courseId }, //  Find all learners who purchased this course
      { $pull: { coursesPurchased: courseId } } // Remove course from coursesPurchased
    );

    const instructorId = course.instructor;

    console.log('instructor', instructorId);
    await Instructor.updateOne(
      { _id: instructorId },
      {
        $pull: { coursesTaught: courseId },
      }
    );

    next(); // Continue with the removal process
  } catch (error) {
    console.log('error in the courseCsdhja', error);
    next(error);
  }
});

module.exports = mongoose.model('Course', CourseSchema);
