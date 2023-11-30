const mongoose = require('mongoose');

const tagSchema = mongoose.Schema({
  name: { required: true, type: String },
  image: { required: true, type: String },
});

const Tag = mongoose.model('Tag', tagSchema);

module.exports = Tag;
