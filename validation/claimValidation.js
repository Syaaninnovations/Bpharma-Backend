const Joi = require('joi');
// Define the schema
const claimValidationSchema = Joi.object({
  requested_emp_id: Joi.number().required(),
  distributor_id: Joi.number().required(),
  requested_date: Joi.date().required(),
});

// Centralized validation function
function validate(data, schema) {
    const { error } = schema.validate(data, { abortEarly: false });
    if (!error) return null;
  
    // Format errors for toastr
    return error.details.map((err) => ({ field: err.path[0], message: err.message  }));
  }

module.exports = { validate, claimValidationSchema};
