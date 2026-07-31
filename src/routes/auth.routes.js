const express = require("express");

const router = express.Router();

const authController = require("../controllers/auth.controller");

const validate = require("../middlewares/validate.middleware");
const authMiddleware = require("../middlewares/auth.middleware");

const {
  registerSchema,
  loginSchema,
  refreshTokenSchema,
} = require("../validators/auth.validator");

router.post("/register", validate(registerSchema), authController.register);

router.post("/login", validate(loginSchema), authController.login);

router.post(
  "/refresh-token",
  validate(refreshTokenSchema),
  authController.refreshToken,
);

router.get("/me", authMiddleware, authController.getCurrentUser);

module.exports = router;
