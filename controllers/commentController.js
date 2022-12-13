const commentSchema = require('../models/commentSchema');

const commentController = {
    addComment: async (req, res) => {
        try {
            const newComment = new commentSchema(req.body);
            newComment.display = true;
            const savedComment = await newComment.save();
            const comments = await commentSchema.find();
            return res.status(200).json(comments);
        } catch (error) {
            console.log(error);
            return res.status(500).json(error);
        }
    },

    getComments: async (req, res) => {
        try {
            const comments = await commentSchema.find();
            return res.status(200).json(comments);
        } catch (error) {
            console.log(error);
            return res.status(500).json(error);
        }
    },

    getSpecificComment: async (req, res) => {
        try {
            const comments = await commentSchema.findById(req.params.id);
            return res.status(200).json(comments);
        } catch (error) {
            console.log(error);
            return res.status(500).json(error);
        }
    },

    getCommentByProduct: async (req, res) => {
        try {
            const comments = await commentSchema.find({productId: req.params.id});
            return res.status(200).json(comments);
        } catch (error) {
            console.log(error);
            return res.status(500).json(error);
        }
    },

    updateAComment: async (req, res) => {
        try {
            const comment = await commentSchema.findById(req.params.id);
            await comment.updateOne({$set: req.body});
            const comments = await commentSchema.find();
            return res.status(200).json(comments);
        } catch (error) {
            console.log(error);
            return res.status(500).json(error);
        }
    },

    deleteAComment: async (req, res) => {
        try {
            await commentSchema.findByIdAndDelete(req.params.id);
            const comments = await commentSchema.find();
            return res.status(200).json(comments);
        } catch (error) {
            console.log(error);
            return res.status(500).json(error);
        }
    },

    dropComments: async (req, res) => {
        try {
            await commentSchema.deleteMany();
            return res.json('Comments are empty now!');
        } catch (error) {
            console.log(error);
            return res.status(500).json(error);
        }
    }
};

module.exports = commentController;