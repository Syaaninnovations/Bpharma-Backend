require('dotenv').config();
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const { SampleRequest } = require('../models/sample');
const { Product } = require('../models/product');
const { Employee } = require('../models/employee');
const Helper = require('../utils/helper');
const {validate, sampleRequestValidationSchema } = require("../validation/sampleRequestValidation");

const insertSampleRequest = async (request, response) => {
  var validationData = validate(request.body,sampleRequestValidationSchema);
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
      const sample = await SampleRequest.create({
        product_id: request.body.product_id,
        requested_emp_id: request.body.requested_emp_id,
        total_qty: request.body.total_qty,
        remarks: request.body.remarks,
        status: request.body.status,
        requested_date: request.body.requested_date,
        customer_name: request.body.customer_name,
        created_by: request.user.userid,
        created_on: new Date(),
      });
      response.status(201).send({ status: 'SUCCESS', data: sample });
    } catch (err) {
      response.status(500).send({ status: 'ERROR', error: err.message });
    }
};

const updateSampleRequest = async (request, response) => {
  var validationData = validate(request.body,sampleRequestValidationSchema);
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
    const sample = await SampleRequest.findByPk(request.params.id);
    if (!sample) return response.status(404).send({ status: 'ERROR', error:{  message: 'Sample Request Not Found' } });

    await sample.update({
      product_id: request.body.product_id,
      requested_emp_id: request.body.requested_emp_id,
      total_qty: request.body.total_qty,
      remarks: request.body.remarks,
      status: request.body.status,
      requested_date: request.body.requested_date,
      customer_name: request.body.customer_name,
      updated_by: request.user.userid,
      updated_on: new Date(),
    });

    response.status(200).send({ status: 'SUCCESS', data: sample });
  } catch (err) {
    response.status(500).send({ status: 'ERROR', error: err.message });
  }
};

const viewSampleRequest = async (req, res) => {
  try {
    const  sample_req_id  = req.params.id;
    const sample = await SampleRequest.findOne({
        where: { sample_req_id : sample_req_id },
        include: [
            { model: Product, attributes: ['product_id','product_name', 'product_code'] },
            { model: Employee, attributes: ['emp_id','display_name', 'emp_code'] },
        ],
    });
    if (!sample) {
      return res.status(404).json({ status: 'ERROR', message: 'Sample request not found' });
    }
    res.status(200).send({ status: 'SUCCESS', data: sample });
  } catch (err) {
    res.status(500).send({ status: 'ERROR', error: err.message });
  }
};

const listSampleRequest = async (req, res) => {
  try {
      const { page = 1, limit = 10, search = '', sortBy = 'created_on', sortOrder = 'DESC', status } = req.query;

      const filters = {};
      if (status) filters.status = status;

      const sampleRequest = await SampleRequest.findAndCountAll({
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
          data: sampleRequest.rows,
          pagination: {
              total: sampleRequest.count,
              page: parseInt(page),
              limit: parseInt(limit),
          },
      });
  } catch (error) {
      console.error('Error fetching sample requests:', error); // Log the full error
      res.status(500).json({ status: 'ERROR', message: error.message || 'An unexpected error occurred' });
  }
};




module.exports = { insertSampleRequest, updateSampleRequest, viewSampleRequest, listSampleRequest};