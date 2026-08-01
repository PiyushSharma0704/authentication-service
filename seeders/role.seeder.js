const { seedRoles } = require("../src/services/role.service");

const roleSeeder = async () => {
  console.log("Seeding roles...");

  await seedRoles();

  console.log("Roles seeded.");
};

module.exports = roleSeeder;
