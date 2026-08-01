const express = require("express");

const router = express.Router();

const authRoutes = require("./auth.routes");
const userRoutes = require("./user.routes");
const roleRoutes = require("./role.routes");
const permissionRoutes = require("./permission.routes");

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/roles", roleRoutes);
router.use("/permissions", permissionRoutes);

router.get("/health", (req, res) => {
  res.json({
    success: true,
    message: "Authentication Service Running",
  });
});

module.exports = router;