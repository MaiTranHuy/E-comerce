import User from "../models/UserModel.js";
import asyncHandler from "express-async-handler";
import verifyToken from "../middlewares/jwt.js";
import jwt from "jsonwebtoken";
import sendEmail from "../ultils/sendEmail.js";
import crypto from "crypto";

const registerService = asyncHandler(async (userData) => {
  const { email } = userData;
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error("User already exists!");
  }
  const newUser = await User.create(userData);
  return {
    success: Boolean(newUser),
    message: newUser
      ? "Register successfully! Please go to login!"
      : "Something went wrong!",
  };
});

const loginService = asyncHandler(async (userData) =>{
    const account = await User.findOne({ email });
  
    if (account && (await account.isCorrectPassword(password))) {
      const { password, role, refreshToken, ...userData } = account.toObject();
      const accessToken = await verifyToken.generalAccessToken(account._id, role);
      const newRefreshToken = await verifyToken.generalRefreshToken(account._id);
  
      await User.findByIdAndUpdate(
        account._id,
        { refreshToken: newRefreshToken },
        { new: true }
      );
  
      return {
        statusCode: 200,
        success: true,
        accessToken,
        refreshToken,
        message: userData,
      };
    } else {
      return {
        statusCode: 401,
        success: false,
        message: "Invalid username or password!",
      };
    }
  });

export default {registerService}
