const express = require("express");

const router = express.Router();

router.get("/health", (req, res) => {
  res.json({
    success: true,
    message: "Authentication Service Running",
  });
});

module.exports = router;