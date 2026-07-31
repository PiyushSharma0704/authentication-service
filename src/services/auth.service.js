const User = require("../models/User.mongoose.model");
const ApiError = require("../utils/ApiError");
const logger = require("../utils/logger");

const registerUser = async ({ name, email, password }) => {
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new ApiError(409, "User already exists");
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  logger.info(`New user registered: ${user.email}`);

  return user;
};

const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    throw new ApiError(401, "Invalid email or password");
  }

  const isMatch = await user.comparePassword(password);

  if (!isMatch) {
    throw new ApiError(401, "Invalid email or password");
  }

  if (!user.isActive) {
    throw new ApiError(403, "Account is disabled");
  }

  return user;
};

module.exports = {
  registerUser,
  loginUser,
};
