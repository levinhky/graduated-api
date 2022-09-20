const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    productId: {
        type: String
      },
      content: {
        type: String
      },
      displayName: {
        type: String
      },
      photoUrl: {
        type: String
      },
      userId: {
        type: String,
        required: true
      }
}, {timestamps:true});

module.exports = mongoose.model('Comment', commentSchema);