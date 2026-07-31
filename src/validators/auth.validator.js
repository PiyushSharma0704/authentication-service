const { z } = require("zod");

const registerSchema = z.object({
  body: z.object({
    name: z
      .string({
        required_error: "Name is required",
      })
      .trim()
      .min(2, "Name must be at least 2 characters")
      .max(100),

    email: z
      .string({
        required_error: "Email is required",
      })
      .trim()
      .email("Invalid email address")
      .transform((email) => email.toLowerCase()),

    password: z
      .string({
        required_error: "Password is required",
      })
      .min(8, "Password must be at least 8 characters")
      .max(100)
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/,
        "Password must contain uppercase, lowercase, number and special character",
      ),
  }),
});

const loginSchema = z.object({
  body: z.object({
    email: z.string().email(),

    password: z.string().min(1),
  }),
});

const forgotPasswordSchema = z.object({
  body: z.object({
    email: z.string().email(),
  }),
});

const resetPasswordSchema = z.object({
  body: z.object({
    token: z.string(),

    password: z.string().min(8),
  }),
});

module.exports = {
  registerSchema,
  loginSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
};
