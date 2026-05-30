import { body, validationResult } from "express-validator";

const validate = (req, res, next) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    return next();
  }

  return res.status(400).json({
    errors: errors.array(),
  });
};

export const registerValidation = [
  body("email").isEmail().withMessage("Invalid email format"),

  body("password")
    .custom((value) => {
      if (value.length < 8) {
        throw new Error("Password must be at least 8 characters long");
      }
      const passwardRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      if (!passwardRegex.test(value)) {
        throw new Error(
          "Password should contain at least one uppercase letter and one number",
        );
      }
      return true;
    })
    .withMessage(
      "password should be at least 6 character long and contain at least one uppercase letter and one number",
    ),

  body("username").notEmpty().withMessage("Username is required"),

  validate,
];
