//TODO: Add the implementation for the Purchase model
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PurchaseSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'learner',
      required: true,
      unique: true,
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course',
      required: true,
      unique: true,
    },
    amount: { type: Number, required: true }, // Final price of the course
    //TODO
    transactionId: { type: String }, // Payment gateway transaction ID

    transactionID: {
      type: String,
      // required: true,
      unique: true,
    },

    paymentStatus: {
      type: String,
      enum: ['success', 'failed', 'pending'],
      default: 'pending',
      //    required: true
    },
    // e.g., 'Stripe', 'PayPal'
    paymentMethod: {
      type: String,
      enum: ['Rayzorpay', 'CRYPTO'],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Purchase', PurchaseSchema);
