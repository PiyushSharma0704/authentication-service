const permissionSeeder = require("../seeders/permission.seeder");
const roleSeeder = require("../seeders/role.seeder");
const app = require("./app");
const { connectDatabase } = require("./config/database");
const { env } = require("./config/env");
const bcrypt = require("bcrypt");


const startServer = async () => {
  try {
    await connectDatabase();
    // await permissionSeeder();
    // await roleSeeder();
    bcrypt.hash("SuperAdmin@123", 10).then(console.log);
    app.listen(env.PORT, () => {
      console.log(`🚀 Server running on http://localhost:${env.PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
