const followModel = require('../models/follow_model')
const userModel = require('../models/user_model')

async function followUserController(req , res) {
    const followerUsername = req.user.username
    const followeeUsername = req.params.username

    if (followeeUsername === followerUsername) {
        return res.status(400).json({
            message:'you cannot follow yourself'
        })
    }

    const isFolloweeExist = await userModel.findOne({
        username:followeeUsername
    })

    if (!isFolloweeExist) {
        return res.status(404).json({
            message:'user you are trying to follow does not exist '
        })
    }


    const isAlreadyFollow = await followModel.findOne({
        followee:followeeUsername,
        follower:followerUsername
    })

    if (isAlreadyFollow) {
        return res.status(200).json({
            message:`you are already following ${followeeUsername}`,
            follow:isAlreadyFollow
        })
    }

    const followRecord = await followModel.create({
        follower:followerUsername,
        followee:followeeUsername
    })

    res.status(201).json({
        message:`you are now following ${followeeUsername}`,
        follow:followRecord
    })
}

async function unfollowUserController(req , res) {
    const followerUsername = req.user.username
    const followeeUsername = req.params.username

    const isUserFollowing = await followModel.findOne({
        follower:followerUsername,
        followee:followeeUsername
    })

    if (!isUserFollowing) {
        return res.status(200).json({
            message:`you are not following ${followeeUsername}`
        })
    }

    await followModel.findByIdAndDelete(isUserFollowing._id)

    res.status(200).json({
        message:`you have unfollowed ${followeeUsername}`
    })
}


module.exports = {
    followUserController,
    unfollowUserController
}