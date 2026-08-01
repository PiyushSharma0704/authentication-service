const ApiError = require("../utils/ApiError");

const authorize = (...permissions) => {
  return (req, res, next) => {
    if (!req.user) {
      return next(new ApiError(401, "Authentication required"));
    }

    const userPermissions = req.user.role.permissions.map(
      (permission) => permission.name,
    );

    const hasPermission = permissions.every((permission) =>
      userPermissions.includes(permission),
    );

    if (!hasPermission) {
      return next(
        new ApiError(403, "You don't have permission to perform this action"),
      );
    }

    next();
  };
};

module.exports = authorize;
