import Blog from "../models/Blog.js";
import asyncHandler from "express-async-handler";

const createBlogService = asyncHandler(async (userData) => {
    const { _id, updateField } = userData
    const existBlog = await Blog.findOne({ title: updateField.title })
    if (existBlog)
        return {
            success: false,
            message: "Blog exist!",
        };
    const newBlog = await Blog.create({ ...updateField, author: _id });
    if (!newBlog)
        return {
            success: false,
            message: "Create blog error!",
        };
    return {
        success: true,
        data: newBlog,
    };
});

const getAllBlogService = asyncHandler(async () => {
    const blog = await Blog.find()
        .populate("category", "title")
        .populate("likes dislikes author", "firstName lastName");
    if (!blog)
        return {
            success: false,
            message: "Get all blog error!",
        };
    return {
        success: true,
        data: blog,
    };
});

const updateBlogService = asyncHandler(async (userData) => {
    const { bid, updateField } = userData
    const existBlog = await Blog.findById(bid)
    if (!existBlog)
        return {
            success: false,
            message: "Not found blog!",
        };
    const blog = await Blog.findByIdAndUpdate(bid, updateField, {
        new: true,
    })
        .populate("category", "title")
        .populate("likes dislikes author", "firstName lastName");
    if (!blog)
        return {
            success: false,
            message: "Update blog error!",
        };
    return {
        success: true,
        data: blog,
    };
});

const deleteBlogService = asyncHandler(async (userData) => {
    const existBlog = await Blog.findById(userData)
    if (!existBlog)
        return {
            success: false,
            message: "Not found blog!",
        };
    const blog = await Blog.findByIdAndDelete(userData)
        .populate("category", "title")
        .populate("likes dislikes author", "firstName lastName");
    if (!blog)
        return {
            success: false,
            message: "Delete blog error!",
        };
    return {
        success: true,
        data: blog,
    };
});

const likeBlogService = asyncHandler(async (userData) => {
    const { _id, bid } = userData;
    const blog = await Blog.findById(bid);
    if (!blog)
        return res.status(404).json({
            success: false,
            message: "Blog not found",
        });
    const alreadyDisliked = blog?.dislikes?.includes(_id);
    const isLiked = blog?.likes?.includes(_id);
    let updateQuery;
    if (alreadyDisliked) {
        updateQuery = { $pull: { dislikes: _id }, $push: { likes: _id } };
    } else if (isLiked) {
        updateQuery = { $pull: { likes: _id } };
    } else {
        updateQuery = { $push: { likes: _id } };
    }
    const blogUpdate = await Blog.findByIdAndUpdate(bid, updateQuery, { new: true })
        .populate("category", "title")
        .populate("likes dislikes author", "firstName lastName");
    if (!blogUpdate)
        return {
            success: false,
            message: "Like blog error!",
        };
    return {
        success: true,
        data: blogUpdate,
    };
});

const dislikeBlogService = asyncHandler(async (userData) => {
    const { _id, bid } = userData;
    const blog = await Blog.findById(bid);
    if (!blog)
        return res.status(404).json({
            success: false,
            message: "Blog not found",
        });
    const alreadyLiked = blog?.likes?.includes(_id);
    const isDisliked = blog?.dislikes?.includes(_id);
    let updateQuery;
    if (alreadyLiked) {
        updateQuery = { $pull: { likes: _id }, $push: { dislikes: _id } };
    } else if (isDisliked) {
        updateQuery = { $pull: { dislikes: _id } };
    } else {
        updateQuery = { $push: { dislikes: _id } };
    }
    const blogUpdate = await Blog.findByIdAndUpdate(bid, updateQuery, { new: true })
        .populate("category", "title")
        .populate("likes dislikes author", "firstName lastName");
    if (!blogUpdate)
        return {
            success: false,
            message: "Dislike blog error!",
        };
    return {
        success: true,
        data: blogUpdate,
    };
});

const getBlogService = asyncHandler(async (userData) => {
    const existBlog = await Blog.findById(userData);
    if (!existBlog)
        return res.status(404).json({
            success: false,
            message: "Blog not found",
        });
    const blog = await Blog.findByIdAndUpdate(
        userData,
        { $inc: { numberViews: 1 } },
        { new: true }
    )
        .populate("category", "title")
        .populate("likes dislikes author", "firstName lastName");
    if (!blog)
        return {
            success: false,
            message: "Get blog error!",
        };
    return {
        success: true,
        data: blog,
    };
});

const uploadImageBlogService = asyncHandler(async (userData) => {
    const { bid, updateFile } = userData
    const existBlog = await Blog.findById(bid)
    if (!existBlog)
        return {
            success: false,
            message: "Not found blog!",
        };
    const blog = await Blog.findByIdAndUpdate(bid, { image: updateFile.path }, { new: true });
    if (!blog)
        return {
            success: false,
            message: "Update image blog error!",
        };
    return {
        success: true,
        data: blog,
    };
});

export default {
    createBlogService,
    getAllBlogService,
    updateBlogService,
    deleteBlogService,
    likeBlogService,
    dislikeBlogService,
    getBlogService,
    uploadImageBlogService
};
