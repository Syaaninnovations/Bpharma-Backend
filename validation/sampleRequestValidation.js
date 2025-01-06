const Joi = require('joi');

const sampleRequestValidationSchema = Joi.object({
    product_id: Joi.number().required(),
    requested_emp_id: Joi.number().required(),
    total_qty: Joi.number().integer().min(1).required(),
    remarks: Joi.string().required(),
    status: Joi.string().required(),
    requested_date: Joi.date().required(),
    customer_name: Joi.string().required(),
});

// Centralized validation function
function validate(data, schema) {
    const { error } = schema.validate(data, { abortEarly: false });
    if (!error) return null;
  
    // Format errors for toastr
    return error.details.map((err) => ({ field: err.path[0], message: err.message  }));
  }

module.exports = { validate, sampleRequestValidationSchema};