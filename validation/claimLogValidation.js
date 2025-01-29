const Joi = require('joi');
// Define the schema
const claimLogValidationSchema = Joi.object({
  claim_id: Joi.number().required(),
  product_id: Joi.number().required(),
  free_qty: Joi.number().integer().min(0).default(0).required(),
  total_qty: Joi.number().integer().min(0).default(0).required(),
  remarks: Joi.string().required(),
  status_id: Joi.number().required(),
  requested_date: Joi.date().required(),
});

// Centralized validation function
function validate(data, schema) {
    const { error } = schema.validate(data, { abortEarly: false });
    if (!error) return null;
  
    // Format errors for toastr
    return error.details.map((err) => ({ field: err.path[0], message: err.message  }));
  }

module.exports = { validate, claimLogValidationSchema};
