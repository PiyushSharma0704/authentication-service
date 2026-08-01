const express = require("express");

const router = express.Router();

const authMiddleware = require("../middlewares/auth.middleware");
const authorize = require("../middlewares/authorize.middleware");
const validate = require("../middlewares/validate.middleware");

const permissionController = require("../controllers/permission.controller");

const {
  createPermissionSchema,
  updatePermissionSchema,
} = require("../validators/permission.validator");

router.post(
  "/",
  authMiddleware,
  authorize("PERMISSION_CREATE"),
  validate(createPermissionSchema),
  permissionController.createPermission
);

router.get(
  "/",
  authMiddleware,
  authorize("PERMISSION_READ"),
  permissionController.getPermissions
);

router.get(
  "/:id",
  authMiddleware,
  authorize("PERMISSION_READ"),
  permissionController.getPermissionById
);

router.patch(
  "/:id",
  authMiddleware,
  authorize("PERMISSION_UPDATE"),
  validate(updatePermissionSchema),
  permissionController.updatePermission
);

router.delete(
  "/:id",
  authMiddleware,
  authorize("PERMISSION_DELETE"),
  permissionController.deletePermission
);

module.exports = router;