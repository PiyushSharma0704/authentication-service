const catchAsync = require("../utils/catchAsync");
const ApiResponse = require("../utils/ApiResponse");

const permissionService = require("../services/permission.service");

const createPermission = catchAsync(async (req, res) => {
  const permission = await permissionService.createPermission(req.body);

  return res
    .status(201)
    .json(
      new ApiResponse(
        201,
        "Permission created successfully",
        permission
      )
    );
});

const getPermissions = catchAsync(async (req, res) => {
  const permissions = await permissionService.getPermissions();

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        "Permissions fetched successfully",
        permissions
      )
    );
});

const getPermissionById = catchAsync(async (req, res) => {
  const permission = await permissionService.getPermissionById(
    req.params.id
  );

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        "Permission fetched successfully",
        permission
      )
    );
});

const updatePermission = catchAsync(async (req, res) => {
  const permission = await permissionService.updatePermission(
    req.params.id,
    req.body
  );

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        "Permission updated successfully",
        permission
      )
    );
});

const deletePermission = catchAsync(async (req, res) => {
  await permissionService.deletePermission(req.params.id);

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        "Permission deleted successfully"
      )
    );
});

module.exports = {
  createPermission,
  getPermissions,
  getPermissionById,
  updatePermission,
  deletePermission,
};