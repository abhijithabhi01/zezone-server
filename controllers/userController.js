const { query } = require('express');
const users = require('../Models/userModal')
const jwt = require('jsonwebtoken');
const userposts = require('../Models/userpostModal');

//register
exports.register = async (req, res) => {
  console.log('running register controller function');

  const { username, email, password } = req.body;

  try {
      // Convert both email and username to lowercase for case-insensitive check
      const existingUser = await users.findOne({
          $or: [
              { email: email.toLowerCase() },
              { username: username.toLowerCase() }
          ]
      });

      if (existingUser) {
          if (existingUser.email.toLowerCase() === email.toLowerCase()) {
              res.status(406).json("Account with this email already exists, please login.");
          } else {
              res.status(406).json("Username already taken, please choose another one.");
          }
      } else {
          const newUser = new users({
              username,
              email,
              password,
              bio: "",
              profileimage: ""
          });

          await newUser.save();
          res.status(200).json(newUser);
      }
  } catch (err) {
      res.status(401).json(`Registration Failed: ${err}`);
  }
};


exports.login = async(req,res)=>{
    console.log('running login function');

    const {email,password} =req.body
    try{
        const existingUser = await users.findOne({email,password})
        //console.log(existingUser);

        if(existingUser){
            const token = jwt.sign({userId:existingUser._id},"loginkey123")
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



exports.getallusers = async(req,res)=>{
  
    try{
      const allusers = await users.find()
      res.status(200).json(allusers)
    }
    catch(err){
      res.status(401).json(`error getting all users`,err)
    }
  }



  exports.searchusers = async(req,res)=>{
    console.log(`running search user function`);
  const searchuser = req.query.search
  console.log(searchuser);
 
  const query = {
    username:{
        $regex:searchuser, $options:'i'
    }
     
  } 
    try{
      const allusers = await users.find(query)
      res.status(200).json(allusers)
    }
    catch(err){
      res.status(401).json(`error searching users`,err)
    }
  }


exports.edituser = async(req,res)=>{
  const userId=req.payload
  const profileimagee = req.file.filename
  console.log(profileimagee);
  const{username,bio} = req.body
  console.log({username,bio})
  const updateimg = req.file?req.file.filename:profileimage

try{
  const updateuser = await users.findByIdAndUpdate({_id:userId},{username,bio,profileimage:updateimg},{new:true})
  await updateuser.save()
  res.status(200).json(updateuser)
}
catch(err){
  res.status(401).json(`Error editing post`,err)
}

}


// Delete User and User Posts
exports.deleteUser = async (req, res) => {
  const userId = req.payload;

  try {
    // Delete user posts first
    await userposts.deleteMany({ userId });

    // Delete the user
    const deletedUser = await users.findByIdAndDelete({ _id: userId });

    if (deletedUser) {
      res.status(200).json('User and associated posts deleted successfully');
    } else {
      res.status(404).json('User not found');
    }
  } catch (err) {
    res.status(500).json(`Error deleting user: ${err}`);
  }
};