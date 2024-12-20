const { z } = require("zod");

// Define Zod schema
const userValidationSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Name is required" })
    .max(100, { message: "Name must not exceed 100 characters" }),
  email: z
    .string()
    .email({ message: "Invalid email format" }),
  phone: z
    .optional(
      z
        .string()
        .min(10, { message: "Phone number must be at least 10 characters long" })
        .max(15, { message: "Phone number must not exceed 15 characters" })
    ),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
});

// Usage example
const validateUserData = (data) => {
  try {
    userValidationSchema.parse(data);
    return { isValid: true, errors: null };
  } catch (error) {
    return { isValid: false, errors: error.errors };
  }
};

module.exports = {
  userValidationSchema,
  validateUserData,
};
