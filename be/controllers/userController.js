import User from "../models/User.js";
import asyncHandler from "express-async-handler";

const getUsers = asyncHandler(async (req, res) => {
  const listUsers = await User.find({}).select("-refreshToken -password -role");
  return res.status(200).json({
    success: listUsers ? true : false,
    users: listUsers,
  });
});

const getCurrent = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const existingUser = await User.findById(_id).select(
    "-refreshToken -password -role"
  );
  return res.status(200).json({
    success: existingUser ? true : false,
    message: existingUser ? existingUser : "User not found! ",
  });
});

const deleteCurrent = asyncHandler(async (req, res) => {
  const { _id } = req.query;
  if (!_id) throw new Error("Missing input!");
  const deleteUser = await User.findByIdAndDelete(_id);
  return res.status(200).json({
    success: deleteUser ? true : false,
    message: deleteUser ? "Delete success!" : "Delete fail! ",
  });
});

const updateUser = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  if (!_id || Object.keys(req.body).length === 0)
    throw new Error("Missing input!");
  const updateUser = await User.findByIdAndUpdate(_id, req.body, {
    new: true,
  }).select("-password -role");
  return res.status(200).json({
    success: updateUser ? true : false,
    message: updateUser ? updateUser : "Update fail! ",
  });
});

const updateUserByAdmin = asyncHandler(async (req, res) => {
  const { uid } = req.params;
  if (!uid || Object.keys(req.body).length === 0)
    throw new Error("Missing input!");
  const updateUser = await User.findByIdAndUpdate(uid, req.body, {
    new: true,
  }).select("-password -role");
  return res.status(200).json({
    success: updateUser ? true : false,
    message: updateUser ? updateUser : "Update fail! ",
  });
});

const updateUserAddress = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  if (!req.body.address) throw new Error("Missing input!");
  const updateUser = await User.findByIdAndUpdate(
    _id,
    { $push: { address: req.body.address } },
    {
      new: true,
    }
  ).select("-password -role -refreshToken");
  return res.status(200).json({
    success: updateUser ? true : false,
    message: updateUser ? updateUser : "Update fail! ",
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
  getCurrent,
  getUsers,
  deleteCurrent,
  updateUser,
  updateUserByAdmin,
  updateUserAddress,
  updateCart,
};
