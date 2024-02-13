
const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    userId: {
        type:String,
      
        required: true,
    },
    postId: {
        type: String,
        required: true,
    },
    text: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
