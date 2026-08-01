const { z } = require("zod");

const createUserSchema = z.object({
  body: z.object({
    name: z.string().min(2).max(100),

    email: z.string().email(),

    password: z.string().min(8),

    roleId: z.string(),
  }),
});

const updateUserSchema = z.object({
  body: z.object({
    name: z.string().min(2).max(100).optional(),

    roleId: z.string().optional(),

    isActive: z.boolean().optional(),
  }),
});

module.exports = {
  createUserSchema,
  updateUserSchema,
};