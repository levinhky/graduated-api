const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true
  },
  productPrice: {
    type: Number,
    required: true
  },
  productThumbnail: {
    type: String,
    required: true
  },
  productDescription: {
    type: String
  },
  slug: {
    type: String
  },
  productCode: {
    type: String
  },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  }
}, {timestamps:true});

productSchema.index({ "productName": "text" })

module.exports = mongoose.model('Product', productSchema);