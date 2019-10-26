const mongoose = require('mongoose');

const PaymentSchema = mongoose.Schema({
  PaymentEmailId: {
    type: String,
    required: true,
    trim: true
  },
  plan: {type: String},
  amount: {type: Number},
  activatedDate: {type: Date},
  validTill: {type: Date},
  discount: {type: Number},
  txnId: {type: String},
  coupon: {type: String}
});

PaymentSchema.statics.getPaymentByUserEmailId = function(userEmailId, callback) {
  let query = {userEmailId: userEmailId};
  Payment.findOne(query, callback);
}

PaymentSchema.statics.getPayments = () => {
  return Payment.find({});
}

PaymentSchema.statics.addPayment = function(newPayment, callback) {
};

const Payment = mongoose.model('Payment', PaymentSchema);
module.exports = Payment;
