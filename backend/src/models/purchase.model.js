const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PurchaseSchema = new Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course',
      required: true,
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

// PurchaseSchema.pre('save', async function (next) {
//   if (this.isModified('password')) {
//     this.password = await bcrypt.hash(this.password, 10);
//   }
//   next();
// });

module.exports = mongoose.model('Purchase', PurchaseSchema);
