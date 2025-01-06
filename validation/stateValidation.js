const Joi = require('joi');
// Define the schema
const stateSaveSchema = Joi.object({
  state_code: Joi.string().required(),
  state_name: Joi.string().required(),
  country_id: Joi.number().integer().required(),
});

// Centralized validation function
function validate(data, schema) {
    const { error } = schema.validate(data, { abortEarly: false });
    if (!error) return null;
  
    // Format errors for toastr
    return error.details.map((err) => ({ field: err.path[0], message: err.message  }));
  }

module.exports = { validate, stateSaveSchema};
