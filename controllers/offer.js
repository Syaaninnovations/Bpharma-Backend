require('dotenv').config();
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const { Offer } = require('../models/offer');
const { Product } = require('../models/product');
const { Employee } = require('../models/employee');
const { Status } = require('../models/status');
const Helper = require('../utils/helper');
const {validate, offerValidationSchema } = require("../validation/offerValidation");

const insertOffer = async (request, response) => {
  var validationData = validate(request.body,offerValidationSchema);
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
  const statusExist = await Status.findOne({ where: { status_id: request.body.status_id,is_active:0} });
  if (!statusExist){
      return response.status(400).send({ status : 'ERROR', error: {  message: 'Status Not Found' }});
  }
  try {
      const offer = await Offer.create({
        requested_emp_id: request.body.requested_emp_id,
        created_by: request.user.userid,
        created_on: new Date(),
        requested_date: request.body.requested_date,
        product_id: request.body.product_id,
        customer_name: request.body.customer_name,
        customer_location: request.body.customer_location,        
        qty: request.body.qty,
        offer_qty: request.body.offer_qty,
        status_id: request.body.status_id,        
      });
      response.status(201).send({ status: 'SUCCESS', data: offer });
    } catch (err) {
      response.status(500).send({ status: 'ERROR', error: err.message });
    }
};

const updateOffer = async (request, response) => {
  var validationData = validate(request.body,offerValidationSchema);
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
  const statusExist = await Status.findOne({ where: { status_id: request.body.status_id,is_active:0} });
  if (!statusExist){
      return response.status(400).send({ status : 'ERROR', error: {  message: 'Status Not Found' }});
  }
    const offer = await Offer.findByPk(request.params.id);
    if (!offer) return response.status(404).send({ status: 'ERROR', error:{  message: 'Offer Not Found' } });

    await offer.update({
      requested_emp_id: request.body.requested_emp_id,
      requested_date: request.body.requested_date,
      product_id: request.body.product_id,
      customer_name: request.body.customer_name,
      customer_location: request.body.customer_location,        
      qty: request.body.qty,
      offer_qty: request.body.offer_qty,
      status_id: request.body.status_id,   
      updated_by: request.user.userid,
      updated_on: new Date(),
    });

    response.status(200).send({ status: 'SUCCESS', data: offer });
  } catch (err) {
    response.status(500).send({ status: 'ERROR', error: err.message });
  }
};

const viewOffer = async (req, res) => {
  try {
    const offer = await Offer.findByPk(req.params.id, {
     
      include: [
        
        { model: Employee, attributes: ['emp_id','display_name','emp_code','phone_num','email_id'] },
        { model: Product, attributes: ['product_id','product_name','product_code','batch_no','near_expiry','packing'] },
        { model: Status, as: 'status', attributes: ['status_id','status_name'] },
    ],
  });
    if (!offer) {
      return res.status(404).json({ status: 'ERROR', message: 'Offer not found' });
    }
    res.status(200).send({ status: 'SUCCESS', data: offer });
  } catch (err) {
    res.status(500).send({ status: 'ERROR', error: err.message });
  }
};

const listOffers = async (req, res) => {
  try {
      const { page = 1, limit = 10, search = '', sortBy = 'created_on', sortOrder = 'DESC', status } = req.query;

      const filters = {};
      if (status) filters.status = status;

      const offers = await Offer.findAndCountAll({
          where: {
              ...filters,
              [Op.or]: [
                  { customer_name: { [Op.like]: `%${search}%` } },
                  { customer_location: { [Op.like]: `%${search}%` } },
              ],
          },
          include: [
            { model: Employee, attributes: ['emp_id','display_name','emp_code','phone_num','email_id'] },
            { model: Product, attributes: ['product_id','product_name','product_code','batch_no','near_expiry','packing'] },
            { model: Status, as: 'status', attributes: ['status_id','status_name'] },
          ],
          order: [[sortBy, sortOrder]],
          limit: parseInt(limit),
          offset: (parseInt(page) - 1) * parseInt(limit),
      });

      res.status(200).json({
          status: 'SUCCESS',
          data: offers.rows,
          pagination: {
              total: offers.count,
              page: parseInt(page),
              limit: parseInt(limit),
          },
      });
  } catch (err) {
      console.error('Error listing offers:', err);
      res.status(500).json({ status: 'ERROR', message: 'An unexpected error occurred' });
  }
};

module.exports = { insertOffer, updateOffer, viewOffer, listOffers};