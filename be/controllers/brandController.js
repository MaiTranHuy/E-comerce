import {brandService} from "../services/indexService.js";
import asyncHandler from "express-async-handler";

const createBrandController = asyncHandler(async (req, res) => {
  if (Object.keys(req.body).length === 0)
    return res.status(400).json({
      success: false,
      message: "Missing input!",
    });
  const brand = await brandService.createbrandService(req.body)
  if (!brand.success)
    return res.status(400).json({
      success: false,
      message: brand.message,
    });
  return res.status(200).json({
    success: true,
    message: "Create brand successfully!",
    data: brand.data,
  });
});

const getAllBrandController = asyncHandler(async (req, res) => {
  const brand = await brandService.getAllbrandService()
  if (!brand.success)
    return res.status(400).json({
      success: false,
      message: brand.message,
    });
  return res.status(200).json({
    success: true,
    message: "Get all brand successfully!",
    data: brand,
  });
});

const updateBrandController = asyncHandler(async (req, res) => {
  const { bid } = req.params;
  if (!bid)
    return res.status(400).json({
      success: false,
      message: "Missing input!",
    });
  const updateField = req.body
  const userData = { bid, updateField };
  const brand = await brandService.updatebrandService(userData)
  if (!brand.success)
    return res.status(400).json({
      success: false,
      message: brand.message,
    });
  return res.status(200).json({
    success: true,
    message: "Update brand successfully!",
    data: brand.data,
  });
});

const deleteBrandController = asyncHandler(async (req, res) => {
  const { bid } = req.params;
  if (!bid)
    return res.status(400).json({
      success: false,
      message: "Missing input!",
    });
  const brand = await brandService.deletebrandService(bid)
  if (!brand.success)
    return res.status(400).json({
      success: false,
      message: brand.message,
    });
  return res.status(200).json({
    success: true,
    message: "Delete brand successfully!",
    data: brand.data,
  });
});

export default {
  createBrandController,
  getAllBrandController,
  updateBrandController,
  deleteBrandController
};