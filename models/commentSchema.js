const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    productId: {
        type: String
    },
    productName: {
        type: String
    },
    commentContent: {
        type: String
    },
    displayName: {
        type: String
    },
    photoUrl: {
        type: String
    },
    display: {
        type: Boolean
    },
    userId: {
        type: String
    }
}, {timestamps: true});

module.exports = mongoose.model('Comment', commentSchema);