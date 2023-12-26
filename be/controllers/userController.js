import User from "../models/User.js";
import {userService} from "../services/indexService.js";
import asyncHandler from "express-async-handler";

const getAllUsersController = asyncHandler(async (req, res) => {
  const { page = 1, sort, limit, fields, ...inputQueries } = req.query;
  const optionQuery = { page, sort, limit, fields }
  let queryString = JSON.stringify(inputQueries);
  queryString = queryString.replace(
    /\b(gte|gt|lte|lt)\b/g,
    (match) => `$${match}`
  );
  const formatQueries = JSON.parse(queryString);
  const userData = { optionQuery, formatQueries };
  const user = await userService.getAllUserService(userData)
  if (!user.success)
    return res.status(400).json({
      success: false,
      message: user.message,
    });
  return res.status(201).json({
    success: true,
    message: "Get users successfully!",
    data: user,
  });
});

const getCurrentUserController = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  if (!_id)
    return res.status(400).json({
      success: false,
      message: "Missing input!",
    });
  const user = await userService.getCurrentUserService(_id)
  if (!user.success)
    return res.status(400).json({
      success: false,
      message: user.message,
    });
  return res.status(200).json({
    success: true,
    message: "Get current user successfully!",
    data: user.data,
  });
});

const deleteUserController = asyncHandler(async (req, res) => {
  const { _id } = req.query;
  if (!_id)
    return res.status(400).json({
      success: false,
      message: "Missing input!",
    });
  const user = await userService.deleteUserController(_id);
  if (!user.success)
    return res.status(400).json({
      success: false,
      message: user.message,
    });
  return res.status(200).json({
    success: true,
    message: "Delete current user successfully!",
    data: user.data,
  });
});

const updateCurrentUserController = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  if (!_id || Object.keys(req.body).length === 0)
    return res.status(400).json({
      success: false,
      message: "Missing input!",
    });
  const updateField = req.body
  const userData = { _id, updateField };
  const user = await userService.updateCurrentUserService(userData)
  if (!user.success)
    return res.status(400).json({
      success: false,
      message: user.message,
    });
  return res.status(200).json({
    success: true,
    message: "Update current user successfully!",
    data: user.data,
  });
});

const updateUserByAdminController = asyncHandler(async (req, res) => {
  const { uid } = req.params;
  if (!uid || Object.keys(req.body).length === 0)
    return res.status(400).json({
      success: false,
      message: "Missing input!",
    });
  const updateField = req.body
  const userData = { uid, updateField };
  const user = await userService.updateUserByAdminService(userData)
  if (!user.success)
    return res.status(400).json({
      success: false,
      message: user.message,
    });
  return res.status(200).json({
    success: true,
    message: "Update current user successfully!",
    data: user.data,
  });
});

const updateUserAddressController = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  if (!_id || !req.body.address)
    return res.status(400).json({
      success: false,
      message: "Missing input!",
    });
  const address = req.body.address
  const userData = { _id, address };
  const user = await userService.updateUserAddressService(userData)
  if (!user.success)
    return res.status(400).json({
      success: false,
      message: user.message,
    });
  return res.status(200).json({
    success: true,
    message: "Update address successfully!",
    data: user.data,
  });
});

const updateCart = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { pid, quantity, color } = req.body;
  if (!_id || !pid || !quantity || !color) throw new Error("Missing input!");
  const user = await User.findById(_id).select("cart");
  const alreadyProductIndex = user?.cart.findIndex(
    (el) => el.product.toString() === pid && el.color === color
  );
  if (alreadyProductIndex !== -1) {
    user.cart[alreadyProductIndex].quantity += quantity;
  } else {
    user.cart.push({ product: pid, quantity, color });
  }
  const response = await user.save();

  return res.status(200).json({
    success: response ? true : false,
    message: response ? response : "Cart updated failed",
  });
});

export default {
  getAllUsersController,
  getCurrentUserController,
  deleteUserController,
  updateCurrentUserController,
  updateUserByAdminController,
  updateUserAddressController,
  updateCart,
};
