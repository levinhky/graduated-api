const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  thumbnails: [
    {
      thumbnail: {
        type: String
      },
    }
  ],
  description: {
    type: String
  },
  quantity: {
    type: Number,
    required: true
  },
  stockStatus: {
    type: String,
  },
  slug: {
    type: String
  },
  sku: {
    type: String
  },
  variants: {
    sizes: [
      {
        size:String,
        quantity:Number,
        productCode: String
      }
    ],
    colors: [
      {
        name:String
      }
    ]
  },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  }
}, {timestamps:true});

productSchema.index({ "name": "text" }, { unique:true });

module.exports = mongoose.model('Product', productSchema);