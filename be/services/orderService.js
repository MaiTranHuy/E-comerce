import Order from "../models/Order.js";
import User from "../models/User.js";
import Coupon from "../models/Coupon.js";
import asyncHandler from "express-async-handler";

const createOrderService = asyncHandler(async (userData) => {
    const { _id, data } = userData
    const coupon = data.coupon
    const userCart = await User.findById(_id).select('cart').populate('cart.product', 'title price')
    if (!userCart)
        return {
            success: false,
            message: "User not found!",
        };
    const products = userCart?.cart?.map(el => ({
        product: el.product._id,
        count: el.quantity,
        color: el.color
    }))
    let total = userCart?.cart?.reduce((sum, el) => el.product.price * el.quantity + sum, 0);
    if (coupon) {
        const trueCoupon = await Coupon.findOne({ name: coupon })
        if (!trueCoupon)
            return {
                success: false,
                message: "Coupon error!",
            };
        total = total * (1 - trueCoupon.discount / 100)
    }
    const orderData = {
        products,
        total,
        orderBy: _id,
        ...(coupon?._id && { coupon })
    };
    const newOrder = await Order.create(orderData);
    if (!newOrder)
        return {
            success: false,
            message: "Create order error!",
        };
    return {
        success: true,
        data: newOrder,
    };
});

const updateStatusService = asyncHandler(async (userData) => {
    const { oid, status } = userData
    const existOrder = await Order.findById(oid)
    if (!existOrder)
        return {
            success: false,
            message: "Not found order!",
        };
    const order = await Order.findByIdAndUpdate(oid, { status }, { new: true })
    if (!order)
        return {
            success: false,
            message: "Update status error!",
        };
    return {
        success: true,
        data: order,
    };
});

const deleteOrderService = asyncHandler(async (userData) => {
    const existOrder = await Order.findById(userData)
    if (!existOrder)
        return {
            success: false,
            message: "Not found order!",
        };
    const order = await Order.findByIdAndDelete(userData)
    if (!order)
        return {
            success: false,
            message: "Delete order error!",
        };
    return {
        success: true,
        data: order,
    };
});

const getUserOrderService = asyncHandler(async (userData) => {
    const order = await Order.find({ orderBy: userData });
    if (!order)
        return {
            success: false,
            message: "Get user order error!",
        };
    return {
        success: true,
        data: order,
    };
});

const getOrderService = asyncHandler(async (userData) => {
    const order = await Order.findById(userData);
    if (!order)
        return {
            success: false,
            message: "Get order error!",
        };
    return {
        success: true,
        data: order,
    };
});

const getAllOrderService = asyncHandler(async () => {
    const order = await Order.find();
    if (!order)
        return {
            success: false,
            message: "Get user order error!",
        };
    return {
        success: true,
        data: order,
    };
});
export default {
    createOrderService,
    updateStatusService,
    getUserOrderService,
    getAllOrderService,
    deleteOrderService,
    getOrderService
};