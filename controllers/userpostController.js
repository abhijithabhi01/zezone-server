const users = require('../Models/userModal');
const userpost = require('../Models/userpostModal');
const postModal = require('../Models/userpostModal')

exports.addPosts = async(req,res)=>{
    console.log('running addpost function');
    const userId = req.payload
   // console.log(userId);

    const postimage = req.file.filename
    const {caption} = req.body
   // console.log(`${postimage},\n ${caption}`);
    try{
      const newpost = new postModal({
        postimage,caption,userId
      })
      await newpost.save()
      res.status(200).json(newpost)
    }
    catch(err){
        res.status(401).json("Request failed due to",err)
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

// exports.likepost = async(req,res)=>{
//   try {
//     const{id} = req.params
//     const post = await likepost.findByIdAndUpdate({_id:id}, { $inc: { likes: 1 } }, { new: true });
//     res.json(post);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// }



// exports.dislikepost = async(req,res)=>{
//   try {
//     const postId = req.params.postId;
//     const post = await dislikepost.findByIdAndUpdate(postId, { $inc: { dislikes: 1 } }, { new: true });
//     res.json(post);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// }



// exports.likepost = async(req,res)=>{
//   const { userId } = req.body; 
// const { postId } = req.params;
//   try {
//     const postlike = await postlike.findById(postId);
  
//     // Check if the user already liked the post
//     if (!postlike.likes.includes(userId)) {
//       postlike.likes.push(userId);
//       await postlike.save();
//       return res.status(200).json({ success: true, message: 'Post liked' });
//     }
  
//     return res.status(400).json({ success: false, message: 'you have already liked the post' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false, message: 'Internal Server Error' });
//   }
// }



// Dislike a post

// exports.dislikepost = async(req,res)=>{

//   const { userId } = req.body;
//   const { postId } = req.params;
  
//   try {
//     const postdislike = await postdislike.findById(postId);
  
//     // Check if the user already disliked the post
//     if (!postdislike.dislikes.includes(userId)) {
//       postdislike.dislikes.push(userId);
//       await postdislike.save();
//       return res.status(200).json({ success: true, message: 'Post disliked' });
//     }
  
//     return res.status(400).json({ success: false, message: 'you have already disliked the post' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false, message: 'Internal Server Error' });
//   }
// }

