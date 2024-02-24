
const mongoose = require('mongoose')

const validator = require('validator')

const userModal = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        min:[3,'Must be atleast 3,got {value}']
    },
    email:{
        type:String,
        required:true,
        unique:true,
        validator(value){
            if(!validator.isEmail(value)){
                throw new Error('Invalid Email');
            }
        }},
    password:{
                type:String,
                required:true
            },
    bio:{
                type:String
            },
    profileimage:{
                type:String
            },
    followers: [
            {
            userId: {type: String},
            username: {type: String}
            }
                   ],
})

//model 
const users = mongoose.model("users",userModal)

module.exports = users