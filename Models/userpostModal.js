const mongoose = require('mongoose')

const postModal = new mongoose.Schema({
    postimage:{
        type:String,
        require:true
    },
    caption:{
        type:String,
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

const userpost = mongoose.model("userpost",postModal)

module.exports = userpost