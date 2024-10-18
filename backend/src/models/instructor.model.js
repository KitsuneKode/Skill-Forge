// [x] CHECKED

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const InstructorSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
    coursesTaught: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
    bio: {
      type: String,
      required: true,
    },
    expertise: {
      type: String,
      required: true,
    },
    //TODO
    kyc: {
      type: String,
      // required: true,
      enum: ['verified', 'processing', 'rejected'],
      default: 'processing',
    },
    earnings: {
      type: Number,
      //   required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('instructor', InstructorSchema);
