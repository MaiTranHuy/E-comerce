import Coupon from "../models/Coupon.js";
import { couponService } from '../services/indexService.js'
import asyncHandler from "express-async-handler";

const createCouponController = asyncHandler(async (req, res) => {
  const { name, discount, expiry } = req.body;
  if (!name || !discount || !expiry)
    return res.status(400).json({
      success: false,
      message: "Missing input!",
    });
    req.body.expiry = Date.now() + +expiry * 24 * 60 * 60 * 1000
  const coupon = await couponService.createCouponService(req.body)
  if (!coupon.success)
    return res.status(400).json({
      success: false,
      message: coupon.message,
    });
  return res.status(200).json({
    success: true,
    message: "Create coupon successfully!",
    data: coupon.data,
  });
});

const getAllCouponController = asyncHandler(async (req, res) => {
  const coupon = await couponService.getAllCouponService()
  if (!coupon.success)
    return res.status(400).json({
      success: false,
      message: coupon.message,
    });
  return res.status(200).json({
    success: true,
    message: "Get all coupon successfully!",
    data: coupon.data,
  });
});

const updateCouponController = asyncHandler(async (req, res) => {
  const { cid } = req.params;
  if (!cid || Object.keys(req.body).length === 0)
    return res.status(400).json({
      success: false,
      message: "Missing input!",
    });
  if (req.body.expiry)
    req.body.expiry = Date.now() + +expiry * 24 * 60 * 60 * 1000
  const updateField = req.body
  const userData = { cid, updateField };
  const coupon = await couponService.updateCouponService(userData)
  if (!coupon.success)
    return res.status(400).json({
      success: false,
      message: coupon.message,
    });
  return res.status(200).json({
    success: true,
    message: "Update coupon successfully!",
    data: coupon.data,
  });
});

const deleteCouponController = asyncHandler(async (req, res) => {
  const { cid } = req.params;
  if (!cid)
    return res.status(400).json({
      success: false,
      message: "Missing input!",
    });
  const coupon = await couponService.deleteCouponService(cid)
  if (!coupon.success)
    return res.status(400).json({
      success: false,
      message: coupon.message,
    });
  return res.status(200).json({
    success: true,
    message: "Update coupon successfully!",
    data: coupon.data,
  });
});

export default {
  createCouponController,
  getAllCouponController,
  updateCouponController,
  deleteCouponController
};

