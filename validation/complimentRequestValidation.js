const Joi = require('joi');
// Define the schema
const complimentRequestSaveSchema = Joi.object({
  compliment_id : Joi.number().integer().required(),
  qty: Joi.number().integer().min(1).required(),
  remark: Joi.string().required(),
  emp_id : Joi.number().integer().required(),
  is_active: Joi.number().integer().min(0).max(1).default(0),
});

// Centralized validation function
function validate(data, schema) {
    const { error } = schema.validate(data, { abortEarly: false });
    if (!error) return null;
  
    // Format errors for toastr
    return error.details.map((err) => ({ field: err.path[0], message: err.message  }));
  }

module.exports = { validate, complimentRequestSaveSchema};
