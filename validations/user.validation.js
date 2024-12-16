const Joi = require("joi");

// Joi Validation Schema for User Input
const validateUser = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    email: Joi.string().email().required(),
    phone: Joi.string()
      .pattern(/^[0-9]+$/)
      .length(10)
      .messages({
        "string.pattern.base": "Phone number must contain only digits.",
        "string.length": "Phone number must be exactly 10 digits.",
      }),
    password: Joi.string()
      .min(6)
      .max(20)
      .required()
      .messages({
        "string.min": "Password must be at least 6 characters.",
        "string.max": "Password must be at most 20 characters.",
      }),
  });

  return schema.validate(data, { abortEarly: false }); // Return all errors
};

module.exports = validateUser;
