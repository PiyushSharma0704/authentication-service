const catchAsync = require("../utils/catchAsync");
const ApiResponse = require("../utils/ApiResponse");

const authService = require("../services/auth.service");
const tokenService = require("../services/token.service");
const ApiError = require("../utils/ApiError");
const {
  accessCookieOptions,
  refreshCookieOptions,
} = require("../utils/cookie");

const register = catchAsync(async (req, res) => {
  const user = await authService.registerUser(req.body);

  return res
    .status(201)
    .json(new ApiResponse(201, "User registered successfully", user));
});

const login = catchAsync(async (req, res) => {
  const user = await authService.loginUser(req.body);

  const loginResponse = {
    id: user._id,
    name: user.name,
    email: user.email,
    role: {
      id: user.role._id,
      name: user.role.name,
    },
    avatar: user.avatar,
    isEmailVerified: user.isEmailVerified,
  };

  const { accessToken, refreshToken } =
    await tokenService.createTokenPair(user);

  res.cookie("accessToken", accessToken, accessCookieOptions);

  res.cookie("refreshToken", refreshToken, refreshCookieOptions);

  return res.status(200).json(
    new ApiResponse(200, "Login successful", {
      user: loginResponse,
      accessToken,
      refreshToken,
    }),
  );
});

const getCurrentUser = catchAsync(async (req, res) => {
  const user = {
    id: req.user._id,
    name: req.user.name,
    email: req.user.email,
    avatar: req.user.avatar,
    isEmailVerified: req.user.isEmailVerified,

    role: {
      id: req.user.role._id,
      name: req.user.role.name,

      permissions: req.user.role.permissions.map((permission) => ({
        id: permission._id,
        name: permission.name,
        module: permission.module,
      })),
    },
  };

  return res
    .status(200)
    .json(new ApiResponse(200, "Current user fetched successfully", user));
});

const refreshToken = catchAsync(async (req, res) => {
  const token = req.body.refreshToken || req.cookies.refreshToken;

  if (!token) {
    throw new ApiError(401, "Refresh token required");
  }

  const tokens = await authService.refreshLogin(token);

  res.cookie("accessToken", tokens.accessToken, accessCookieOptions);

  res.cookie("refreshToken", tokens.refreshToken, refreshCookieOptions);

  return res.json(new ApiResponse(200, "Access token refreshed", tokens));
});

module.exports = {
  register,
  login,
  getCurrentUser,
  refreshToken,
};
