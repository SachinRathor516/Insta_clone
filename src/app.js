const express = require('express')
const cookieParser = require('cookie-parser')

const app = express()
app.use(express.json())
app.use(cookieParser())


const authRouter = require('./routes/auth_route')
const postRouter = require('./routes/post_route')
const userRouter = require('./routes/user_route')


app.use('/api/auth' , authRouter)
app.use('/api/posts' , postRouter)
app.use('/api/users', userRouter)


module.exports = app