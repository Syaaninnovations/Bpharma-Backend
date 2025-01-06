const Joi = require('joi');
// Define the schema
const distributorSaveSchema = Joi.object({
  distributor_name: Joi.string().required(),
  distributor_code: Joi.string().allow(null, ''),
  distributor_district_id: Joi.number().integer().allow(null, ''),
  is_active: Joi.boolean().default(false),
  address_1: Joi.string().required(),
  address_2: Joi.string().allow(null, ''),
  distr_phone_number: Joi.string().required(),
  distr_email: Joi.string().email().required(),
  emp_id: Joi.number().integer().required(),
});

// Centralized validation function
function validate(data, schema) {
    const { error } = schema.validate(data, { abortEarly: false });
    if (!error) return null;
  
    // Format errors for toastr
    return error.details.map((err) => ({ field: err.path[0], message: err.message  }));
  }

module.exports = { validate, distributorSaveSchema};
