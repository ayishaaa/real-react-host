const mongoose = require('mongoose');

const couponSchema = mongoose.Schema({
  name: { required: true, type: String },
  code: { required: true, type: String },
  discount: { required: true, type: String },
});

const Coupon = mongoose.model('Coupon', couponSchema);

module.exports = Coupon;
