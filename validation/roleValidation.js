const Joi = require('joi');

// Define the schema
const roleSaveSchema = Joi.object({
  role_name: Joi.string().min(3).max(255).required(),
  is_active: Joi.number().integer().min(0).max(1).default(0),
});

// Centralized validation function
function validate(data, schema) {
    const { error } = schema.validate(data, { abortEarly: false });
    if (!error) return null;
  
    // Format errors for toastr
    return error.details.map((err) => ({ field: err.path[0], message: err.message  }));
  }

module.exports = { validate, roleSaveSchema};
