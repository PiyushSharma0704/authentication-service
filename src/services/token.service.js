const { generateAccessToken, generateRefreshToken } = require("../utils/jwt");
const RefreshToken = require("../models/RefreshToken.mongoose.model");

const createTokenPair = async (user) => {
  const payload = {
    id: user._id,
    email: user.email,
    role: user.role,
  };

  const accessToken = generateAccessToken(payload);

  const refreshToken = generateRefreshToken(payload);

  const expiresAt = new Date(
    Date.now() + 7 * 24 * 60 * 60 * 1000
  );

  await RefreshToken.create({
    user: user._id,
    token: refreshToken,
    expiresAt,
  });

  return {
    accessToken,
    refreshToken,
  };
};

const rotateRefreshToken = async (token) => {
  const decoded = verifyRefreshToken(token);

  const storedToken = await RefreshToken.findOne({
    token,
  });

  if (!storedToken) {
    throw new Error("Refresh token not found");
  }

  await RefreshToken.deleteOne({
    _id: storedToken._id,
  });

  const payload = {
    id: decoded.id,
    email: decoded.email,
    role: decoded.role,
  };

  const accessToken = generateAccessToken(payload);

  const refreshToken = generateRefreshToken(payload);

  const expiresAt = new Date(
    Date.now() + 7 * 24 * 60 * 60 * 1000
  );

  await RefreshToken.create({
    user: decoded.id,
    token: refreshToken,
    expiresAt,
  });

  return {
    accessToken,
    refreshToken,
  };
};

const revokeRefreshToken = async (token) => {
  await RefreshToken.deleteOne({
    token,
  });
};

module.exports = {
  createTokenPair,
  rotateRefreshToken,
  revokeRefreshToken,
};
