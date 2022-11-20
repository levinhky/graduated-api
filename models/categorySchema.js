const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  categoryName: {
    type: String,
    required: true
  },
  category_slug: {
    type: String
  },
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product'
    }
  ]
}, {timestamps:true});

module.exports = mongoose.model('Category', categorySchema);