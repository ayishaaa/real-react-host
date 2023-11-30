const mongoose = require('mongoose');

const materialSchema = mongoose.Schema({
  name: { required: true, type: String },
  image: { required: true, type: String },
});

const Material = mongoose.model('Material', materialSchema);

module.exports = Material;
