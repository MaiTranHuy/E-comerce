import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: mongoose.Types.ObjectId,
      ref: "BlogCategory",
      required: true,
    },
    numberViews: {
      type: Number,
      default: 0,
    },
    likes: [
      {
        type: mongoose.Types.ObjectId,
        ref: "User",
      },
    ],
    dislikes: [
      {
        type: mongoose.Types.ObjectId,
        ref: "User",
      },
    ],
    image: {
        type: String,
        default: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fblog.pixlr.com%2Fget-more-clicks-views-10-must-have-youtube-thumbnails%2F&psig=AOvVaw1KJ4k-csIimqk7LvgxBqq7&ust=1701010364273000&source=images&cd=vfe&opi=89978449&ved=0CA8QjRxqFwoTCLj33caz34IDFQAAAAAdAAAAABAI'
    },
    author:  {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON:{virtuals: true},
    toObject:{virtual: true}
  }
);

export default mongoose.model("Blog", blogSchema);
