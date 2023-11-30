import {blogCategoryService} from "../services/indexService.js";
import asyncHandler from "express-async-handler";

const createBlogCategoryController = asyncHandler(async (req, res) => {
  if (Object.keys(req.body).length === 0)
    return res.status(400).json({
      status: "ERROR",
      message: "Missing input!",
    });
  const blogCategory = await blogCategoryService.createBlogCategoryService(req.body)
  if (!blogCategory.success)
    return res.status(400).json({
      status: "ERROR",
      message: blogCategory.message,
    });
  return res.status(200).json({
    status: "OK",
    message: "Create blog category successfully!",
    data: blogCategory.data,
  });
});

const getAllBlogCategoryController = asyncHandler(async (req, res) => {
  const blogCategory = await blogCategoryService.getAllBlogCategoryService()
  if (!blogCategory.success)
    return res.status(400).json({
      status: "ERROR",
      message: blogCategory.message,
    });
  return res.status(200).json({
    status: "OK",
    message: "Get all blog category successfully!",
    data: blogCategory.data,
  });
});

const updateBlogCategoryController = asyncHandler(async (req, res) => {
  const { bcid } = req.params;
  if (!bcid)
    return res.status(400).json({
      status: "ERROR",
      message: "Missing input!",
    });
  const updateField = req.body
  const userData = { bcid, updateField };
  const blogCategory = await blogCategoryService.updateBlogCategoryService(userData)
  if (!blogCategory.success)
    return res.status(400).json({
      status: "ERROR",
      message: blogCategory.message,
    });
  return res.status(200).json({
    status: "OK",
    message: "Update blog category successfully!",
    data: blogCategory.data,
  });
});

const deleteBlogCategoryController = asyncHandler(async (req, res) => {
  const { bcid } = req.params;
  if (!bcid)
    return res.status(400).json({
      status: "ERROR",
      message: "Missing input!",
    });
  const blogCategory = await blogCategoryService.deleteBlogCategoryService(bcid)
  if (!blogCategory.success)
    return res.status(400).json({
      status: "ERROR",
      message: blogCategory.message,
    });
  return res.status(200).json({
    status: "OK",
    message: "Delete blog category successfully!",
    data: blogCategory.data,
  });
});

export default {
  createBlogCategoryController,
  getAllBlogCategoryController,
  updateBlogCategoryController,
  deleteBlogCategoryController
};