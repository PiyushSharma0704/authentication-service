const { z } = require("zod");

const createPermissionSchema = z.object({
  body: z.object({
    name: z.string(),

    module: z.string(),

    description: z.string().optional(),
  }),
});

const updatePermissionSchema = z.object({
  body: z.object({
    description: z.string().optional(),
  }),
});

module.exports = {
  createPermissionSchema,
  updatePermissionSchema,
};