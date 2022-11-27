const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    orderId: String,
    userId: String,
    total: String,
    fullName: String,
    email: String,
    phoneNumber: Number,
    address: String,
    deliveryMethod: String,
    paymentMethod: String,
    name: String,
    price: Number,
    sku: String,
    quantity: Number,
    status: String,
}, {timestamps: true});

module.exports = mongoose.model('Order', orderSchema);