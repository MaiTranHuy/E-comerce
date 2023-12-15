import asyncHandler from "express-async-handler";
import { accountService } from "../services/indexService.js";
import verifyToken from "../utils/jwt.js";
import jwt from "jsonwebtoken";
import sendEmail from "../config/sendEmail.js";
import crypto from "crypto";

const registerController = asyncHandler(async (req, res) => {
  const { email, password, firstName, lastName, phoneNumber } = req.body;
  if (!email || !password || !firstName || !phoneNumber || !lastName)
    return res.status(400).json({
      success: false,
      message: "Missing input!",
    });
  const newUser = await accountService.registerService({ email, phoneNumber });
  if (!newUser.success)
    return res.status(400).json({
      success: false,
      message: newUser.message,
    });
  const token = crypto.randomBytes(32).toString("hex");
  res.cookie(
    "dataRegister",
    { ...req.body, token },
    {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    }
  );
  const emailSubject = "Xac minh tai khoan";
  const emailHtml = `
    Xin vui lòng click vào link dưới đây để xác nhận Email của bạn. Link này sẽ hết hạn sau 15 phút kể từ bây giờ.
    <a href="${process.env.URL_SERVER}/api/account/finalregister/${token}">Click here!</a>
    `;
  await sendEmail.sendEmailService(email, emailSubject, emailHtml);
  return res.status(200).json({
    success: true,
    message: "Please check your email to verify your account!",
  });
});

const finalRegisterController = asyncHandler(async (req, res) => {
  const cookie = req.cookies;
  const { token } = req.params;
  const { email, password, firstName, lastName, phoneNumber } =
    cookie.dataRegister;
  const userData = { email, password, firstName, lastName, phoneNumber };
  if (!cookie || cookie?.dataRegister?.token !== token) {
    res.clearCookie("dataRegister");
    return res.redirect(`${process.env.URL_CLIENT}/finalregister/failed`);
  }
  const newUser = await accountService.finalRegisterService(userData);
  res.clearCookie("dataRegister");
  if (!newUser.success) {
    return res.redirect(`${process.env.URL_CLIENT}/finalregister/failed`);
  }
  return res.redirect(`${process.env.URL_CLIENT}/finalregister/success`);
});

const loginController = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({
      success: false,
      message: "Missing input!",
    });
  const user = await accountService.loginService(req.body);
  if (!user.success) {
    return res.status(400).json({
      success: false,
      message: user.message,
    });
  }
  const accessToken = user.accessToken;
  const refreshToken = user.refreshToken;
  res.cookie("refreshToken", user.refreshToken, {
    maxAge: 30 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    secure: true,
    sameSite: "None",
  });

  return res.status(200).json({
    success: true,
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
      success: false,
      message: "Missing input!",
    });
  const user = await accountService.logoutService(cookie.refreshToken);
  if (!user.success)
    return res.status(400).json({
      success: false,
      message: user.message,
    });

  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: true,
  });

  return res.status(200).json({
    success: true,
    message: "Logout successfully!",
  });
});

const refreshAccessTokenController = asyncHandler(async (req, res) => {
  const cookie = req.cookies;
  if (!cookie && !cookie.refreshToken)
    return res.status(400).json({
      success: false,
      message: "Missing input!",
    });
  const verify = jwt.verify(cookie.refreshToken, process.env.REFRESH_TOKEN);
  const user = await accountService.refreshAccessTokenService(verify._id);
  if (!user.success)
    return res.status(400).json({
      success: false,
      message: user.message,
    });
  const newAccessToken = await verifyToken.generalAccessToken(
    user.data._id,
    user.data.role
  );
  return res.status(200).json({
    success: true,
    message: "Created new access token successfully!",
    data: newAccessToken,
  });
});

const forgotPasswordController = asyncHandler(async (req, res) => {
  const email = req.body;
  if (!email)
    return res.status(400).json({
      success: false,
      message: "Missing input!",
    });
  const user = await accountService.forgotPasswordService(email);
  if (!user.success)
    return res.status(400).json({
      success: false,
      message: user.message,
    });
  const emailSubject = "You forgot your password";
  const emailHtml = `
  Xin vui lòng click vào link dưới đây để thay đổi mật khẩu của bạn. Link này sẽ hết hạn sau 15 phút kể từ bây giờ. 
  <a href="${process.env.URL_CLIENT}/resetpassword/${user.data.token}">Click here!</a>
  `;
  const send = await sendEmail.sendEmailService(user.data.email, emailSubject, emailHtml);
  return res.status(200).json({
    success: true,
    data: send,
  });
});

const resetPasswordController = asyncHandler(async (req, res) => {
  const { password, token } = req.body;
  if (!password || !token)
    return res.status(400).json({
      success: false,
      message: "Missing input!",
    });
  const passwordResetToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");
  const userData = { password, passwordResetToken };
  const user = await accountService.resetPasswordService(userData);
  if (!user.success)
    return res.status(400).json({
      success: false,
      message: user.message,
    });
  return res.status(200).json({
    success: true,
    message: "Change password successfully!",
  });
});

export default {
  registerController,
  finalRegisterController,
  loginController,
  refreshAccessTokenController,
  logoutController,
  forgotPasswordController,
  resetPasswordController,
};
