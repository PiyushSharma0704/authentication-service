const express = require("express");

const router = express.Router();

const authMiddleware = require("../middlewares/auth.middleware");
const authorize = require("../middlewares/authorize.middleware");
const validate = require("../middlewares/validate.middleware");

const userController = require("../controllers/user.controller");

const {
  createUserSchema,
  updateUserSchema,
} = require("../validators/user.validator");

router.post(
  "/",
  authMiddleware,
  authorize("USER_CREATE"),
  validate(createUserSchema),
  userController.createUser,
);

router.get(
  "/",
  authMiddleware,
  authorize("USER_READ"),
  userController.getUsers,
);

router.get(
  "/:id",
  authMiddleware,
  authorize("USER_READ"),
  userController.getUserById,
);

router.patch(
  "/:id",
  authMiddleware,
  authorize("USER_UPDATE"),
  validate(updateUserSchema),
  userController.updateUser,
);

router.delete(
  "/:id",
  authMiddleware,
  authorize("USER_DELETE"),
  userController.deleteUser,
);

module.exports = router;
