const mongoose = require('mongoose');

const bannerSchema = mongoose.Schema({
  name: { required: true, type: String },
  image: { required: true, type: String },
  subname: { required: true, type: String},
  description: { required: true, type: String},
});

const Banner = mongoose.model('Banner', bannerSchema);

module.exports = Banner;
