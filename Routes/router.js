const express = require('express')

const router = new express.Router()

const userController = require('../controllers/userController')
const jwtMiddleware = require('../middlewares/jwtMiddleware')


//Register 
router.post('/user/registration',userController.register)

//login
router.post('/user/login',userController.login)

module.exports = router