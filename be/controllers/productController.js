import Product from "../models/Product.js";
import asyncHandler from "express-async-handler";
import { productService } from "../services/indexService.js";
import slugify from "slugify";

const createProductController = asyncHandler(async (req, res) => {
  const { title, description, price, brand, category } = req.body;
  const imageData = req?.files?.map(el => el.path)
  if (!title || !description || !price || !brand || !category ||!imageData)
    return res.status(400).json({
      success: false,
      message: "Missing input!",
    });
    req.body.images = imageData;
  const newProduct = await productService.createProductService(req.body);
  if (!newProduct.success)
    return res.status(400).json({
      success: false,
      message: newProduct.message,
    });
  return res.status(201).json({
    success: true,
    message: "Create product successfully!",
    data: newProduct,
  });
});

const getProductController = asyncHandler(async (req, res) => {
  const { pid } = req.params;
  if (!pid)
    return res.status(400).json({
      success: false,
      message: "Missing input!",
    });
  const product = await productService.getProductService(pid)
  if (!product.success)
    return res.status(400).json({
      success: false,
      message: product.message,
    });
  return res.status(201).json({
    success: true,
    message: "Get product successfully!",
    data: product,
  });
});

const getAllProductController = asyncHandler(async (req, res) => {
  const { page = 1, sort, limit, fields, ...inputQueries } = req.query;
  const optionQuery = { page, sort, limit, fields }
  let queryString = JSON.stringify(inputQueries);
  queryString = queryString.replace(
    /\b(gte|gt|lte|lt)\b/g,
    (match) => `$${match}`
  );
  const formatQueries = JSON.parse(queryString);
  const userData = { optionQuery, formatQueries };
  const product = await productService.getAllProductService(userData)
  if (!product.success)
    return res.status(400).json({
      success: false,
      message: product.message,
    });
  return res.status(201).json({
    success: true,
    message: "Get products successfully!",
    data: product,
  });
});

const updateProductController = asyncHandler(async (req, res) => {
  const { pid } = req.params;
  if (!pid || Object.keys(req.body).length === 0)
    return res.status(400).json({
      success: false,
      message: "Missing input!",
    });
  if (req.body.title)
    req.body.slug = '';
  const updateField = req.body
  const userData = { pid, updateField };
  const product = await productService.updateProductService(userData)
  if (!product.success)
    return res.status(400).json({
      success: false,
      message: product.message,
    });
  return res.status(200).json({
    success: true,
    message: "Update product successfully!",
    data: product,
  });
});

const deleteProductController = asyncHandler(async (req, res) => {
  const { pid } = req.params;
  if (!pid)
    return res.status(400).json({
      success: false,
      message: "Missing input!",
    });
  const product = await productService.deleteProductService(pid)
  if (!product.success)
    return res.status(400).json({
      success: false,
      message: product.message,
    });
  return res.status(201).json({
    success: true,
    message: "Delete product successfully!",
    data: product,
  });
});

const ratingProductController = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { star, pid } = req.body;
  if (!_id || !star || !pid)
    return res.status(400).json({
      success: false,
      message: "Missing input!",
    });
  const updateField = req.body
  const userData = { _id, updateField };
  const product = await productService.ratingProductService(userData);
  if (!product.success)
    return res.status(400).json({
      success: false,
      message: product.message,
    });
  return res.status(201).json({
    success: true,
    message: "Update product successfully!",
    data: product,
  });
});

const uploadImagesProductController = asyncHandler(async (req, res) => {
  const { pid } = req.params;
  if (!pid || !req.files)
    return res.status(400).json({
      success: false,
      message: "Missing input!",
    });
  const updateField = req.files
  const userData = { pid, updateField };
  const product = await productService.uploadImagesProductService(userData);
  if (!product.success)
    return res.status(400).json({
      success: false,
      message: product.message,
    });
  return res.status(201).json({
    success: true,
    message: "Update product successfully!",
    data: product,
  });
});

export default {
  createProductController,
  getProductController,
  getAllProductController,
  updateProductController,
  deleteProductController,
  ratingProductController,
  uploadImagesProductController,
};
