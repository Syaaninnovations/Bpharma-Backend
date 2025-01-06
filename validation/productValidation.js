const Joi = require('joi');
// Define the schema
const productValidationSchema = Joi.object({
  product_name: Joi.string().required(),
  product_code: Joi.string().required(),
  is_active: Joi.number().integer().min(0).max(1).default(0),
  batch_no: Joi.string().optional(),
  near_expiry: Joi.number().integer().min(0).max(1).optional(),
  packing: Joi.string().optional(),
});

// Centralized validation function
function validate(data, schema) {
    const { error } = schema.validate(data, { abortEarly: false });
    if (!error) return null;
  
    // Format errors for toastr
    return error.details.map((err) => ({ field: err.path[0], message: err.message  }));
  }

module.exports = { validate, productValidationSchema};
