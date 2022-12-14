const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String
  },
  price: {
    type: Number
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
    type: Number
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
  sizes: [
    {
      id:Number,
      size:String,
      quantity:Number,
      productCode: String
    }
  ],
  category_slug: {
    type: String
  },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  }
}, {timestamps:true});

productSchema.index({ "name": "text" }, { unique:false });

module.exports = mongoose.model('Product', productSchema);