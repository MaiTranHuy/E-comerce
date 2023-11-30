import BlogCategory from "../models/BlogCategory.js";
import asyncHandler from "express-async-handler";

const createBlogCategoryService = asyncHandler(async (userData) => {
    const existBlogCategory = await BlogCategory.findOne({ title: userData.title })
    if (existBlogCategory)
        return {
            success: false,
            message: "Blog category exist!",
        };
    const blogCategory = await BlogCategory.create(userData)
    if (!blogCategory)
        return {
            success: false,
            message: "Create blog category error!",
        };
    return {
        success: true,
        data: blogCategory,
    };
});

const getAllBlogCategoryService = asyncHandler(async () => {
    const blogCategory = await BlogCategory.find().select('title');
    if (!blogCategory)
        return {
            success: false,
            message: "Get all blog category error!",
        };
    return {
        success: true,
        data: blogCategory,
    };
});

const updateBlogCategoryService = asyncHandler(async (userData) => {
    const existBlogCategory = await BlogCategory.findById(userData.bcid)
    if (!existBlog)
        return {
            success: false,
            message: "Not found blog category!",
        };
    const blogCategory = await BlogCategory.findByIdAndUpdate(userData.bcid, userData.updateField, {
        new: true,
    });
    if (!blogCategory)
        return {
            success: false,
            message: "Update blog category error!",
        };
    return {
        success: true,
        data: blogCategory,
    };
});

const deleteBlogCategoryService = asyncHandler(async (userData) => {
    const existBlogCategory = await BlogCategory.findById(userData)
    if (!existBlog)
        return {
            success: false,
            message: "Not found blog category!",
        };
    const blogCategory = await BlogCategory.findByIdAndDelete(userData);
    if (!blogCategory)
        return {
            success: false,
            message: "Delete blog category error!",
        };
    return {
        success: true,
        data: blogCategory,
    };
});
export default {
    createBlogCategoryService,
    getAllBlogCategoryService,
    updateBlogCategoryService,
    deleteBlogCategoryService
};