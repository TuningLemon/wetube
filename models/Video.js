/* eslint-disable prettier/prettier */
import mongoose from "mongoose";

mongoose.set("useUnifiedTopology", true);

const VideoSchema = new mongoose.Schema({
  fileUrl: {
    type: String,
    requried: "File URL is required",
  },
  title: {
    type: String,
    required: "Title is required",
  },
  description: String,
  views: {
    type: Number,
    // eslint-disable-next-line prettier/prettier
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const model = mongoose.model("Video", VideoSchema);

export default model;
