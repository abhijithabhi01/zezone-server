const express = require('express')

const router = new express.Router()

const userController = require('../controllers/userController')
const jwtMiddleware = require('../middlewares/jwtMiddleware')
const multerConfig = require('../middlewares/multerMiddleware')
const userpostController = require('../controllers/userpostController')
//Register 
router.post('/user/registration',userController.register)

//login
router.post('/user/login',userController.login)

//addpost
router.post('/user/addpost',jwtMiddleware,multerConfig.single('postimage'),userpostController.addPosts)

//get user profile post
router.get('/userposts/profile',jwtMiddleware,userpostController.userprofileposts)


//get all posts
router.get('/userpost/allposts',userpostController.getallposts)

//get all posts
router.get('/users/allusers',jwtMiddleware,userController.getallusers)

//get all posts
router.get('/users/allusers',jwtMiddleware,userController.getallusers)

//get user search
router.get('/users/search',jwtMiddleware,userController.searchusers)

//edit post
router.put('/userpost/edit/:id',jwtMiddleware,multerConfig.single('postimage'),userpostController.edituserpost)

//delete post
router.delete('/post/delete/:id',jwtMiddleware,userpostController.deletepost)

// //like post
// router.post('/post/like/:id',jwtMiddleware,userpostController.likepost)

// //dislike post
// router.post('/post/dislike/:id',jwtMiddleware,userpostController.dislikepost)


//edit profile
router.put('/user/edit/',jwtMiddleware,multerConfig.single('profileimage'),userController.edituser)

//delete user
router.delete('/user/delete/:id',jwtMiddleware,userController.deleteUser)


module.exports = router