require('dotenv').config();
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const { Expiry } = require('../models/expiry');
const { Product } = require('../models/product');
const { Employee } = require('../models/employee');
const Helper = require('../utils/helper');
const {validate, expiryValidationSchema } = require("../validation/expiryValidation");

const insertExpiry = async (request, response) => {
  var validationData = validate(request.body,expiryValidationSchema);
  if (Array.isArray(validationData) && validationData.length > 0) {
    const errorDetails = validationData.map(err => ({field: err.field,message: err.message}));
    return response.status(400).send({status: 'ERROR',error: {message: 'Validation failed',details: errorDetails}});
  }
  const productExist = await Product.findOne({ where: { product_id: request.body.product_id,is_active:0} });
  if (!productExist){
      return response.status(400).send({ status : 'ERROR', error: {  message: 'Product Not Found' }});
  } 

  const employeeExist = await Employee.findOne({ where: { emp_id: request.body.requested_emp_id,is_active:0} });
  if (!employeeExist){
      return response.status(400).send({ status : 'ERROR', error: {  message: 'Employee Not Found' }});
  } 
  try {
      const expiry = await Expiry.create({
        product_id: request.body.product_id,
        requested_emp_id: request.body.requested_emp_id,
        total_qty: request.body.total_qty,
        remarks: request.body.remarks,
        status: request.body.status,
        expairy_req_date: request.body.expairy_req_date,
        customer_name: request.body.customer_name,
        created_by: request.user.userid,
        created_on: new Date(),
      });
      response.status(201).send({ status: 'SUCCESS', data: expiry });
    } catch (err) {
      response.status(500).send({ status: 'ERROR', error: err.message });
    }
};

// Update Role
const updateExpiry = async (request, response) => {
  var validationData = validate(request.body,expiryValidationSchema);
  if (Array.isArray(validationData) && validationData.length > 0) {
    const errorDetails = validationData.map(err => ({field: err.field,message: err.message}));
    return response.status(400).send({status: 'ERROR',error: {message: 'Validation failed',details: errorDetails}});
  }

  try {
    const productExist = await Product.findOne({ where: { product_id: request.body.product_id,is_active:0} });
    if (!productExist){
        return response.status(400).send({ status : 'ERROR', error: {  message: 'Product Not Found' }});
    } 

    const employeeExist = await Employee.findOne({ where: { emp_id: request.body.requested_emp_id,is_active:0} });
    if (!employeeExist){
        return response.status(400).send({ status : 'ERROR', error: {  message: 'Employee Not Found' }});
    } 
    const expiry = await Expiry.findByPk(request.params.id);
    if (!expiry) return response.status(404).send({ status: 'ERROR', error:{  message: 'Expiry Not Found' } });

    await expiry.update({
      product_id: request.body.product_id,
      requested_emp_id: request.body.requested_emp_id,
      total_qty: request.body.total_qty,
      remarks: request.body.remarks,
      status: request.body.status,
      expairy_req_date: request.body.expairy_req_date,
      customer_name: request.body.customer_name,
      updated_by: request.user.userid,
      updated_on: new Date(),
    });

    response.status(200).send({ status: 'SUCCESS', data: expiry });
  } catch (err) {
    response.status(500).send({ status: 'ERROR', error: err.message });
  }
};

const viewExpiry = async (req, res) => {
  try {
    const  expairy_req_id  = req.params.id;
    const expiry = await Expiry.findOne({
        where: { expairy_req_id : expairy_req_id },
        include: [
            { model: Product, attributes: ['product_id','product_name', 'product_code'] },
            { model: Employee, attributes: ['emp_id','display_name', 'emp_code'] },
        ],
    });
    if (!expiry) {
      return res.status(404).json({ status: 'ERROR', message: 'Expiry request not found' });
    }
    res.status(200).send({ status: 'SUCCESS', data: expiry });
  } catch (err) {
    res.status(500).send({ status: 'ERROR', error: err.message });
  }
};

const listExpiry = async (req, res) => {
  try {
      const { page = 1, limit = 10, search = '', sortBy = 'created_on', sortOrder = 'DESC', status } = req.query;

      const filters = {};
      if (status) filters.status = status;

      const expiries = await Expiry.findAndCountAll({
          where: {
              ...filters,
              [Op.or]: [
                  { '$product.product_name$': { [Op.like]: `%${search}%` } },
                  { '$employee.display_name$': { [Op.like]: `%${search}%` } },
                  { remarks: { [Op.like]: `%${search}%` } },
              ],
          },
          include: [
              { model: Product, attributes: ['product_id','product_name', 'product_code'], as: 'product' },
              { model: Employee, attributes: ['emp_id','display_name', 'emp_code'], as: 'employee' },
          ],
          order: [[sortBy, sortOrder]],
          limit: parseInt(limit),
          offset: (parseInt(page) - 1) * parseInt(limit),
      });

      res.status(200).json({
          status: 'SUCCESS',
          data: expiries.rows,
          pagination: {
              total: expiries.count,
              page: parseInt(page),
              limit: parseInt(limit),
          },
      });
  } catch (error) {
      console.error('Error fetching expiry requests:', error); // Log the full error
      res.status(500).json({ status: 'ERROR', message: error.message || 'An unexpected error occurred' });
  }
};




module.exports = { insertExpiry, updateExpiry, viewExpiry, listExpiry};