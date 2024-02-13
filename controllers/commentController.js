// commentController.js

const Comment = require('../Models/commentModal')

exports.addComment = async (req, res) => {
    const { userId, postId, text } = req.body;

    try {
        const newComment = new Comment({
            userId,
            postId,
            text,
        });

        await newComment.save();

        res.status(201).json(newComment);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
