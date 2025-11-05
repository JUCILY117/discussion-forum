export const validate = (schema, source = "body") => (req, res, next) => {
  try {
    if (source === "body") {
      req.body = schema.parse(req.body);
    } else if (source === "params") {
      req.params = schema.parse(req.params);
    } else if (source === "query") {
      req.query = schema.parse(req.query);
    }
    next();
  } catch (err) {
    return res.status(400).json({
      errors: err.issues.map(e => ({
        field: e.path.join('.'),
        message: e.message,
      }))
    });
  }
};
