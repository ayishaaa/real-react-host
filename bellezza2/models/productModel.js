const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
  productname: { required: true, type: String },
  price: { required: true, type: Number },
  offerprice: { required: true, type: Number },
  description: { required: true, type: String },
  category: { required: true, type: String },
  tag: { required: true, type: String },
  brand: { required: true, type: String },
  material: { required: true, type: String },
  images: [{ required: true, type: String }],
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
