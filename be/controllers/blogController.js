import Blog from "../models/Blog.js";
import asyncHandler from "express-async-handler";

const createBlog = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { title, description, category } = req.body;
  if (!title || !description || !category || !_id)
    throw new Error("Missing input");
  const newBlog = await Blog.create({ ...req.body, author: _id });
  const populatedBlog = await Blog.findById(newBlog._id).populate("category", "title");

  return res.status(200).json({
    success: populatedBlog ? true : false,
    message: populatedBlog ? populatedBlog : "Create blog failed!",
  });
});


const getAllBlog = asyncHandler(async (req, res) => {
  const blog = await Blog.find()
    .populate("category", "title")
    .populate("likes dislikes author", "firstName lastName");
  return res.status(200).json({
    success: blog ? true : false,
    message: blog ? blog : "Get all blog failed!",
  });
});

const updateBlog = asyncHandler(async (req, res) => {
  const { bid } = req.params;
  if (Object.keys(req.body).length === 0) throw new Error("Missing input!");

  const updatedBlog = await Blog.findByIdAndUpdate(bid, req.body, {
    new: true,
  })
    .populate("category", "title")
    .populate("likes dislikes author", "firstName lastName");
  return res.status(200).json({
    success: updatedBlog ? true : false,
    message: updatedBlog ? updatedBlog : "Update blog failed!",
  });
});

const deleteBlog = asyncHandler(async (req, res) => {
  const { bid } = req.params;
  const deletedBlog = await Blog.findByIdAndDelete(bid)
    .populate("category", "title")
    .populate("likes dislikes author", "firstName lastName");
  return res.status(200).json({
    success: deletedBlog ? true : false,
    message: deletedBlog ? deletedBlog : "Delete product category failed!",
  });
});

const likeBlog = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { bid } = req.params;
  if (!bid) throw new Error("Missing input!");
  const blog = await Blog.findById(bid);
  if (!blog) {
    return res.status(404).json({
      success: false,
      message: "Blog not found",
    });
  }
  const alreadyDisliked = blog?.dislikes?.find((el) => el.toString() === _id);
  if (alreadyDisliked) {
    const response = await Blog.findByIdAndUpdate(
      bid,
      { $pull: { dislikes: _id }, $push: { likes: _id } },
      { new: true }
    )
      .populate("category", "title")
      .populate("likes dislikes author", "firstName lastName");
    return res.status(200).json({
      success: response ? true : false,
      message: response,
    });
  }

  const isLiked = blog?.likes?.find((el) => el.toString() === _id);
  if (isLiked) {
    const response = await Blog.findByIdAndUpdate(
      bid,
      { $pull: { likes: _id } },
      { new: true }
    );
    return res.status(200).json({
      success: response ? true : false,
      message: response,
    });
  } else {
    const response = await Blog.findByIdAndUpdate(
      bid,
      { $push: { likes: _id } },
      { new: true }
    )
      .populate("category", "title")
      .populate("likes dislikes author", "firstName lastName");
    return res.status(200).json({
      success: response ? true : false,
      message: response,
    });
  }
});

const dislikeBlog = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { bid } = req.params;
  if (!bid) throw new Error("Missing input!");
  const blog = await Blog.findById(bid);
  if (!blog) {
    return res.status(404).json({
      success: false,
      message: "Blog not found",
    });
  }
  const alreadyLiked = blog?.likes?.find((el) => el.toString() === _id);
  if (alreadyLiked) {
    const response = await Blog.findByIdAndUpdate(
      bid,
      { $pull: { likes: _id }, $push: { dislikes: _id } },
      { new: true }
    )
      .populate("category", "title")
      .populate("likes dislikes author", "firstName lastName");
    return res.status(200).json({
      success: response ? true : false,
      message: response,
    });
  }

  const isDisLiked = blog?.dislikes?.find((el) => el.toString() === _id);
  if (isDisLiked) {
    const response = await Blog.findByIdAndUpdate(
      bid,
      { $pull: { dislikes: _id } },
      { new: true }
    );
    return res.status(200).json({
      success: response ? true : false,
      message: response,
    });
  } else {
    const response = await Blog.findByIdAndUpdate(
      bid,
      { $push: { dislikes: _id } },
      { new: true }
    );
    return res.status(200).json({
      success: response ? true : false,
      message: response,
    });
  }
});

const getBlog = asyncHandler(async (req, res) => {
  const { bid } = req.params;
  const blog = await Blog.findByIdAndUpdate(
    bid,
    { $inc: { numberViews: 1 } },
    { new: true }
  )
    .populate("category", "title")
    .populate("likes dislikes author", "firstName lastName");
  return res.status(200).json({
    success: blog ? true : false,
    message: blog,
  });
});

const uploadImageBlog = asyncHandler(async (req, res) => {
  const { bid } = req.params;
  if (!req.file) throw new Error("Missing input!");
  const uploadFile = await Blog.findByIdAndUpdate(bid, {image: req.file.path},{new: true});
  return res.status(200).json({
    success: uploadFile ? true : false,
    message: uploadFile ? uploadFile : "Cannot upload image blog",
  });
});

export default {
  createBlog,
  getAllBlog,
  updateBlog,
  deleteBlog,
  likeBlog,
  dislikeBlog,
  getBlog,
  uploadImageBlog
};
