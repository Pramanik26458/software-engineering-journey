import mongoose from "mongoose";

const connectionRequestSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    connectionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: Boolean,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model(
  "ConnectionRequest",
  connectionRequest
);