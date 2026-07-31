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

module.exports = {
  registerUser,
};
