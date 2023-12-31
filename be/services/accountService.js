import User from "../models/User.js";
import asyncHandler from "express-async-handler";
import verifyToken from "../utils/jwt.js";

const registerService = asyncHandler(async (userData) => {
  const { email, phoneNumber } = userData;
  const existingUser = await User.findOne({
    $or: [{ email }, { phoneNumber }],
  });
  if (existingUser) {
    if (existingUser.email === email) {
      return {
        success: false,
        message: "Email already registered!",
      };
    } else {
      return {
        success: false,
        message: "Phone number registered!",
      };
    }
  }

  return {
    success: true,
  };
});

const finalRegisterService = asyncHandler(async (userData) => {
  const newUser = await User.create(userData);
  if (!newUser)
    return {
      success: false,
      message: "Register error!",
    };
  return {
    success: true,
    data: newUser,
  };
});

const loginService = asyncHandler(async (userData) => {
  const { email, password } = userData;
  const existingUser = await User.findOne({ email })
    .populate({
      path: "cart.product",
      select: "title price",
      populate: { path: "category", select: "title" },
    })
    .select("-refreshToken -createdAt -updatedAt");
  if (!existingUser)
    return {
      success: false,
      message: "User not found!",
    };
  const isCorrectPassword = await existingUser.isCorrectPassword(password);
  if (!isCorrectPassword)
    return {
      success: false,
      message: "Password is not correct!",
    };
  if (existingUser.isBlocked) {
    const verifyToken = await existingUser.createVerifyToken();
    await existingUser.save();
    if (!verifyToken)
      return {
        success: false,
        message: "Create reset password token failed!",
      };
    return {
      success: false,
      message: "Account need to verify!",
      data: existingUser,
      token: verifyToken,
    };
  }
  const accessToken = await verifyToken.generalAccessToken(
    existingUser._id,
    existingUser.role
  );
  const refreshToken = await verifyToken.generalRefreshToken(existingUser._id);
  await User.findByIdAndUpdate(
    existingUser._id,
    { refreshToken },
    { new: true }
  );

  return {
    success: true,
    accessToken,
    refreshToken,
    data: existingUser,
  };
});

const logoutService = asyncHandler(async (userData) => {
  const user = await User.findOneAndUpdate(
    { refreshToken: userData },
    { refreshToken: "" },
    { new: true }
  );
  if (!user)
    return {
      success: false,
      message: "Log out error!",
    };
  return {
    success: true,
    message: "Logout successfully!",
  };
});

const refreshAccessTokenService = asyncHandler(async (userData) => {
  const existingUser = await User.findById(userData);
  if (!existingUser)
    return {
      success: false,
      message: "User not found!",
    };
  return {
    success: true,
    data: existingUser,
  };
});

const forgotPasswordService = asyncHandler(async (userData) => {
  const existingUser = await User.findOne(userData);
  if (!existingUser)
    return {
      success: false,
      message: "User not found!",
    };
  const resetPasswordToken = await existingUser.createPasswordChangedToken();
  await existingUser.save();
  if (!resetPasswordToken)
    return {
      success: false,
      message: "Create reset password token failed!",
    };
  return {
    success: true,
    data: {
      token: resetPasswordToken,
      email: existingUser.email,
    },
  };
});

const resetPasswordService = asyncHandler(async (userData) => {
  const existingUser = await User.findOne({
    passwordResetToken: userData.passwordResetToken,
  });
  if (!existingUser)
    return {
      success: false,
      message: "User not found!",
    };
  const isTokenCorrect = await User.findOne({
    passwordResetExpires: { $gt: Date.now() },
  });
  if (!isTokenCorrect)
    return {
      success: false,
      message: "Reset password token not correct!",
    };
  existingUser.password = userData.password;
  existingUser.passwordResetToken = undefined;
  existingUser.passwordChangeAt = Date.now();
  existingUser.passwordResetExpires = undefined;
  await existingUser.save();
  return {
    success: true,
    data: existingUser,
  };
});

export default {
  registerService,
  finalRegisterService,
  loginService,
  refreshAccessTokenService,
  logoutService,
  forgotPasswordService,
  resetPasswordService,
};
