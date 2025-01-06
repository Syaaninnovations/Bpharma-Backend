const Joi = require('joi');

const expiryValidationSchema = Joi.object({
    product_id: Joi.number().integer().required(),
    requested_emp_id: Joi.number().integer().required(),
    total_qty: Joi.number().integer().min(1).required(),
    remarks: Joi.string().required(),
    status: Joi.string().required(),
    expairy_req_date: Joi.date().required(),
    customer_name: Joi.string().required(),
});


// Centralized validation function
function validate(data, schema) {
    const { error } = schema.validate(data, { abortEarly: false });
    if (!error) return null;
  
    // Format errors for toastr
    return error.details.map((err) => ({ field: err.path[0], message: err.message  }));
  }

module.exports = { validate, expiryValidationSchema};
