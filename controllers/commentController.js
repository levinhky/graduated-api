const commentSchema = require('../models/commentSchema');

const commentController = {
     addComment: async (req,res) => {
        try {
            const newComment = new commentSchema(req.body);
            const savedComment = await newComment.save();
            return res.status(200).json(savedComment);
        } catch (error) {
            console.log(error);
            return  res.status(500).json(error);
        }
    },

    getComments: async (req,res) => {
        try {
            const comments = await commentSchema.find();
            return res.status(200).json(comments);
          } catch (error) {
            console.log(error);
            return  res.status(500).json(error);
          }
    },

    getSpecificComment: async (req, res) => {
        try {
          const comments = await commentSchema.find({ userId: req.query.userId });
          return res.status(200).json(comments);
        } catch (error) {
          console.log(error);
          return  res.status(500).json(error);
        }
      },

    dropComments: async (req,res) => {
        try {
          await commentSchema.deleteMany();
          return res.json('Comments are empty now!'); 
        } catch (error) {
          console.log(error);
          return  res.status(500).json(error);
        }
      }
};

module.exports = commentController;