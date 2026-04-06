const express = require('express')
const userRouter = express.Router()
const userController = require('../controllers/user_controller')
const identifyUser = require('../middlewares/auth_middleware')



userRouter.post('/follow/:username' ,identifyUser,userController.followUserController)
userRouter.post('/unfollow/:username' , identifyUser, userController.unfollowUserController)

module.exports = userRouter