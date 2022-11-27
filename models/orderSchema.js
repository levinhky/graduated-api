const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    orderId: {
        type: String
    },
    userId: String,
    products: [
        {
            productId: String,
            name: String,
            price: Number,
            sku: String,
            quantity: Number,
            status: String,
            fullName: String,
            email: String,
            phoneNumber: Number,
            address: String,
            deliveryMethod: String,
            paymentMethod: String
        }
    ],
}, {timestamps: true});

module.exports = mongoose.model('Order', orderSchema);