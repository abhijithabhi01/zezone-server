const express = require('express')

const router = new express.Router()

const userController = require('../controllers/userController')
const jwtMiddleware = require('../middlewares/jwtMiddleware')
const multerConfig = require('../middlewares/multerMiddleware')
const userpostController = require('../controllers/userpostController')

//Register 
router.post('/user/registration', userController.register)

//login
router.post('/user/login', userController.login)

//addpost
router.post('/user/addpost', jwtMiddleware, multerConfig.single('postimage'), userpostController.addPosts)

//get user profile post
router.get('/userposts/profile', jwtMiddleware, userpostController.userprofileposts)

//get all posts
router.get('/userpost/allposts', userpostController.getallposts)

//get all posts
router.get('/users/allusers', jwtMiddleware, userController.getallusers)

//get user search
router.get('/users/search', jwtMiddleware, userController.searchusers)

//edit post
router.put('/userpost/edit/:id', jwtMiddleware, multerConfig.single('postimage'), userpostController.edituserpost)

//delete post
router.delete('/post/delete/:id', jwtMiddleware, userpostController.deletepost)

//edit profile
router.put('/user/edit/', jwtMiddleware, multerConfig.single('profileimage'), userController.edituser)

//delete user
router.delete('/user/delete/:id', jwtMiddleware, userController.deleteUser)

// Like a post
router.put('/userpost/like/:id', jwtMiddleware, userpostController.likePost);

// add comment
router.post('/userpost/addcomment/:id', jwtMiddleware, userpostController.addComment);

//delete a comment
router.delete('/userpost/deletecomment', jwtMiddleware, userpostController.deleteacomment)

//delete a comment
router.delete('/userpost/deleteusrcomment', jwtMiddleware, userpostController.deleteusrcomment)

// follow a user
router.put('/user/follow/:id', jwtMiddleware, userController.followUser);


module.exports = router