const catchAsync = require("../utils/catchAsync");
const ApiResponse = require("../utils/ApiResponse");

const userService = require("../services/user.service");

const createUser = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body);

  return res
    .status(201)
    .json(new ApiResponse(201, "User created successfully", user));
});

const getUsers = catchAsync(async (req, res) => {
  const users = await userService.getUsers(req.query);

  return res
    .status(200)
    .json(new ApiResponse(200, "Users fetched successfully", users));
});

const getUserById = catchAsync(async (req, res) => {
  const user = await userService.getUserById(req.params.id);

  return res
    .status(200)
    .json(new ApiResponse(200, "User fetched successfully", user));
});

const updateUser = catchAsync(async (req, res) => {
  const user = await userService.updateUser(req.params.id, req.body);

  return res
    .status(200)
    .json(new ApiResponse(200, "User updated successfully", user));
});

const deleteUser = catchAsync(async (req, res) => {
  await userService.deleteUser(req.params.id);

  return res
    .status(200)
    .json(new ApiResponse(200, "User deleted successfully"));
});

module.exports = {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
};
