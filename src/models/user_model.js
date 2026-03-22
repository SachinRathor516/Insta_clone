const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
    {
        username:{
            type:String,
            unique:[true ,'username already exist'],
            required:[true, 'username is required']
        },
        email:{
            type:String,
            unique:[true ,"Email already exist"],
            required:[true ,"Email is required"]
        },
        password:{
            type:String,
            required:[true ,"password is required"]
        },

        bio:String ,

        profile_image:{
            type:String,
            default:'https://ik.imagekit.io/wtb3p0fvu/default_image.avif'
        }


    }
)


const userModel = mongoose.model('users' , userSchema)


module.exports =userModel