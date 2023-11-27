import BlogCategory from "../models/BlogCategory.js";
import asyncHandler from "express-async-handler";

const createBlogCategory = asyncHandler(async (req, res) => {
  if (Object.keys(req.body).length === 0) throw new Error("Missing input");
    const newBlogCategory = await BlogCategory.create(req.body)
    return res.status(200).json({
      success: newBlogCategory ? true : false,
      message: newBlogCategory ? newBlogCategory : "Create category failed!",
    });
  });

    const getAllBlogCategory = asyncHandler(async (req, res) => {
     const blogCategory = await BlogCategory.find().select('title');
     return res.status(200).json({
       success: blogCategory ? true : false,
       message: blogCategory ? blogCategory : "Get all category failed!",
     });
   });

   const updateBlogCategory = asyncHandler(async (req, res) => {
    const { bcid } = req.params;
    const updatedBlogCategory = await BlogCategory.findByIdAndUpdate(bcid, req.body, {
      new: true,
    });
    return res.status(200).json({
      success: updatedBlogCategory ? true : false,
      message: updatedBlogCategory ? updatedBlogCategory : "Update product category failed!",
    });
  });

  const deleteBlogCategory = asyncHandler(async (req, res) => {
    const { bcid } = req.params;
    const deletedBlogCategory = await BlogCategory.findByIdAndDelete(bcid);
    return res.status(200).json({
      success: deletedBlogCategory ? true : false,
      message: deletedBlogCategory ? deletedBlogCategory : "Delete product category failed!",
    });
  });
  export default {createBlogCategory,getAllBlogCategory,updateBlogCategory,deleteBlogCategory};