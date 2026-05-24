const followModel = require("../models/follow.model");
const userModel = require("../models/user.model");

async function followUserController(req, res) {
  try {
    const followerUsername = req.user.username;
    const followeeUsername = req.params.username;

    // checking whether the target user exists or not
    const followeeUser = await userModel.findOne({
      username: followeeUsername,
    });

    if (!followeeUser) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // prevent users from following themselves
    if (followerUsername === followeeUsername) {
      return res.status(400).json({
        message: "You can't follow yourself",
      });
    }

    // checking whether the user is already following or not
    const existingFollow = await followModel.findOne({
      follower: followerUsername,
      followee: followeeUsername,
    });

    if (existingFollow) {
      if (existingFollow.status === "pending") {
        return res.status(409).json({
          message: "Follow request already sent",
        });
      }

      return res.status(409).json({
        message: "Already following this user",
      });
    }
    let followStatus = "accepted";

    if (followeeUser.isPrivate) {
      followStatus = "pending";
    }

    // creating follow relationship
    const followRecord = await followModel.create({
      follower: followerUsername,
      followee: followeeUsername,
      status: followStatus,
    });

    // different responses for public/private accounts
    if (followStatus === "pending") {
      return res.status(201).json({
        message: `Follow request sent to ${followeeUsername}`,
        follow: followRecord,
      });
    }

    return res.status(201).json({
      message: `You are now following ${followeeUsername}`,
      follow: followRecord,
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
}

async function acceptFollowRequestController(req, res) {
  try {
    const currentUser = req.user.username;
    const requesterUsername = req.params.username;

    // finding pending follow request

    const followRequest = await followModel.findOne({
      follower: requesterUsername,
      followee: currentUser,
      status: "pending",
    });

    if (!followRequest) {
      return res.status(404).json({
        message: "Follow Request Not Found",
      });
    }
    followRequest.status = "accepted";
    await followRequest.save();

    return res.status(200).json({
      message: "Follow request accepted",
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
}

async function rejectFollowRequestController(req, res) {
  try {
    const currentUser = req.user.username;
    const requesterUsername = req.params.username;

    // finding pending follow request
    const followRequest = await followModel.findOne({
      follower: requesterUsername,
      followee: currentUser,
      status: "pending",
    });

    if (!followRequest) {
      return res.status(404).json({
        message: "Follow request not found",
      });
    }

    // updating status to rejected
    followRequest.status = "rejected";

    await followRequest.save();

    return res.status(200).json({
      message: "Follow request rejected",
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
}

async function unfollowUserController(req, res) {
  try {
    const followerUsername = req.user.username;
    const followeeUsername = req.params.username;

    // checking whether target user exists or not
    const followeeUser = await userModel.findOne({
      username: followeeUsername,
    });

    if (!followeeUser) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // prevent self unfollow logic
    if (followerUsername === followeeUsername) {
      return res.status(400).json({
        message: "You cannot unfollow yourself",
      });
    }

    // checking whether user is following or not
    const isUserFollowing = await followModel.findOne({
      follower: followerUsername,
      followee: followeeUsername,
    });

    if (!isUserFollowing) {
      return res.status(409).json({
        message: `You are not following ${followeeUsername}`,
      });
    }

    // deleting follow relationship
    await followModel.findByIdAndDelete(isUserFollowing._id);

    return  res.status(200).json({
      message: `You have unfollowed ${followeeUsername}`,
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Internal Server Error",
    });
  }
}

module.exports = {
  followUserController,
  unfollowUserController,
  acceptFollowRequestController,
  rejectFollowRequestController,
};
