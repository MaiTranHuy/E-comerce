import Brand from "../models/Brand.js";
import asyncHandler from "express-async-handler";

const createBrand = asyncHandler(async (req, res) => {
  if (Object.keys(req.body).length === 0) throw new Error("Missing input");
  const newBrand = await Brand.create(req.body);
  return res.status(200).json({
    success: newBrand ? true : false,
    message: newBrand ? newBrand : "Create brand failed!",
  });
});

const getAllBrand = asyncHandler(async (req, res) => {
  const brand = await Brand.find().select("title");
  return res.status(200).json({
    success: brand ? true : false,
    message: brand ? brand : "Get all brand failed!",
  });
});

const updateBrand = asyncHandler(async (req, res) => {
  const { bid } = req.params;
  const updatedBrand = await Brand.findByIdAndUpdate(bid, req.body, {
    new: true,
  });
  return res.status(200).json({
    success: updatedBrand ? true : false,
    message: updatedBrand ? updatedBrand : "Update brand failed!",
  });
});

const deleteBrand = asyncHandler(async (req, res) => {
  const { bid } = req.params;
  const deletedBrand = await Brand.findByIdAndDelete(bid);
  return res.status(200).json({
    success: deletedBrand ? true : false,
    message: deletedBrand ? deletedBrand : "Delete brand failed!",
  });
});
export default { createBrand, getAllBrand, updateBrand, deleteBrand };
