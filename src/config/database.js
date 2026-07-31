const mongoose = require("mongoose");
const { env } = require("./env");
const logger = require("../utils/logger");

const connectDatabase = async () => {
  try {
    await mongoose.connect(env.MONGODB_URI);
    logger.info("Database connected");
  } catch (error) {
    logger.error(error);
    process.exit(1);
  }
};

module.exports = {
  connectDatabase,
};