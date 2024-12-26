const Joi = require('joi');

// Define the schema
const loginSchema = Joi.object({
    emp_code: Joi.string()
    .required()
    .messages({
      'any.required': 'Employee Code is required.',
    }),

    user_password: Joi.string()
    .required()
    .messages({
      'any.required': 'Password is required.',
    }),
});

// Centralized validation function
function validate(data, schema) {
    const { error } = schema.validate(data, { abortEarly: false });
    if (!error) return null;
  
    // Format errors for toastr
    return error.details.map((err) => ({ field: err.path[0], message: err.message  }));
  }

module.exports = { validate, loginSchema};
