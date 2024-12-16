const sanitize = require("mongo-sanitize");

// Middleware to sanitize inputs
const sanitizeRequest = (req, res, next) => {
  try {
    // Sanitize request body
    if (req.body) req.body = sanitize(req.body);

    // Sanitize request query
    if (req.query) req.query = sanitize(req.query);

    // Sanitize request params
    if (req.params) req.params = sanitize(req.params);

    next(); // Proceed to the next middleware/controller
  } catch (error) {
    console.error("Error sanitizing request:", error.message);
    return res.status(500).json({ error: "Server Error: Input sanitization failed" });
  }
};

module.exports = sanitizeRequest;
