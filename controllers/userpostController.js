const userposts = require('../Models/userpostModal');
const userpost = require('../Models/userpostModal');
const { deleteUser } = require('./userController');

exports.addPosts = async(req,res)=>{
    console.log('running addpost function');
    const userId = req.payload
   // console.log(userId);

    const postimage = req.file.filename
    const {caption} = req.body
   // console.log(`${postimage},\n ${caption}`);
    try{
      const newpost = new userposts({
        postimage,
        caption,
        userId
      })
      //console.log({postimage,caption,userId});
      await newpost.save()
      res.status(200).json(newpost)
    }
    catch (err) {
      console.error('Error:', err);
      res.status(401).json("Request failed due to an error");
    }
}

//get user post 
exports.userprofileposts = async(req,res)=>{
  const userId = req.payload
  try{
    const getuserposts = await userpost.find({userId})
    res.status(200).json(getuserposts)
  }
  catch(err){
    res.status(401).json(err)
  }
}

//get home user posts
exports.getallposts = async(req,res)=>{
  
  try{
    const allposts = await userpost.find()
    res.status(200).json(allposts)
  }
  catch(err){
    res.status(401).json(err)
  }
}

//edit project
exports.edituserpost = async(req,res)=>{
  const {id} = req.params
  const userId = req.payload
  const {postimage,caption} = req.body
  const newpostimage = req.file?req.file.filename:postimage

  try{
    const editpost = await userpost.findByIdAndUpdate({_id:id},{
      postimage:newpostimage,caption,userId
    },{new:true})

    await editpost.save()
    res.status(200).json(editpost)
  }
  catch(err){
    res.status(401).json(err)
  }
}

//delete post
exports.deletepost = async(req,res)=>{
  const{id} = req.params
  try{
    const deletepost = await userpost.findByIdAndDelete({_id:id})
    res.status(200).json(deletepost)
  }
  catch(err){
    res.status(200).json(err)
  }
}
