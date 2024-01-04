const users = require('../Models/userModal')
const jwt = require('jsonwebtoken')

//register
exports.register = async (req,res) => {
    console.log('running register controller function');

    const {username,email,password} = req.body
    console.log(`username:`,username,`email:`,email,`password:`,password);


    try{
        const existingUser = await users.findOne({email})
        if(existingUser){
            res.status(406).json("Account already Exist,please login..")
        }
        else{
            const newUser = new users({
                username,
                email,
                password,
                bio:""
            })
            await newUser.save()
            res.status(200).json(newUser)    
        }
    }catch(err){
        res.status(401).json(`Registration Failed :${err}`)
    }

}
exports.login = async(req,res)=>{
    console.log('running login function');

    const {email,password} =req.body
    try{
        const existingUser = await users.findOne({email,password})
        console.log(existingUser);

        if(existingUser){
            const token = jwt.sign({usedId:existingUser._id},"loginkey123")
            res.status(200).json({
                existingUser,
                token
            })
        }
        else{
            res.status(404).json(`Incorrect Email or Password`) 
        }
    }catch(err){
    res.status(401).json(`Login failed:${err}`) 
}
}

