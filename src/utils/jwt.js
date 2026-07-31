const jwt = require("jsonwebtoken");
const { env } = require("../config/env");

const generateAccessToken = (payload) => {
  return jwt.sign(payload, env.JWT_SECRET, {
    expiresIn: env.JWT_EXPIRES_IN,
  });
};

const generateRefreshToken = (payload) => {
  return jwt.sign(payload, env.REFRESH_SECRET, {
    expiresIn: env.REFRESH_EXPIRES_IN,
  });
};

const verifyAccessToken = (token) => {
  return jwt.verify(token, env.JWT_SECRET);
};

const verifyRefreshToken = (token) => {
  return jwt.verify(token, env.REFRESH_SECRET);
};

const decodeToken = (token) => jwt.decode(token);

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
};
