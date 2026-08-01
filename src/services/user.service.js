const User = require("../models/User.mongoose.model");
const Role = require("../models/Role.mongoose.model");
const ApiError = require("../utils/ApiError");

const createUser = async ({
  name,
  email,
  password,
  roleId,
}) => {
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new ApiError(409, "User already exists");
  }

  const role = await Role.findById(roleId);

  if (!role) {
    throw new ApiError(404, "Role not found");
  }

  return User.create({
    name,
    email,
    password,
    role: role._id,
  });
};

const getUsers = async () => {
  return User.find()
    .populate({
      path: "role",
      populate: {
        path: "permissions",
      },
    })
    .sort({ createdAt: -1 });
};

const getUserById = async (id) => {
  const user = await User.findById(id).populate({
    path: "role",
    populate: {
      path: "permissions",
    },
  });

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  return user;
};

const updateUser = async (id, payload) => {
  if (payload.roleId) {
    const role = await Role.findById(payload.roleId);

    if (!role) {
      throw new ApiError(404, "Role not found");
    }

    payload.role = role._id;
    delete payload.roleId;
  }

  const user = await User.findByIdAndUpdate(
    id,
    payload,
    {
      new: true,
      runValidators: true,
    }
  ).populate({
    path: "role",
    populate: {
      path: "permissions",
    },
  });

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  return user;
};

const deleteUser = async (id) => {
  const user = await User.findById(id);

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  await user.deleteOne();
};

module.exports = {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
};