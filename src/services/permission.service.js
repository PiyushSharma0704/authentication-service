const Permission = require("../models/Permission.mongoose.model");
const { PERMISSIONS } = require("../constants/strings");
const ApiError = require("../utils/ApiError");

const buildPermissions = () => {
  return Object.values(PERMISSIONS).map((permission) => ({
    name: permission,
    module: permission.split("_")[0],
    description: permission.replaceAll("_", " "),
    isSystem: true,
  }));
};

const seedPermissions = async () => {
  const permissions = buildPermissions();

  for (const permission of permissions) {
    await Permission.updateOne(
      { name: permission.name },
      { $setOnInsert: permission },
      { upsert: true },
    );
  }

  return Permission.find();
};


const createPermission = async (payload) => {
  const exists = await Permission.findOne({
    name: payload.name,
  });

  if (exists) {
    throw new ApiError(
      409,
      "Permission already exists"
    );
  }

  return Permission.create(payload);
};

const getPermissions = async () => {
  return Permission.find().sort({
    module: 1,
    name: 1,
  });
};

const getPermissionById = async (id) => {
  const permission =
    await Permission.findById(id);

  if (!permission) {
    throw new ApiError(
      404,
      "Permission not found"
    );
  }

  return permission;
};

const updatePermission = async (
  id,
  payload
) => {
  const permission =
    await Permission.findByIdAndUpdate(
      id,
      payload,
      {
        new: true,
        runValidators: true,
      }
    );

  if (!permission) {
    throw new ApiError(
      404,
      "Permission not found"
    );
  }

  return permission;
};

const deletePermission = async (id) => {
  const permission =
    await Permission.findById(id);

  if (!permission) {
    throw new ApiError(
      404,
      "Permission not found"
    );
  }

  if (permission.isSystem) {
    throw new ApiError(
      403,
      "System permissions cannot be deleted"
    );
  }

  await permission.deleteOne();
};

module.exports = {
  seedPermissions,
  createPermission,
  getPermissions,
  getPermissionById,
  updatePermission,
  deletePermission,
};
