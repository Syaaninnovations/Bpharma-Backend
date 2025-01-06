require('dotenv').config();
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const { Product } = require('../models/product');
const Helper = require('../utils/helper');
const {validate, productValidationSchema } = require("../validation/productValidation");

const insertProduct = async (request, response) => {
  var validationData = validate(request.body,productValidationSchema);
  if (Array.isArray(validationData) && validationData.length > 0) {
    const errorDetails = validationData.map(err => ({field: err.field,message: err.message}));
    return response.status(400).send({status: 'ERROR',error: {message: 'Validation failed',details: errorDetails}});
  }
   
  try {
      const product = await Product.create({
        product_name: request.body.product_name,
        product_code: request.body.product_code,
        is_active: request.body.is_active,
        batch_no: request.body.batch_no,
        near_expiry: request.body.near_expiry,
        packing: request.body.packing,
        created_by: request.user.userid,
        created_on: new Date(),
      });
      response.status(201).send({ status: 'SUCCESS', data: product });
    } catch (err) {
      response.status(500).send({ status: 'ERROR', error: err.message });
    }
};

const updateProduct = async (request, response) => {
  var validationData = validate(request.body,productValidationSchema);
  if (Array.isArray(validationData) && validationData.length > 0) {
    const errorDetails = validationData.map(err => ({field: err.field,message: err.message}));
    return response.status(400).send({status: 'ERROR',error: {message: 'Validation failed',details: errorDetails}});
  }

  try {
    const product = await Product.findOne({ where: { product_id: request.params.id,is_active:0 } });
    if (!product) return response.status(404).send({ status: 'ERROR', error:{  message: 'Product Not Found' } });

    await product.update({
      product_name: request.body.product_name,
      product_code: request.body.product_code,
      is_active: request.body.is_active,
      batch_no: request.body.batch_no,
      near_expiry: request.body.near_expiry,
      packing: request.body.packing,
      updated_by: request.user.userid,
      updated_on: new Date(),
    });

    response.status(200).send({ status: 'SUCCESS', data: product });
  } catch (err) {
    response.status(500).send({ status: 'ERROR', error: err.message });
  }
};

const viewProduct = async (req, res) => {
  try {
    const product = await Product.findOne({ where: { product_id: req.params.id,is_active:0 } });
    if (!product) return res.status(404).send({ status: 'ERROR', error: 'Product not found' });
    res.status(200).send({ status: 'SUCCESS', data: product });
  } catch (err) {
    res.status(500).send({ status: 'ERROR', error: err.message });
  }
};

const listProducts = async (req, res) => {
  try {
      const { page = 1, limit = 10, search = '', sortBy = 'created_on', sortOrder = 'DESC', is_active } = req.query;

      const filters = {};
      if (is_active) filters.is_active = is_active;

      const products = await Product.findAndCountAll({
          where: {
              ...filters,
              [Op.or]: [
                  { product_name: { [Op.like]: `%${search}%` } },
                  { product_code: { [Op.like]: `%${search}%` } },
              ],
          },
          order: [[sortBy, sortOrder]],
          limit: parseInt(limit),
          offset: (parseInt(page) - 1) * parseInt(limit),
      });

      res.status(200).json({
          status: 'SUCCESS',
          data: products.rows,
          pagination: {
              total: products.count,
              page: parseInt(page),
              limit: parseInt(limit),
          },
      });
  } catch (error) {
      res.status(500).json({ status: 'ERROR', message: 'An unexpected error occurred' });
  }
};

module.exports = { insertProduct, updateProduct, viewProduct, listProducts};