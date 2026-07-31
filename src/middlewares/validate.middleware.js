const { ZodError } = require("zod");

const validate = (schema) => {
  return (req, res, next) => {
    try {
      const parsed = schema.parse({
        body: req.body,
        params: req.params,
        query: req.query,
      });

      req.body = parsed.body;
      req.params = parsed.params;
      req.query = parsed.query;

      next();
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          success: false,
          message: "Validation Failed",
          errors: error.issues.map((issue) => ({
            field: issue.path.at(-1), // or issue.path.at(-1)
            message: issue.message,
          })),
        });
      }

      next(error);
    }
  };
};

module.exports = validate;
