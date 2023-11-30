import Blog from "../models/Blog.js";
import blogService from "../services/blogService.js";
import asyncHandler from "express-async-handler";

const createBlogController = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { title, description, category } = req.body;
  if (!title || !description || !category || !_id)
    return res.status(400).json({
      status: "ERROR",
      message: "Missing input!",
    });
  const updateField = req.body
  const userData = { _id, updateField };
  const newBlog = await blogService.createBlogService(userData);
  if (!newBlog.success)
    return res.status(400).json({
      status: "ERROR",
      message: newBlog.message,
    });
  return res.status(200).json({
    status: "OK",
    message: "Create blog successfully!",
    data: newBlog.data,
  });
});


const getAllBlogController = asyncHandler(async (req, res) => {
  const blog = await blogService.getAllBlogService();
  if (!blog.success)
    return res.status(400).json({
      status: "ERROR",
      message: blog.message,
    });
  return res.status(200).json({
    status: "OK",
    message: "Get all blog successfully!",
    data: blog.data,
  });
});


const updateBlogController = asyncHandler(async (req, res) => {
  const { bid } = req.params;
  if (!bid || Object.keys(req.body).length === 0)
    return res.status(400).json({
      status: "ERROR",
      message: "Missing input!",
    });
  const updateField = req.body
  const userData = { bid, updateField };
  const blog = await blogService.updateBlogService(userData);
  if (!blog.success)
    return res.status(400).json({
      status: "ERROR",
      message: blog.message,
    });
  return res.status(200).json({
    status: "OK",
    message: "Update blog successfully!",
    data: blog.data,
  });
});

const deleteBlogController = asyncHandler(async (req, res) => {
  const { bid } = req.params;
  if (!bid)
    return res.status(400).json({
      status: "ERROR",
      message: "Missing input!",
    });
  const blog = await blogService.deleteBlogService(bid);
  if (!blog.success)
    return res.status(400).json({
      status: "ERROR",
      message: blog.message,
    });
  return res.status(200).json({
    status: "OK",
    message: "Delete blog successfully!",
    data: blog.data,
  });
});

const likeBlogController = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { bid } = req.params;
  if (!bid || !_id)
    return res.status(400).json({
      status: "ERROR",
      message: "Missing input!",
    });
  const userData = { bid, _id };
  const blog = await blogService.likeBlogService(userData);
  if (!blog.success)
    return res.status(400).json({
      status: "ERROR",
      message: blog.message,
    });
  return res.status(200).json({
    status: "OK",
    message: "Like blog successfully!",
    data: blog.data,
  });
});

const dislikeBlogController = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { bid } = req.params;
  if (!bid || !_id)
    return res.status(400).json({
      status: "ERROR",
      message: "Missing input!",
    });
  const userData = { bid, _id };
  const blog = await blogService.dislikeBlogService(userData);
  if (!blog.success)
    return res.status(400).json({
      status: "ERROR",
      message: blog.message,
    });
  return res.status(200).json({
    status: "OK",
    message: "Dislike blog successfully!",
    data: blog.data,
  });
});

const getBlogController = asyncHandler(async (req, res) => {
  const { bid } = req.params;
  if (!bid)
    return res.status(400).json({
      status: "ERROR",
      message: "Missing input!",
    });
  const blog = await blogService.getBlogService(bid);
  if (!blog.success)
    return res.status(400).json({
      status: "ERROR",
      message: blog.message,
    });
  return res.status(200).json({
    status: "OK",
    message: "Get blog successfully!",
    data: blog.data,
  });
});

const uploadImageBlogController = asyncHandler(async (req, res) => {
  const { bid } = req.params;
  if (!req.file || !bid)
    return res.status(400).json({
      status: "ERROR",
      message: "Missing input!",
    });
  const updateFile = req.file
  const userData = { bid, updateFile };
  const blog = await blogService.uploadImageBlogService(userData);
  if (!blog.success)
    return res.status(400).json({
      status: "ERROR",
      message: blog.message,
    });
  return res.status(200).json({
    status: "OK",
    message: "Get blog successfully!",
    data: blog.data,
  });
});

export default {
  createBlogController,
  getAllBlogController,
  updateBlogController,
  deleteBlogController,
  likeBlogController,
  dislikeBlogController,
  getBlogController,
  uploadImageBlogController
};
