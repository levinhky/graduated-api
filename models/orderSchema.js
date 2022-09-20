const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  productId: {
    type: String
  },
  productName: {
    type: String
  },
  productPrice: {
    type: Number
  },
  productCode: {
    type: String
  },
  quantity: {
    type: Number
  },
  userId: {
    type: String
  }
}, {timestamps:true});

module.exports = mongoose.model('Order', orderSchema);