const { slugify } = require('../global/functions');
const categorySchema = require('../models/categorySchema');
const productSchema = require('../models/productSchema');

const productController = {

  // ADD PRODUCT
  addProduct: async (req, res) => {
    try {
      const newProduct = new productSchema(req.body);
      newProduct.slug = slugify(req.body.productName);
      const savedProduct = await newProduct.save();
      if (req.body.categoryId) {
        const category = await categorySchema.findById(req.body.categoryId);
        await category.updateOne({ $push: { products: savedProduct._id } });
      }
      return res.status(200).json(savedProduct);
    } catch (error) {
      console.log(error);
    }
  },

  // GET ALL PRODUCTS
  getAllProducts: async (req, res) => {
    try {
      const products = await productSchema.find();
      return res.status(200).json(products);
    } catch (error) {
      console.log(error);
    }
  },

  // GET A PRODUCT
  getAProduct: async (req, res) => {
    try {
      const product = await productSchema.findOne({ slug: req.query.slug }).populate('categoryId');
      return res.status(200).json(product);
    } catch (error) {
      console.log(error);
    }
  },

  // UPDATE A PRODUCT
  updateAProduct: async (req, res) => {
    try {
      const product = await productSchema.findById(req.params.id);
      await product.updateOne({ $set: req.body, slug: slugify(req.body.productName) });
      return res.status(200).json('Update successfully!');
    } catch (error) {
      console.log(error);
    }
  },

  // DELETE A PRODUCT
  deleteAProduct: async (req, res) => {
    try {
      await categorySchema.updateMany(
        { $products: req.params.id },
        { $pull: { products: req.params.id } }
      )
      await productSchema.findByIdAndDelete(req.params.id);
      return res.status(200).json('Delete successfully!');
    } catch (error) {
      console.log(error);
    }
  }
};

module.exports = productController;