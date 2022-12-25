const orderSchema = require('../models/orderSchema');
const mailer = require('../global/mailer');

const orderController = {

    // CREATE ORDER
    createOrder: async (req, res) => {
        try {
            const newOrder = new orderSchema(req.body);
            const savedOrder = await newOrder.save();
            return res.status(200).json(savedOrder);
        } catch (error) {
            console.log(error);
            return res.status(500).json(error);
        }
    },

    // GET ALL ORDER
    getAllOrder: async (req, res) => {
        try {
            const orders = await orderSchema.find();
            return res.status(200).json(orders);
        } catch (error) {
            console.log(error);
            return res.status(500).json(error);
        }
    },

    // GET AN ORDER
    getAnOrder: async (req, res) => {
        try {
            const order = await orderSchema.findById(req.params.id);
            return res.status(200).json(order);
        } catch (error) {
            console.log(error);
            return res.status(500).json(error);
        }
    },

    // GET ORDER BY USER ID
    getOrderByUser: async (req, res) => {
        try {
            const order = await orderSchema.find({userId: req.params.id});
            console.log(req.params.id)
            return res.status(200).json(order);
        } catch (error) {
            console.log(error);
            return res.status(500).json(error);
        }
    },

    // UPDATE AN ORDER
    updateAnOrder: async (req, res) => {
        try {
            const order = await orderSchema.findById(req.params.id);
            console.log(order)
            await order.updateOne({$set: req.body});
            const orders = await orderSchema.find();
            return res.status(200).json(orders);
        } catch (error) {
            console.log(error);
            return res.status(500).json(error);
        }
    },

    // DELETE AN ORDER
    deleteAnOrder: async (req, res) => {
        try {
            await orderSchema.findByIdAndDelete(req.params.id);
            const orders = await orderSchema.find();
            return res.status(200).json(orders);
        } catch (error) {
            console.log(error);
            return res.status(500).json(error);
        }
    },

    // DELETE ALL ORDER
    dropOrder: async (req, res) => {
        try {
            await orderSchema.deleteMany();
            return res.status(200).json('Orders are empty now!')
        } catch (error) {
            console.log(error);
            return res.status(500).json(error);
        }
    },
     sendMail: async (req, res) => {
        try {
            const currentdate = new Date();
            const to = req.query.to;
            const name = req.body.fullName;
            const html = `<div class="content">
                <div class="welcome">
                    Dear ${name},
                    Thank you for your order from Pashi.
                    If you have any question about your order,
                    you can email us at <a href="mailto:pashion.shopping@gmail.com">pashion.shopping@gmail.com</a>
                </div>
            </div>`;
            await mailer.sendMail(to, 'Your Pashi order confirmation', html);
            return res.status(200).json('Send email successfully');
        } catch (error) {
            return res.status(500).json(error);
        }
    }
}

module.exports = orderController;