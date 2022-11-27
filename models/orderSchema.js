const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    orderId: {
        type: String
    },
    products: [
        {
            productId: String,
            name: String,
            price: Number,
            sku: String,
            quantity: Number,
            userId: String,
            status: String,
            fullName: String,
            Email: String,
            PhoneNumber: Number,
            Address: String,
            DeliveryMethod: String,
            PaymentMethod: String
        }
    ],
}, {timestamps: true});

module.exports = mongoose.model('Order', orderSchema);