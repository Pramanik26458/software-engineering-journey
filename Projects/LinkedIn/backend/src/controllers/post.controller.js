import User from "../models/user.model.js";
import Post from "../models/post.model.js";
import Comment from "../models/comments.models.js"; // Make sure to import your Comment model!

export const activeCheck = async (req, res) => {
    return res.status(200).json({ message: "Active" });
};

export const createPost = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        const postBody = req.body.body || "";

        let filename = "";
        let fileTypeExtension = "";

        if (req.file !== undefined) {
            filename = req.file.filename;
            // Splitting "image/png" gives us ["image", "png"], we want index 1 for the extension name
            fileTypeExtension = req.file.mimetype.split("/")[1] || "";
        }

        const post = new Post({
            userId: user._id,
            body: postBody,
            media: filename,
            fileType: fileTypeExtension
        });

        await post.save();

        return res.status(201).json({
            message: "Post Created successfully",
            post
        });

    } catch (error) {
        return res.status(500).json({
            message: "Server error: " + error.message
        });
    }
};

// ─── Post Controller Segment ─────────────────────────────────────────────────
export const getAllPosts = async (req, res) => {
    try {

        const posts = await Post.find()
            .populate("userId", "name username email profilePicture")
            .sort({ createdAt: -1 }); // Sorts posts from newest to oldest!

        return res.json({ posts });
    } catch (error) {
        return res.status(500).json({
            message: "Server error: " + error.message
        });
    }
};


export const deletePost = async (req, res) => {
    try {
        const postId = req.params.id;
        const userId = req.user.id; //  Securely injected by my auth middleware!

        //  Find the target post
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        // Authorization Check: Check if the logged-in user owns this post
        if (post.userId.toString() !== userId.toString()) {
            return res.status(401).json({
                message: "Unauthorized! You cannot delete someone else's post."
            });
        }

        // Delete the post from the database
        await Post.findByIdAndDelete(postId);

        return res.status(200).json({ message: "Post deleted successfully" });
    } catch (error) {
        return res.status(500).json({
            message: "Server error: " + error.message
        });
    }
};


export const commentPost = async (req, res) => {
    const { post_id, commentBody } = req.body;

    try {
        const userId = req.user.id; // Injected securely by my auth middleware

        // Verify the post actually exists before commenting
        const post = await Post.findById(post_id);
        if (!post) {
            return res.status(404).json({
                message: "Opps... Post not found"
            });
        }

        // Build the comment payload using our Comment model
        const comment = new Comment({
            userId: userId,
            postId: post._id,
            comment: commentBody
        });

        //Saving it to MongoDB
        await comment.save();

        return res.status(200).json({
            message: "Comment Added Successfully 🍾"
        });

    } catch (error) {
        return res.status(500).json({
            message: "Server Error: " + error.message
        });
    }
};


export const getCommentsByPost = async (req, res) => {
    try {
        const { post_id } = req.params;

        const post = await Post.findById(post_id);
        if (!post) {
            return res.status(404).json({
                message: "Opps... Post not found"
            });
        }

        const comments = await Comment.find({ postId: post_id })
            .populate("userId", "name username profilePicture")
            .sort({ createdAt: -1 }); // Newest comments first

        return res.status(200).json({ comments });

    } catch (error) {
        return res.status(500).json({
            message: "Server error: " + error.message
        });
    }
};




export const deleteComment = async (req, res) => {
    try {
        const { commentId } = req.params; // ✅ Explicit param naming
        const userId = req.user.id;       // ✅ Populated by your auth middleware

        // 1. Find the comment first
        const commentObj = await Comment.findById(commentId);
        if (!commentObj) {
            return res.status(404).json({
                message: "Opps.. Comment not found"
            });
        }

        // 2. Security Guard: Verify if the current user is the owner of the comment
        if (commentObj.userId.toString() !== userId.toString()) {
            return res.status(403).json({
                message: "Unauthorized! You can only delete your own comments."
            });
        }

        // 3. Safe to delete
        await Comment.findByIdAndDelete(commentId);

        return res.status(200).json({
            message: "Comment deleted successfully 🗑️"
        });

    } catch (error) {
        return res.status(500).json({
            message: "Server Error: " + error.message
        });
    }
};


export const togglePostLike = async (req, res) => {
  try {
    const postId = req.params.id; 
    const userId = req.user.id;  

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({
        message: "Opps... Post not found"
      });
    }

    const isAlreadyLiked = post.likes.includes(userId);

    if (isAlreadyLiked) {
      // If already liked, remove the user's ID from the array (Unlike)
      post.likes = post.likes.filter((id) => id.toString() !== userId.toString());
      await post.save();
      return res.status(200).json({
        message: "Post unliked successfully",
        likesCount: post.likes.length
      });
    } else {
      // If not liked yet, push the user's ID into the array (Like)
      post.likes.push(userId);
      await post.save();
      return res.status(200).json({
        message: "Post liked successfully 👍",
        likesCount: post.likes.length
      });
    }

  } catch (error) {
    return res.status(500).json({
      message: "Server Error: " + error.message
    });
  }
};

