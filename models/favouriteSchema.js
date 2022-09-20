const mongoose = require('mongoose');

const favouriteSchema = new mongoose.Schema({
    userId: {
        type: String
    },
    products: [
        {
            name: {
                type: String,
                required: true
              },
              price: {
                type: Number,
                required: true
              },
              thumbnail: {
                type: String,
                required: true
              },
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
        }
    ]
}, {timestamps:true});

module.exports = mongoose.model('Favourite', favouriteSchema);