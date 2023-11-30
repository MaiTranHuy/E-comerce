import Coupon from "../models/Coupon.js";
import asyncHandler from "express-async-handler";

const createCouponService = asyncHandler(async (userData) => {
    const existCoupon = await Coupon.findOne({ title: userData.title })
    if (existCoupon)
        return {
            success: false,
            message: "Coupon exist!",
        };
    const newCoupon = await Coupon.create(userData);
    if (!newCoupon)
        return {
            success: false,
            message: "Create coupon error!",
        };
    return {
        success: true,
        data: newCoupon,
    };
});

const getAllCouponService = asyncHandler(async () => {
    const coupon = await Coupon.find().select("-createdAt -updatedAt");
    if (!coupon)
        return {
            success: false,
            message: "Get all coupon error!",
        };
    return {
        success: true,
        data: coupon,
    };
});

const updateCouponService = asyncHandler(async (userData) => {
    const existCoupon = await Coupon.findById(userData.cid)
    if (!existCoupon)
        return {
            success: false,
            message: "Not found Coupon!",
        };
    const updatedCoupon = await Coupon.findByIdAndUpdate(userData.cid, userData.updateField, {
        new: true,
    });
    if (!updatedCoupon)
        return {
            success: false,
            message: "Update coupon error!",
        };
    return {
        success: true,
        data: updatedCoupon,
    };
});

const deleteCouponService = asyncHandler(async (userData) => {
    const existCoupon = await Coupon.findById(userData)
    if (!existCoupon)
        return {
            success: false,
            message: "Not found Coupon!",
        };
    const deletedCoupon = await Coupon.findByIdAndDelete(userData);
    if (!deletedCoupon)
        return {
            success: false,
            message: "Delete coupon error!",
        };
    return {
        success: true,
        data: deletedCoupon,
    };
});

export default {
    createCouponService,
    getAllCouponService,
    updateCouponService,
    deleteCouponService
};

