const User = require("../models/User.mongoose.model");

const ApiError = require("../utils/ApiError");

const catchAsync = require("../utils/catchAsync");

const { verifyAccessToken } = require("../utils/jwt");

const authMiddleware = catchAsync(async (req, res, next) => {
  let token;

  // Authorization Header
  const authHeader = req.headers.authorization;

  if (authHeader?.startsWith("Bearer ")) {
    token = authHeader.split(" ")[1];
  }

  // Cookie
  if (!token && req.cookies?.accessToken) {
    token = req.cookies.accessToken;
  }

  if (!token) {
    throw new ApiError(401, "Authentication token is missing");
  }

  let decoded;

  try {
    decoded = verifyAccessToken(token);
  } catch (error) {
    throw new ApiError(401, "Invalid or expired access token");
  }

  const user = await User.findById(decoded.id);

  if (!user) {
    throw new ApiError(401, "User not found");
  }

  if (!user.isActive) {
    throw new ApiError(403, "User account is inactive");
  }

  req.user = user;

  next();
});

module.exports = authMiddleware;
