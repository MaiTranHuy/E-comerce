import {productCategoryService} from "../services/indexService.js";
import asyncHandler from "express-async-handler";

const createProductCategoryController = asyncHandler(async (req, res) => {
  if (Object.keys(req.body).length === 0)
    return res.status(400).json({
      status: "ERROR",
      message: "Missing input!",
    });
  const productCategory = await productCategoryService.createproductCategoryService(req.body)
  if (!productCategory.success)
    return res.status(400).json({
      status: "ERROR",
      message: productCategory.message,
    });
  return res.status(200).json({
    status: "OK",
    message: "Create product category successfully!",
    data: productCategory.data,
  });
});

const getAllProductCategoryController = asyncHandler(async (req, res) => {
  const productCategory = await productCategoryService.getAllproductCategoryService()
  if (!productCategory.success)
    return res.status(400).json({
      status: "ERROR",
      message: productCategory.message,
    });
  return res.status(200).json({
    status: "OK",
    message: "Get all product category successfully!",
    data: productCategory.data,
  });
});

const updateProductCategoryController = asyncHandler(async (req, res) => {
  const { pcid } = req.params;
  if (!pcid)
    return res.status(400).json({
      status: "ERROR",
      message: "Missing input!",
    });
  const updateField = req.body
  const userData = { pcid, updateField };
  const productCategory = await productCategoryService.updateproductCategoryService(userData)
  if (!productCategory.success)
    return res.status(400).json({
      status: "ERROR",
      message: productCategory.message,
    });
  return res.status(200).json({
    status: "OK",
    message: "Update product category successfully!",
    data: productCategory.data,
  });
});

const deleteProductCategoryController = asyncHandler(async (req, res) => {
  const { pcid } = req.params;
  if (!pcid)
    return res.status(400).json({
      status: "ERROR",
      message: "Missing input!",
    });
  const productCategory = await productCategoryService.deleteproductCategoryService(pcid)
  if (!productCategory.success)
    return res.status(400).json({
      status: "ERROR",
      message: productCategory.message,
    });
  return res.status(200).json({
    status: "OK",
    message: "Delete product category successfully!",
    data: productCategory.data,
  });
});

export default {
  createProductCategoryController,
  getAllProductCategoryController,
  updateProductCategoryController,
  deleteProductCategoryController
};