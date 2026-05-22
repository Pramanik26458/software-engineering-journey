const postModel = require("../models/post.model");
const ImageKit = require("@imagekit/nodejs");
const { toFile } = require("@imagekit/nodejs");
const jwt = require("jsonwebtoken");

const imagekit = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

/**
 * Create Post Controller
 */

async function createPostController(req, res) {
  try {
    console.log(req.body, req.file);

    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        message: "Token Not Provided, Unauthorized Access",
      });
    }

    let decoded;

    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return res.status(401).json({
        message: "Invalid Token",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        message: "Image is required",
      });
    }

    const file = await imagekit.files.upload({
      file: await toFile(Buffer.from(req.file.buffer), "file"),
      fileName: "test",
      folder: "Insta-clone-posts",
    });

    const post = await postModel.create({
      caption: req.body.caption,
      image_url: file.url,
      createdBy: decoded.id,
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
 * Get All Posts Controller
 */

async function getPostConteoller(req, res) {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        message: "Unauthorized Access",
      });
    }

    let decoded;

    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return res.status(401).json({
        message: "Invalid Token",
      });
    }

    const userId = decoded.id;

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
 * Get Single Post Details Controller
 */

async function getPostDetailsController(req, res) {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        message: "Unauthorized Access",
      });
    }

    let decoded;

    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return res.status(401).json({
        message: "Invalid Token",
      });
    }

    const userId = decoded.id;
    const postId = req.params.postId;

    const post = await postModel.findById(postId);

    if (!post) {
      return res.status(404).json({
        message: "Post Not Found",
      });
    }

    const isValidUser =
      post.createdBy.toString() === userId;

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

module.exports = {
  createPostController,
  getPostConteoller,
  getPostDetailsController,
};