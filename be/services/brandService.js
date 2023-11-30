import Brand from "../models/brand.js";
import asyncHandler from "express-async-handler";

const createbrandService = asyncHandler(async (userData) => {
    const existBrand = await Brand.findOne({ title: userData.title })
    if (existBrand)
        return {
            success: false,
            message: "Brand exist!",
        };
    const brand = await Brand.create(userData)
    if (!brand)
        return {
            success: false,
            message: "Create brand error!",
        };
    return {
        success: true,
        data: brand,
    };
});

const getAllbrandService = asyncHandler(async () => {
    const brand = await Brand.find().select('title');
    if (!brand)
        return {
            success: false,
            message: "Get all brand error!",
        };
    return {
        success: true,
        data: brand,
    };
});

const updatebrandService = asyncHandler(async (userData) => {
    const existBrand = await Brand.findById(userData.bid)
    if (!existBrand)
        return {
            success: false,
            message: "Not found brand!",
        };
    const brand = await Brand.findByIdAndUpdate(userData.bid, userData.updateField, {
        new: true,
    });
    if (!brand)
        return {
            success: false,
            message: "Update brand error!",
        };
    return {
        success: true,
        data: brand,
    };
});

const deletebrandService = asyncHandler(async (userData) => {
    const existBrand = await Brand.findById(userData)
    if (!existBrand)
        return {
            success: false,
            message: "Not found brand!",
        };
    const brand = await Brand.findByIdAndDelete(userData);
    if (!brand)
        return {
            success: false,
            message: "Delete brand error!",
        };
    return {
        success: true,
        data: brand,
    };
});
export default {
    createbrandService,
    getAllbrandService,
    updatebrandService,
    deletebrandService
};