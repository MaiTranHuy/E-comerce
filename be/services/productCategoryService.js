import ProductCategory from "../models/productCategory.js";
import asyncHandler from "express-async-handler";

const createproductCategoryService = asyncHandler(async (userData) => {
    const existProductCategory = await ProductCategory.findOne({ title: userData.title })
    if (existProductCategory)
        return {
            success: false,
            message: "Product category exist!",
        };
    const productCategory = await ProductCategory.create(userData)
    if (!productCategory)
        return {
            success: false,
            message: "Create product category error!",
        };
    return {
        success: true,
        data: productCategory,
    };
});

const getAllproductCategoryService = asyncHandler(async () => {
    const productCategory = await ProductCategory.find().select('title');
    if (!productCategory)
        return {
            success: false,
            message: "Get all product category error!",
        };
    return {
        success: true,
        data: productCategory,
    };
});

const updateproductCategoryService = asyncHandler(async (userData) => {
    const existProductCategory = await BlogCategory.findById(userData.pcid)
    if (!existProductCategory)
        return {
            success: false,
            message: "Not found product category!",
        };
    const productCategory = await ProductCategory.findByIdAndUpdate(userData.pcid, userData.updateField, {
        new: true,
    });
    if (!productCategory)
        return {
            success: false,
            message: "Update product category error!",
        };
    return {
        success: true,
        data: productCategory,
    };
});

const deleteproductCategoryService = asyncHandler(async (userData) => {
    const existProductCategory = await BlogCategory.findById(userData)
    if (!existProductCategory)
        return {
            success: false,
            message: "Not found product category!",
        };
    const productCategory = await ProductCategory.findByIdAndDelete(userData);
    if (!productCategory)
        return {
            success: false,
            message: "Delete product category error!",
        };
    return {
        success: true,
        data: productCategory,
    };
});
export default {
    createproductCategoryService,
    getAllproductCategoryService,
    updateproductCategoryService,
    deleteproductCategoryService
};