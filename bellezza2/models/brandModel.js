const mongoose = require('mongoose');

const brandSchema = mongoose.Schema({
  name: { required: true, type: String },
  image: { required: true, type: String },
});

const Brand = mongoose.model('Brand', brandSchema);

module.exports = Brand;
