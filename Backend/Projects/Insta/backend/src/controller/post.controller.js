const postModel = require("../models/post.model");
const ImageKit = require("@imagekit/nodejs");
const { toFile } = require("@imagekit/nodejs");
const likeModel = require("../models/like.model");

const imagekit = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

/**
 * ---------------------------------------------------
 * Create Post Controller
 * ---------------------------------------------------
 * Creates a new post by uploading image to ImageKit
 * and storing post details in MongoDB.
 */

async function createPostController(req, res) {
  try {
    // checking whether image is provided or not
    if (!req.file) {
      return res.status(400).json({
        message: "Image is required",
      });
    }

    // uploading image to ImageKit
    const file = await imagekit.files.upload({
      file: await toFile(Buffer.from(req.file.buffer), "file"),
      fileName: "test",
      folder: "Insta-clone-posts",
    });

    // creating post document
    const post = await postModel.create({
      caption: req.body.caption,
      image_url: file.url,
      createdBy: req.user.id,
    });

    return res.status(201).json({
      message: "Post Created Successfully",
      post,
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
}

/**
 * ---------------------------------------------------
 * Get All Posts Controller
 * ---------------------------------------------------
 * Fetches all posts created by logged-in user.
 */

async function getPostConteoller(req, res) {
  try {
    const userId = req.user.id;

    // fetching posts of logged-in user
    const posts = await postModel.find({
      createdBy: userId,
    });

    return res.status(200).json({
      message: "Posts Fetched Successfully",
      posts,
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
}

/**
 * ---------------------------------------------------
 * Get Single Post Details Controller
 * ---------------------------------------------------
 * Fetches a single post and checks whether
 * the logged-in user owns the post or not.
 */

async function getPostDetailsController(req, res) {
  try {
    const userId = req.user.id;
    const postId = req.params.postId;

    // finding post by id
    const post = await postModel.findById(postId);

    // checking whether post exists or not
    if (!post) {
      return res.status(404).json({
        message: "Post Not Found",
      });
    }

    // checking whether logged-in user owns the post
    const isValidUser = post.createdBy.toString() === userId;

    if (!isValidUser) {
      return res.status(403).json({
        message: "Forbidden Content",
      });
    }

    return res.status(200).json({
      message: "Post Fetched Successfully",
      post,
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
}

/**
 * ---------------------------------------------------
 * Like Post Controller
 * ---------------------------------------------------
 * Allows a user to like a post only once.
 */

async function likePostController(req, res) {
  try {
    const username = req.user.username;
    const postId = req.params.postId;

    // checking whether post exists or not
    const post = await postModel.findById(postId);

    if (!post) {
      return res.status(404).json({
        message: "Post Not Found",
      });
    }

    // checking whether user already liked the post
    const isLiked = await likeModel.findOne({
      post: postId,
      user: username,
    });

    if (isLiked) {
      return res.status(409).json({
        message: "Post has already been liked by you",
        post,
      });
    }

    // creating like document
    await likeModel.create({
      post: postId,
      user: username,
    });

    res.status(201).json({
      message: "Post Liked Successfully",
      post,
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
}

async function PostDislikeController(req, res) {
  try {
    const username = req.user.username;
    const postId = req.params.postId;

    // checking whether post exists or not
    const post = await postModel.findById(postId);

    if (!post) {
      return res.status(404).json({
        message: "Post Not Found",
      });
    }

    // checking whether user already liked the post or not
    const existingLike = await likeModel.findOne({
      post: postId,
      user: username,
    });

    // user cannot dislike without liking first
    if (!existingLike) {
      return res.status(409).json({
        message: "You have not liked this post yet",
      });
    }

    // removing like document
    await likeModel.findByIdAndDelete(existingLike._id);

    res.status(200).json({
      message: "Post disliked successfully",
      post,
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
}

async function getFeedController(req, res) {
  try {

    const user = req.user;

    const posts = await Promise.all(

      (
        await postModel
          .find()
          .populate("createdBy")
          .sort({ _id: -1 })

      ).map(async (post) => {

        const isLiked = await likeModel.findOne({
          user: user.username,
          post: post._id,
        });

        post._doc.isLiked = !!isLiked;

        return post;
      })
    );

    res.status(200).json({
      message: "Posts fetched successfully",
      posts,
    });

  } catch (err) {

    console.log(err);

    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
}
module.exports = {
  createPostController,
  getPostConteoller,
  getPostDetailsController,
  likePostController,
  PostDislikeController,
  getFeedController,
};
