const { z } = require("zod");

const createRoleSchema = z.object({
  body: z.object({
    name: z.string().min(2),

    description: z.string().optional(),
  }),
});

const updateRoleSchema = z.object({
  body: z.object({
    name: z.string().optional(),

    description: z.string().optional(),
  }),
});

const assignPermissionsSchema = z.object({
  body: z.object({
    permissions: z.array(z.string()).min(1),
  }),
});

module.exports = {
  createRoleSchema,
  updateRoleSchema,
  assignPermissionsSchema,
};