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
    shipping: String,
    quantity: Number,
    products: [
        {
            name: String,
            price: Number,
            sku: String,
            slug: String,
            sizes: [
                {
                    size:String,
                    quantity:Number
                }
            ],
        }
    ],
    status: String,
}, {timestamps: true});

module.exports = mongoose.model('Order', orderSchema);