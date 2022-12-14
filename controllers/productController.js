const {slugify} = require('../global/functions');
const categorySchema = require('../models/categorySchema');
const productSchema = require('../models/productSchema');

const productController = {
    // ADD PRODUCT
    addProduct: async (req, res) => {
        const randomProductCode = Math.random().toString(36).substring(2, 7).toUpperCase();
        let sizes = [];
        if (req.body.sizes) for (let size of req.body.sizes) {
            sizes.push(
                {
                    ...size,
                    productCode: (Math.random() + 1).toString(36).substring(7).toUpperCase(),
                    id: Math.floor(Math.random() * 6) + 1
                }
            )
        }

        try {
            const newProduct = new productSchema(req.body);
            newProduct.slug = slugify(req.body.name);
            newProduct.sku = randomProductCode;
            newProduct.sizes = sizes;
            const savedProduct = await newProduct.save();
            if (req.body.categoryId) {
                const category = await categorySchema.findById(req.body.categoryId);
                await category.updateOne({$push: {products: savedProduct._id}});
            }
            return res.status(200).json(savedProduct);
        } catch (error) {
            console.log(error);
            return res.status(500).json(error);
        }
    },

    // GET ALL PRODUCTS
    getAllProducts: async (req, res) => {
        let limit = req.query.limit;
        let page = req.query.page || 1;
        let search = req.query.q;
        let products = null;
        let sort = req.query.sort;
        let totalPages = 0;
        let total = 0;
        try {
            if (!limit && !page) {
                products = await productSchema.find({});
            } else {
                products = await productSchema.find().skip((page - 1) * limit).limit(limit);
            }

            if (search) {
                products = await productSchema.find({$text: {$search: search}});
            }

            if (sort === 'asc') {
                products = await productSchema.find({}).sort({_id: 1}).skip((page - 1) * limit).limit(limit);
            } else if (sort === 'desc') {
                products = await productSchema.find({}).sort({_id: -1}).skip((page - 1) * limit).limit(limit);
            } else if (sort === 'name-desc') {
                products = await productSchema.find({}).sort({name: -1}).skip((page - 1) * limit).limit(limit);
            } else if (sort === 'name-asc') {
                products = await productSchema.find({}).sort({name: 1}).skip((page - 1) * limit).limit(limit);
            } else if (sort === 'price-desc') {
                products = await productSchema.find({}).sort({price: -1}).skip((page - 1) * limit).limit(limit);
            } else if (sort === 'price-asc') {
                products = await productSchema.find({}).sort({price: 1}).skip((page - 1) * limit).limit(limit);
            }
            total = await productSchema.countDocuments({});
            totalPages = Math.ceil(total / limit);
            return res.status(200).json({totalPages, products});
        } catch (error) {
            console.log(error);
            return res.status(500).json(error);
        }
    },

    // GET A PRODUCT
    getAProduct: async (req, res) => {
        try {
            const product = await productSchema.findOne({slug: req.query.slug}).populate('categoryId');
            return res.status(200).json(product);
        } catch (error) {
            console.log(error);
            return res.status(500).json(error);
        }
    },

    getProductByCategory: async (req, res) => {
        let limit = req.query.limit;
        let page = req.query.page || 1;
        try {
            const products = await productSchema.find({category_slug: req.query.name}).skip((page - 1) * limit).limit(limit);
            const total = await productSchema.find({category_slug: req.query.name}).countDocuments({});
            totalPages = Math.ceil(total / limit);
            return res.status(200).json({totalPages, products});
        } catch (error) {
            console.log(error);
            return res.status(500).json(error);
        }
    },

    getAProductById: async (req, res) => {
        try {
            const product = await productSchema.findById(req.params.id).populate('categoryId');
            console.log(req.params.id)
            return res.status(200).json(product);
        } catch (error) {
            console.log(error);
            return res.status(500).json(error);
        }
    },

    // UPDATE A PRODUCT
    updateAProduct: async (req, res) => {
        try {
            const product = await productSchema.findById(req.params.id);
            await product.updateOne({$set: req.body, slug: slugify(req.body.name)});
            products = await productSchema.find({});
            return res.status(200).json(products);
        } catch (error) {
            console.log(error);
            return res.status(500).json(error);
        }
    },

    // DELETE A PRODUCT
    deleteAProduct: async (req, res) => {
        try {
            await categorySchema.updateMany(
                {$products: req.params.id},
                {$pull: {products: req.params.id}}
            )
            await productSchema.findByIdAndDelete(req.params.id);
            products = await productSchema.find({});
            return res.status(200).json(products);
        } catch (error) {
            console.log(error);
            return res.status(500).json(error);
        }
    },

    // DELETE ALL PRODUCTS
    deleteAllProducts: async (req, res) => {
        try {
            await productSchema.deleteMany();
            return res.json('Products are empty now!')
        } catch (error) {
            console.log(error);
            return res.status(500).json(error);
        }
    },

    // GET LENGTH
    getRows: async (req, res) => {
        try {
            const totalRows = await productSchema.aggregate([
                {$count: "count"}
            ]);
            //  const totalRows = await productSchema.countDocuments().exec();
            return res.status(200).json(totalRows);
        } catch (error) {
            console.log(error);
            return res.status(500).json(error);
        }
    }
};

module.exports = productController;