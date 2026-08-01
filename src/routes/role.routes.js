const express = require("express");

const router = express.Router();

const authMiddleware = require("../middlewares/auth.middleware");
const authorize = require("../middlewares/authorize.middleware");
const validate = require("../middlewares/validate.middleware");

const roleController = require("../controllers/role.controller");

const {
  createRoleSchema,
  updateRoleSchema,
  assignPermissionsSchema,
} = require("../validators/role.validator");

router.post(
  "/",
  authMiddleware,
  authorize("ROLE_CREATE"),
  validate(createRoleSchema),
  roleController.createRole
);

router.get(
  "/",
  authMiddleware,
  authorize("ROLE_READ"),
  roleController.getRoles
);

router.get(
  "/:id",
  authMiddleware,
  authorize("ROLE_READ"),
  roleController.getRoleById
);

router.patch(
  "/:id",
  authMiddleware,
  authorize("ROLE_UPDATE"),
  validate(updateRoleSchema),
  roleController.updateRole
);

router.patch(
  "/:id/permissions",
  authMiddleware,
  authorize("ROLE_UPDATE"),
  validate(assignPermissionsSchema),
  roleController.assignPermissions
);

router.delete(
  "/:id",
  authMiddleware,
  authorize("ROLE_DELETE"),
  roleController.deleteRole
);

module.exports = router;