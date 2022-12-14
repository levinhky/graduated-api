const orderSchema = require('../models/orderSchema');
const mailer = require('../global/mailer');
const {vnd} = require("../global/functions");

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
            const { fullName, address, total, notes, shippingMethod, products } = req.body;
            const rockkk = products.map(product => {
                return `
                    <td>${product.name}</td>
                    <td style="text-align: right">${product.quantity}</td>
                    <td style="text-align: right">${vnd(product.price)}</td>
                 `;
            });
            const html = `<div class="content">
                <div class="welcome">
                    Dear ${fullName},
                    Thank you for your order from Pashi.
                    If you have any question about your order,
                    you can email us at <a href="mailto:pashion.shopping@gmail.com">pashion.shopping@gmail.com</a>
                </div>
                 <div class="order-info">
                    <div class="time">Placed on ${currentdate}</div>
                     <table style="width: 600px; margin-top: 20px">
                  <tr>
                    <th style="text-align: left">Billing Info</th>
                    <th style="text-align: right">Shipping Info</th>
                  </tr>
                  <tr>
                    <td>
                    <p>${fullName}</p>
                    <p>${address}</p>
                    </td>
                    <td style="text-align: right">
                    <p>${fullName}</p>
                    <p>${address}</p>
                    </td>
                  </tr>
                </table>
                  <table style="width: 600px; margin-top: 20px">
                  <tr>
                    <th style="text-align: left">Order Notes</th>
                    <th style="text-align: right">Shipping Method</th>
                  </tr>
                  <tr>
                    <td>
                    <span>${notes ? notes : ''}</span>
                    </td>
                    <td style="text-align: right">
                    <p>${shippingMethod}</p>
                        </td>
                  </tr>
                </table>
                  <table style="width: 600px; margin-top: 20px">
                  <tr>
                    <th style="text-align: left">Items</th>
                    <th style="text-align: right">Qty</th>
                    <th style="text-align: right">Price</th>
                  </tr>
                  <tr>
                   ${rockkk}
                  </tr>
                </table>
                    <footer style="text-align: right; background-color: #f5f5f5; padding: 10px; width: 600px">
                        <div style="margin-bottom: 5px;">Subtotal: ${vnd(total)}</div>
                        <div style="margin-bottom: 5px;">Shipping & Handling: ${vnd(0)}</div>
                        <div style="font-weight: bold;">Grand Total (Excl.Tax): ${vnd(total)}</div>
                    </footer>
                </div>
            </div>`;
            await mailer.sendMail(to, 'Your Pashi order confirmation', html);
            return res.status(200).json('Send email successfully');
        } catch (error) {
            console.log(error);
            return res.status(500).json(error);
        }
    },
    sendRegister: async (req, res) => {
        try {
            const to = req.query.to;
            const { fullName } = req.body;
            const html = `<div class="content">
                <h1>Welcome to Pashi</h1>
                <div class="welcome">
                    Thank you for your registration . <br>
                    <b>Our website link</b>: <a href="https://pashion.netlify.app">pashion.netlify.app</a> <br>
                    <b>Facebook</b>: <a href="https://pashion.netlify.app">Pashi Shop</a>  <br>
                    <b>Twitter</b>: <a href="https://pashion.netlify.app">Pashi</a> <br>
                    <b>Instagram</b>: <a href="https://pashion.netlify.app">pashi.shop</a>
                </div>
                    <footer>
                       
                    </footer>
                </div>
            </div>`;
            await mailer.sendMail(to, `Thank you for your registration  on Pashi`, html);
            return res.status(200).json('Send email successfully');
        } catch (error) {
            console.log(error);
            return res.status(500).json(error);
        }
    }
}

module.exports = orderController;