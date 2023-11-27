import User from "../models/User.js";
import asyncHandler from "express-async-handler";
import verifyToken from "../ultils/jwt.js";
import jwt from "jsonwebtoken";
import sendEmail from "../config/sendEmail.js";
import crypto from "crypto";

const register = asyncHandler(async (req, res) => {
  const { email, password, firstName, lastName, phoneNumber } = req.body;
  if (!email || !password || !firstName || !phoneNumber || !lastName)
    throw new Error("Missing input!");

  const existingUser = await User.findOne({ email });
  if (existingUser) throw new Error("User already exists!");
  else {
    const newUser = await User.create(req.body);
    return res.status(200).json({
      success: newUser ? true : false,
      message: newUser
        ? "Register successfully! Please go to login!"
        : "Something went wrong!",
    });
  }
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({
      success: false,
      message: "Missing inputs",
    });

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

    res.cookie("refreshToken", refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: true,
      sameSite: "None",
    });

    return res.status(200).json({
      success: true,
      accessToken,
      refreshToken,
      message: userData,
    });
  } else throw new Error("Invalid username or password!");
});

const refreshAccessToken = asyncHandler(async (req, res) => {
  const cookie = req.cookies;
  if (!cookie && !cookie.refreshToken)
    throw new Error("No refresh Token in cookies!");
  const verify = jwt.verify(cookie.refreshToken, process.env.REFRESH_TOKEN);
  const existingUser = await User.findById(verify._id);
  return res.status(200).json({
    success: existingUser ? true : false,
    newAccessToken: existingUser
      ? await verifyToken.generalAccessToken(
          existingUser._id,
          existingUser.role
        )
      : "Refresh token failed! ",
  });
});

const logout = asyncHandler(async (req, res) => {
  const cookie = req.cookies;
  if (!cookie || !cookie.refreshToken)
    throw new Error("No refresh Token in cookies!");
  await User.findOneAndUpdate(
    { refreshToken: cookie.refreshToken },
    { refreshToken: "" },
    { new: true }
  );
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: true,
  });

  return res.status(200).json({
    success: true,
    message: "Logout successfully!",
  });
});

const forgotPassword = asyncHandler(async (req, res) => {
  const email = req.query;
  if (!email) throw new Error("Missing email!");
  const existingUser = await User.findOne(email);
  if (!existingUser) throw new Error("User not found!");
  const resetToken = await existingUser.createPasswordChangedToken();
  await existingUser.save();
  const emailSubject = "You forgot your password";
  const emailHtml = `
  Xin vui lòng click vào link dưới đây để thay đổi mật khẩu của bạn. Link này sẽ hết hạn sau 15 phút kể từ bây giờ. 
  <a href="${process.env.URL_SERVER}/api/users/resetPassword/${resetToken}">Click here!</a>
  `;
  const send = await sendEmail.sendEmailService(
    existingUser.email,
    emailSubject,
    emailHtml
  );
  return res.status(200).json({
    success: true,
    send,
  });
});

const resetPassword = asyncHandler(async (req, res) => {
  const { password, token } = req.body;
  if (!password || !token) throw new Error("Missing input");
  const passwordResetToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");
  const existingUser = await User.findOne({
    passwordResetToken,
    passwordResetExpires: { $gt: Date.now() },
  });
  if (!existingUser) throw new Error("Invalid reset token!");
  existingUser.password = password;
  existingUser.passwordResetToken = undefined;
  existingUser.passwordChangeAt = Date.now();
  existingUser.passwordResetExpires = undefined;
  await existingUser.save();
  return res.status(200).json({
    success: existingUser ? true : false,
    message: existingUser
      ? "Updated password successfully!"
      : "Something went wrong",
  });
});

export default {
  register,
  login,
  refreshAccessToken,
  logout,
  forgotPassword,
  resetPassword,
};
