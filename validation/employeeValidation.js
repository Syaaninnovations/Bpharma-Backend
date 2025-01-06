const Joi = require('joi');

// Employee Validation Schema
const employeeValidationSchema = Joi.object({
    display_name: Joi.string().required(),
    emp_code: Joi.string().required(),
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    phone_num: Joi.string().required(),
    email_id: Joi.string().email().required(),
    district_id: Joi.number().integer().required(),
    distributer_id: Joi.number().integer().required(),
    role_id: Joi.number().integer().required(),
    status_id: Joi.number().integer().allow(null, ''),
    is_active: Joi.number().integer().required(),
});

// Centralized validation function
function validate(data, schema) {
    const { error } = schema.validate(data, { abortEarly: false });
    if (!error) return null;

    // Format errors for toastr
    return error.details.map((err) => ({ field: err.path[0], message: err.message  }));
}

module.exports = { validate, employeeValidationSchema };
