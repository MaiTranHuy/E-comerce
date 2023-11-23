import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";

const verifyAccessToken = asyncHandler(async (req, res, next) => {
  if (req?.headers?.authorization?.startsWith("Bearer")) {
    const token = req.headers?.authorization?.split(" ")[1];
    jwt.verify(token, process.env.ACCESS_TOKEN, (err, tokenData) => {
      if (err) {
        return res.status(401).json({
          success: false,
          message: "Invalid access token!",
        });
      }
      req.user = tokenData;
      next();
    });
  } else {
    return res.status(401).json({
      success: false,
      message: "Required authorization!",
    });
  }
});

const isAdmin = asyncHandler((req, res, next) => {
  const { role } = req.user;
  if (!role || role !== "admin") {
    return res.status(401).json({
      success: false,
      message: "Required admin role!",
    });
  }
  next();
});

export default { verifyAccessToken, isAdmin };
