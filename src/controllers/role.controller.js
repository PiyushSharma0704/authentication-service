const catchAsync = require("../utils/catchAsync");
const ApiResponse = require("../utils/ApiResponse");

const roleService = require("../services/role.service");

const createRole = catchAsync(async (req, res) => {
  const role = await roleService.createRole(req.body);

  return res
    .status(201)
    .json(new ApiResponse(201, "Role created successfully", role));
});

const getRoles = catchAsync(async (req, res) => {
  const roles = await roleService.getRoles();

  return res
    .status(200)
    .json(new ApiResponse(200, "Roles fetched successfully", roles));
});

const getRoleById = catchAsync(async (req, res) => {
  const role = await roleService.getRoleById(req.params.id);

  return res
    .status(200)
    .json(new ApiResponse(200, "Role fetched successfully", role));
});

const updateRole = catchAsync(async (req, res) => {
  const role = await roleService.updateRole(req.params.id, req.body);

  return res
    .status(200)
    .json(new ApiResponse(200, "Role updated successfully", role));
});

const deleteRole = catchAsync(async (req, res) => {
  await roleService.deleteRole(req.params.id);

  return res
    .status(200)
    .json(new ApiResponse(200, "Role deleted successfully"));
});

const assignPermissions = catchAsync(async (req, res) => {
  const role = await roleService.assignPermissions(
    req.params.id,
    req.body.permissionIds
  );

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        "Permissions assigned successfully",
        role
      )
    );
});

module.exports = {
  createRole,
  getRoles,
  getRoleById,
  updateRole,
  deleteRole,
  assignPermissions,
};