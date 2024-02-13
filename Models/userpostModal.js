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
    likes: {
        type: Number,
        default: 0
    },
    dislikes: {
        type: Number,
        default: 0
    },
})

const userposts = mongoose.model("userposts",postModal)

module.exports = userposts