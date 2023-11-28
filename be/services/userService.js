import User from "../models/User.js";
import asyncHandler from "express-async-handler";
import verifyToken from "../ultils/jwt.js";

const getAllUserService = asyncHandler(async () => {
  const listUsers = await User.find({}).select("-refreshToken -password -role");
  if (!listUsers)
    return {
      success: false,
      message: "No data!",
    };
  return {
    success: true,
    data: listUsers,
  };
});

const getCurrentUserService = asyncHandler(async (userData) => {
  const user = await User.findById(userData).select("-refreshToken -password -role");
  if (!user)
    return {
      success: false,
      message: "User not found!",
    };
  return {
    success: true,
    data: user,
  };
});

const deleteUserController = asyncHandler(async (userData) => {
  const deleteUser = await User.findByIdAndDelete(userData);
  if (!deleteUser)
    return {
      success: false,
      message: "Delete user error!",
    };
  return {
    success: true,
    data: deleteUser,
  };
});

const updateCurrentUserService = asyncHandler(async (userData) => {
  const updateUser = await User.findByIdAndUpdate(userData._id, userData.updateField, {
    new: true,
  }).select("-password -role");
  if (!updateUser)
    return {
      success: false,
      message: "Update user error!",
    };
  return {
    success: true,
    data: updateUser,
  };
});

const updateUserByAdminService = asyncHandler(async (userData) => {
  const user = await User.findByIdAndUpdate(userData.uid, userData.updateField, {
    new: true,
  }).select("-password -role");
  if (!user)
    return {
      success: false,
      message: "Update user error!",
    };
  return {
    success: true,
    data: user,
  };
});

const updateUserAddressService = asyncHandler(async (userData) => {
  // const user = await User.findById(userData._id).select("-password -role -refreshToken")
  // user.address.push(userData.address)
  // await user.save()
  const user = await User.findByIdAndUpdate(
    userData._id,
    { $push: { address: userData.address } },
    {
      new: true,
    }
  ).select("-password -role -refreshToken");
  if (!user)
    return {
      success: false,
      message: "Update address error!",
    };
  return {
    success: true,
    data: user,
  };
});


export default {
  getAllUserService,
  getCurrentUserService,
  deleteUserController,
  updateCurrentUserService,
  updateUserByAdminService,
  updateUserAddressService
};
