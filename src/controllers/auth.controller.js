const catchAsync = require("../utils/catchAsync");
const ApiResponse = require("../utils/ApiResponse");

const authService = require("../services/auth.service");

const register = catchAsync(async (req, res) => {
  const user = await authService.registerUser(req.body);

  return res
    .status(201)
    .json(new ApiResponse(201, "User registered successfully", user));
});

module.exports = {
  register,
};
