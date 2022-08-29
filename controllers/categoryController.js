const categorySchema = require('../models/categorySchema');
const productSchema = require('../models/productSchema');

const categoryController = {

  // ADD NEW CATEGORY
  addCategory: async (req, res) => {
    try {
      const newCategory = new categorySchema(req.body);
      const savedCategory = await newCategory.save();
      return res.status(200).json(savedCategory);
    } catch (error) {
      console.log(error);
      return  res.status(500).json(error);
    }
  },

  // GET ALL CATEGORY 
  getAllCategories: async (req, res) => {
    try {
      const categories = await categorySchema.find();
      return res.status(200).json(categories);
    } catch (error) {
      console.log(error);
      return  res.status(500).json(error);
    }
  },

  // GET A CATEGORY
  getACategory: async (req, res) => {
    try {
      const category = await categorySchema.findOne({ categoryName: req.query.name }).populate('products');
      return res.status(200).json(category);
    } catch (error) {
      console.log(error);
      return  res.status(500).json(error);
    }
  },

  // UPDATE A CATEGORY
  updateACategory: async (req, res) => {
    try {
      const category = await categorySchema.findById(req.params.id);
      await category.updateOne({ $set: req.body });
      return res.status(200).json('Update successfully!');
    } catch (error) {
      console.log(error);
      return  res.status(500).json(error);
    }
  },

  // DELETE A CATEGORY
  deleteACategory: async (req, res) => {
    try {
      await productSchema.updateMany(
        { $categoryId: req.params.id },
        { $set: { $categoryId: null } }
      );
      await categorySchema.findByIdAndDelete(req.params.id);
      return res.status(200).json('Delete successfully!');
    } catch (error) {
      console.log(error);
      return  res.status(500).json(error);
    }
  },

  // DELETE ALL CATEGORIES
  deleteAllCategories: async (req,res) => {
    try {
      await categorySchema.deleteMany();
      return res.json('Categories are empty now!')
    } catch (error) {
      console.log(error);
      return  res.status(500).json(error);
    }
  }

};

module.exports = categoryController;