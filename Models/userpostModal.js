const mongoose = require('mongoose')

const postModal = new mongoose.Schema({
    postimage:{
        type:String,
        require:true
    },
    caption:{
        type:String,
        maxlength: 255
    },
    userId:{
        type:String,
    
    },
    likes: [
        {userId: {type: String}}
           ],
    comments: [
        {
        userId: { type: String },
        username: { type: String },
        comment: { type: String }
        }
           ]
 })
const userposts = mongoose.model("userposts",postModal)

module.exports = userposts