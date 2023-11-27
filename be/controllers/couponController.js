import Coupon from "../models/Coupon.js";
import asyncHandler from "express-async-handler";

const createCoupon = asyncHandler(async (req, res) => {
  const { name, discount, expiry } = req.body;
  if (!name || !discount || !expiry) throw new Error("Missing input");
  const newCoupon = await Coupon.create({...req.body, expiry: Date.now() + +expiry *24*60*60*1000});
  return res.status(200).json({
    success: newCoupon ? true : false,
    message: newCoupon ? newCoupon : "Create coupon failed!",
  });
});

const getAllCoupon = asyncHandler(async (req, res) => {
  const coupon = await Coupon.find().select("-createdAt -updatedAt");
  return res.status(200).json({
    success: coupon ? true : false,
    message: coupon ? coupon : "Get all coupon failed!",
  });
});

const updateCoupon = asyncHandler(async (req, res) => {
  const { cid } = req.params;
  if(Object.keys(req.body).length === 0) throw new Error('Missing input!')
  if(req.body.expiry) req.body.expiry = Date.now() + +expiry *24*60*60*1000
  const updatedCoupon = await Coupon.findByIdAndUpdate(cid, req.body, {
    new: true,
  });
  return res.status(200).json({
    success: updatedCoupon ? true : false,
    message: updatedCoupon ? updatedCoupon : "Update Coupon failed!",
  });
});

const deleteCoupon  = asyncHandler(async (req, res) => {
  const { cid } = req.params;
  const deletedCoupon  = await Coupon .findByIdAndDelete(cid);
  return res.status(200).json({
    success: deletedCoupon  ? true : false,
    message: deletedCoupon  ? deletedCoupon  : "Delete Coupon  failed!",
  });
});

export default { createCoupon,getAllCoupon,updateCoupon ,deleteCoupon};

