const users = require('../Models/userModal');
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
  console.log(`running get the userposts`);
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
  console.log(`running get all posts`);
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
console.log(`running edit a post`);
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
  console.log(`running delete a post`);
  const{id} = req.params
  try{
    const deletepost = await userpost.findByIdAndDelete({_id:id})
    res.status(200).json(deletepost)
  }
  catch(err){
    res.status(200).json(err)
  }
}


// like & dislike a post
exports.likePost = async (req, res) => {
  const { id } = req.params;
  const userId = req.payload;
  console.log(`running like function`);
  try {
    const post = await userposts.findOne({ _id: id });

    const likesArray = post.likes.map(like => like.userId);

    if (likesArray.includes(userId)) {
    
      await userposts.updateOne(
        { _id: id },
        { $pull: { likes: { userId } } }
      );
      res.status(210).json({ message: 'Like removed successfully' });
    }
     else {
      
      await userposts.updateOne(
        { _id: id },
        { $push: { likes: { userId } } }
      );
      res.status(200).json({ message: 'Post liked successfully' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// add comment
exports.addComment = async (req, res) => {
  const { id } = req.params;
  const userId = req.payload;
 const {comment} = req.body
console.log(`running add comment function`);
console.log(id,userId,comment);
try {
  const post = await userpost.findById(id);
  const usrs = await users.findById(userId)
  const username = usrs.username
  console.log('commentor:',username);
  if (!post) {
    return res.status(404).json({ message: 'Post not found' });
  }

  const newComment = {
    userId,
    username,
    comment,
  };

  post.comments.push(newComment);
  await post.save();

  res.status(200).json({ message: 'Comment added successfully', comment: newComment });
} catch (error) {
  console.error(error);
  res.status(500).json({ message: 'Internal Server Error' });
}
};

// delete comment
exports.deleteacomment = async (req, res) => {
  const {postId,commentId } = req.body;
  const userId = req.payload;

  console.log(`running delete comment function`);
  //console.log(postId,commentId,userId);
  try {
    const post = await userpost.findById(postId);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    const commentIndex = post.comments.findIndex(
      (comment) => comment._id.toString() === commentId && comment.userId === userId
    );

    if (commentIndex === -1) {
      return res.status(404).json(`user cannot delete comment`);
    }

    // Remove the comment from the array
    post.comments.splice(commentIndex, 1);

    await post.save();

    res.status(200).json({ message: 'Comment deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
// delete comment by user 
exports.deleteusrcomment = async (req, res) => {
  const { postId, commentId } = req.body;
  const userId = req.payload;

  console.log(`running delete comment function`);

  try {
    // Find the post by ID
    const post = await userpost.findById(postId);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Find the index of the comment with the given ID
    const commentIndex = post.comments.findIndex(comment => comment._id == commentId);

    if (commentIndex === -1) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    // Remove the comment from the comments array
    post.comments.splice(commentIndex, 1);

    // Save the updated post
    await post.save();

    res.status(200).json({ message: 'Comment deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
