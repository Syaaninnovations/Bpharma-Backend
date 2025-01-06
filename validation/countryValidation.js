const Joi = require('joi');
// Define the schema
const countrySaveSchema = Joi.object({
  country_code: Joi.string().required(),
  country_name: Joi.string().min(3).max(255).required(),
});

// Centralized validation function
function validate(data, schema) {
    const { error } = schema.validate(data, { abortEarly: false });
    if (!error) return null;
  
    // Format errors for toastr
    return error.details.map((err) => ({ field: err.path[0], message: err.message  }));
  }

module.exports = { validate, countrySaveSchema};
