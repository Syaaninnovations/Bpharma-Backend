require('dotenv').config();
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const { Compliments } = require('../models/compliments');
const {validate, complimentSaveSchema } = require("../validation/complimentValidation");

const insertCompliment = async (request, response) => {
  var validationData = validate(request.body,complimentSaveSchema);
  if (Array.isArray(validationData) && validationData.length > 0) {
    const errorDetails = validationData.map(err => ({field: err.field,message: err.message}));
    return response.status(400).send({status: 'ERROR',error: {message: 'Validation failed',details: errorDetails}});
  }
 
  try {
      const compliment = await Compliments.create({
        compliments_name: request.body.compliments_name,
        is_active: request.body.is_active || 0,
        created_by: request.user.userid,
        created_on: new Date(),
      });
      response.status(201).send({ status: 'SUCCESS', data: compliment });
    } catch (err) {
      response.status(500).send({ status: 'ERROR', error: err.message });
    }
};

const updateCompliment = async (request, response) => {
  var validationData = validate(request.body,complimentSaveSchema);
  if (Array.isArray(validationData) && validationData.length > 0) {
    const errorDetails = validationData.map(err => ({field: err.field,message: err.message}));
    return response.status(400).send({status: 'ERROR',error: {message: 'Validation failed',details: errorDetails}});
  }

  try {
    const compliment = await Compliments.findOne({ where: { complimentsId: request.params.id,is_active:0 } });
    if (!compliment) return response.status(404).send({ status: 'ERROR', error:{  message: 'Compliments Not Found' } });

    await compliment.update({
      compliments_name: request.body.compliments_name,
      is_active: request.body.is_active,
      updated_by: request.user.userid,
      updated_on: new Date(),
    });

    response.status(200).send({ status: 'SUCCESS', data: compliment });
  } catch (err) {
    response.status(500).send({ status: 'ERROR', error: err.message });
  }
};

const getCompliment = async (req, res) => {
  try {
    const compliment = await Compliments.findOne({ where: { complimentsId: req.params.id,is_active:0 } });
    if (!compliment) return res.status(404).send({ status: 'ERROR', error: 'Compliment not found' });
    res.status(200).send({ status: 'SUCCESS', data: compliment });
  } catch (err) {
    res.status(500).send({ status: 'ERROR', error: err.message });
  }
};

const deleteCompliment= async (req, res) => {
  try {
    const compliment = await Compliments.findOne({ where: { complimentsId: req.params.id,is_active:0 } });
    if (!compliment) return res.status(404).send({ status: 'ERROR', error: 'Compliments not found' });
    await compliment.update({ is_active: 1, updated_by: req.user.userid, updated_on: new Date(),});

    res.status(200).send({ status: 'SUCCESS', message: 'Compliments deleted successfully' });
  } catch (err) {
    res.status(500).send({ status: 'ERROR', error: err.message });
  }
};

const listCompliment = async (req, res) => {
  try {
    const {page = 1,limit = 10,search = '',sortField = 'created_on',sortOrder = 'desc',is_active} = req.query;
    const offset = (page - 1) * limit;

    // Build filter conditions
    const where = {};
    if (search) {
      where.compliments_name = { [Op.like]: `%${search}%` };
    }
    if (is_active !== undefined) {
      where.is_active = is_active === '1';
    }

    // Query the database
    const compliments = await Compliments.findAndCountAll({
      where,
      order: [[sortField, sortOrder.toUpperCase()]],
      limit: parseInt(limit, 10),
      offset: parseInt(offset, 10),
    });

    // Respond with paginated data
    res.status(200).json({
      status: 'SUCCESS',
      data: {
        compliments: compliments.rows,
        total: compliments.count,
        page: parseInt(page, 10),
        totalPages: Math.ceil(compliments.count / limit),
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: 'ERROR', error: { code: '500', message: 'Internal server error' } });
  }
};

module.exports = { insertCompliment, updateCompliment, getCompliment, deleteCompliment, listCompliment};