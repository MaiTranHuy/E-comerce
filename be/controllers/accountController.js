import User from "../models/User.js";
import asyncHandler from "express-async-handler";
import userService from "../services/userService.js";
import verifyToken from "../ultils/jwt.js";
import jwt from "jsonwebtoken";
import sendEmail from "../config/sendEmail.js";
import crypto from "crypto";

const registerController = asyncHandler(async (req, res) => {
  const { email, password, firstName, lastName, phoneNumber } = req.body;
  if (!email || !password || !firstName || !phoneNumber || !lastName)
    return res.status(400).json({
      status: "ERROR",
      message: "Missing input!",
    });
  const newUser = await userService.registerService(req.body);
  if (!newUser.success)
    return res.status(400).json({
      status: "ERROR",
      message: newUser.message,
    });
  return res.status(201).json({
    status: "OK",
    message: "Register successfully! Please go to login!",
    data: newUser,
  });
});

const loginController = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({
      status: "ERROR",
      message: "Missing input!",
    });
  const user = await userService.loginService(req.body);

  if (!user.success)
    return res.status(400).json({
      status: "ERROR",
      message: user.message,
    });

  const accessToken = user.accessToken;
  const refreshToken = user.refreshToken;
  res.cookie("refreshToken", user.refreshToken, {
    maxAge: 30 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    secure: true,
    sameSite: "None",
  });

  return res.status(200).json({
    status: "OK",
    accessToken,
    refreshToken,
    message: "Login successful!",
    data: user.data,
  });
});

const logoutController = asyncHandler(async (req, res) => {
  const cookie = req.cookies;
  if (!cookie || !cookie.refreshToken)
    return res.status(400).json({
      status: "ERROR",
      message: "Missing input!",
    });
  const user = await userService.logoutService(cookie.refreshToken);
  if (!user.success)
    return res.status(400).json({
      status: "ERROR",
      message: user.message,
    });

  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: true,
  });

  return res.status(200).json({
    status: "OK",
    message: "Logout successfully!",
  });
});

const refreshAccessTokenController = asyncHandler(async (req, res) => {
  const cookie = req.cookies;
  if (!cookie && !cookie.refreshToken)
    return res.status(400).json({
      status: "ERROR",
      message: "Missing input!",
    });
  const verify = jwt.verify(cookie.refreshToken, process.env.REFRESH_TOKEN);
  const user = await userService.refreshAccessTokenService(verify._id);
  if (!user.success)
    return res.status(400).json({
      status: "ERROR",
      message: user.message,
    });
  const newAccessToken = await verifyToken.generalAccessToken(
    user.data._id,
    user.data.role
  );
  return res.status(200).json({
    status: "OK",
    message: "Created new access token successfully!",
    data: newAccessToken,
  });
});

const forgotPasswordController = asyncHandler(async (req, res) => {
  const email = req.query;
  if (!email)
    return res.status(400).json({
      status: "ERROR",
      message: "Missing input!",
    });
  const user = await userService.forgotPasswordService(email);
  if (!user.success)
    return res.status(400).json({
      status: "ERROR",
      message: user.message,
    });
  const emailSubject = "You forgot your password";
  const emailHtml = `
  Xin vui lòng click vào link dưới đây để thay đổi mật khẩu của bạn. Link này sẽ hết hạn sau 15 phút kể từ bây giờ. 
  <a href="${process.env.URL_SERVER}/api/users/resetPassword/${user.data.token}">Click here!</a>
  `;
  const send = await sendEmail.sendEmailService(
    user.data.email,
    emailSubject,
    emailHtml
  );
  return res.status(200).json({
    success: true,
    data: send,
  });
});

const resetPasswordController = asyncHandler(async (req, res) => {
  const { password, token } = req.body;
  if (!password || !token)
    return res.status(400).json({
      status: "ERROR",
      message: "Missing input!",
    });
  const passwordResetToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");
  const userData = { password, passwordResetToken };
  const user = await userService.resetPasswordService(userData);
  if (!user.success)
    return res.status(400).json({
      status: "ERROR",
      message: user.message,
    });
  return res.status(200).json({
    status: "OK",
    message: "Change password successfully!",
  });
});

export default {
  registerController,
  loginController,
  refreshAccessTokenController,
  logoutController,
  forgotPasswordController,
  resetPasswordController,
};
