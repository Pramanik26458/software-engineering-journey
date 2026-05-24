const mongoose = require("mongoose");

const likeSchema = new mongoose.Schema(
  {
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "post",
      required: [true, "Post id is required for like"],
    },

    user: {
      type: String,
      required: [true, "User is required for liking the content"],
    },
  },
  {
    timestamps: true,
  }
);

// one user can like a post only once
likeSchema.index(
  {
    post: 1,
    user: 1,
  },
  {
    unique: true,
  }
);

const likeModel = mongoose.model("like", likeSchema);

module.exports = likeModel;