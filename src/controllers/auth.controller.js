const catchAsync = require("../utils/catchAsync");
const ApiResponse = require("../utils/ApiResponse");

const authService = require("../services/auth.service");
const tokenService = require("../services/token.service");

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

  const { accessToken, refreshToken } = tokenService.createTokens(user);

  res.cookie("accessToken", accessToken, accessCookieOptions);

  res.cookie("refreshToken", refreshToken, refreshCookieOptions);

  return res.status(200).json(
    new ApiResponse(200, "Login successful", {
      user,
      accessToken,
      refreshToken,
    }),
  );
});

module.exports = {
  register,
  login,
};
