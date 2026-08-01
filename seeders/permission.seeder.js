const { seedPermissions } = require("../src/services/permission.service");

const permissionSeeder = async () => {
  console.log("Seeding permissions...");

  await seedPermissions();

  console.log("Permissions seeded.");
};

module.exports = permissionSeeder;
