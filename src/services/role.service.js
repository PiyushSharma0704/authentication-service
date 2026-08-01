const Role = require("../models/Role.mongoose.model");

const Permission = require("../models/Permission.mongoose.model");
const { ROLES } = require("../constants/strings");
const ApiError = require("../utils/ApiError");



const seedRoles = async () => {
  const permissions = await Permission.find();

  const permissionMap = {};

  permissions.forEach((permission) => {
    permissionMap[permission.name] = permission._id;
  });

  const allPermissions = permissions.map((permission) => permission._id);

  const roles = [
    {
      name: ROLES.SUPER_ADMIN,
      description: "Super Administrator",
      permissions: allPermissions,
    },

    {
      name: ROLES.ADMIN,
      description: "Administrator",
      permissions: [
        permissionMap.USER_CREATE,
        permissionMap.USER_READ,
        permissionMap.USER_UPDATE,
        permissionMap.USER_DELETE,

        permissionMap.PROFILE_READ,
        permissionMap.PROFILE_UPDATE,
      ].filter(Boolean),
    },

    {
      name: ROLES.SUPPORT,
      description: "Support",
      permissions: [
        permissionMap.USER_READ,
        permissionMap.PROFILE_READ,
        permissionMap.PROFILE_UPDATE,
      ].filter(Boolean),
    },

    {
      name: ROLES.USER,
      description: "User",
      permissions: [
        permissionMap.PROFILE_READ,
        permissionMap.PROFILE_UPDATE,
      ].filter(Boolean),
    },
  ];

  for (const role of roles) {
    await Role.updateOne(
      { name: role.name },
      { $set: role },
      { upsert: true }
    );
  }

  return Role.find().populate("permissions");
};

const getRoleByName = async (name) => {
  return Role.findOne({ name });
};


const createRole = async ({
  name,
  description,
  permissions = [],
}) => {
  const exists = await Role.findOne({ name });

  if (exists) {
    throw new ApiError(409, "Role already exists");
  }

  return Role.create({
    name,
    description,
    permissions,
  });
};

const getRoles = async () => {
  return Role.find().populate("permissions");
};

const getRoleById = async (id) => {
  const role = await Role.findById(id).populate(
    "permissions"
  );

  if (!role) {
    throw new ApiError(404, "Role not found");
  }

  return role;
};

const updateRole = async (id, payload) => {
  const role = await Role.findByIdAndUpdate(
    id,
    payload,
    {
      new: true,
      runValidators: true,
    }
  ).populate("permissions");

  if (!role) {
    throw new ApiError(404, "Role not found");
  }

  return role;
};

const deleteRole = async (id) => {
  const role = await Role.findById(id);

  if (!role) {
    throw new ApiError(404, "Role not found");
  }

  if (role.isSystem) {
    throw new ApiError(
      403,
      "System roles cannot be deleted"
    );
  }

  await role.deleteOne();
};

const assignPermissions = async (
  roleId,
  permissionIds
) => {
  const role = await Role.findById(roleId);

  if (!role) {
    throw new ApiError(404, "Role not found");
  }

  const permissions = await Permission.find({
    _id: {
      $in: permissionIds,
    },
  });

  role.permissions = permissions.map((p) => p._id);

  await role.save();

  return Role.findById(roleId).populate(
    "permissions"
  );
};
module.exports = {
  seedRoles,
  getRoleByName,
  createRole,
  getRoles,
  getRoleById,
  updateRole,
  deleteRole,
  assignPermissions,
};