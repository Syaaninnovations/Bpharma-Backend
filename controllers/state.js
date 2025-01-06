require('dotenv').config();
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const { Country } = require('../models/country');
const { State } = require('../models/state');
const {validate, stateSaveSchema } = require("../validation/stateValidation");

const insertState = async (request, response) => {
  var validationData = validate(request.body,stateSaveSchema);
  if (Array.isArray(validationData) && validationData.length > 0) {
    const errorDetails = validationData.map(err => ({field: err.field,message: err.message}));
    return response.status(400).send({status: 'ERROR',error: {message: 'Validation failed',details: errorDetails}});
  }
  
  const countryExists = await Country.findByPk(request.body.country_id);
  if (!countryExists) {
    return response.status(400).json({ status: 'ERROR', error: 'Invalid country ID' });
  }

  const stateExist = await State.findOne({ where: { state_code: request.body.state_code, state_name: request.body.state_name} });
  if (stateExist){
      return response.status(400).send({ status : 'ERROR', error: {  message: 'State Already Exist' }});
  } 
  try {
      const state = await State.create({
        state_code: request.body.state_code,
        state_name: request.body.state_name,
        country_id: request.body.country_id,
        created_by: request.user.userid,
        created_on: new Date(),
      });
      response.status(201).send({ status: 'SUCCESS', data: state });
    } catch (err) {
      response.status(500).send({ status: 'ERROR', error: err.message });
    }
};

// Update Role
const updateState = async (request, response) => {
  //console.log("request",request.params);
  var validationData = validate(request.body,stateSaveSchema);
  if (Array.isArray(validationData) && validationData.length > 0) {
    const errorDetails = validationData.map(err => ({field: err.field,message: err.message}));
    return response.status(400).send({status: 'ERROR',error: {message: 'Validation failed',details: errorDetails}});
  }

  try {
    const state = await State.findByPk(request.params.id);
    if (!state) {
      return response.status(404).json({ status: 'ERROR', error: 'State not found' });
    }

    const country = await Country.findByPk(request.body.country_id);
    if (!country) return response.status(404).send({ status: 'ERROR', error:{  message: 'Country Not Found' } });

    await state.update({
      state_code: request.body.state_code,
      state_name: request.body.state_name,
      country_id: request.body.country_id,
      created_by: request.user.userid,
    });

    response.status(200).send({ status: 'SUCCESS', data: state });
  } catch (err) {
    response.status(500).send({ status: 'ERROR', error: err.message });
  }
};

const getState = async (req, res) => {
  try {
    const state = await State.findByPk(req.params.id, {
      include: [{ model: Country, as: 'country' }],
    });
    if (!state) return res.status(404).send({ status: 'ERROR', error: 'Status not found' });
    res.status(200).send({ status: 'SUCCESS', data: state });
  } catch (err) {
    res.status(500).send({ status: 'ERROR', error: err.message });
  }
};

const deleteState = async (req, res) => {
  try {
    const state = await State.findByPk(req.params.id);
    if (!state) return res.status(404).send({ status: 'ERROR', error: 'Status not found' });
    await state.destroy();
    res.status(200).send({ status: 'SUCCESS', message: 'Status deleted successfully' });
  } catch (err) {
    res.status(500).send({ status: 'ERROR', error: err.message });
  }
};

const listState = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = '' } = req.query;
    const offset = (page - 1) * limit;

    const where = {};
    if (search) {
      where[Op.or] = [
        { state_code: { [Op.like]: `%${search}%` } },
        { state_name: { [Op.like]: `%${search}%` } },
        { '$country.country_name$': { [Op.like]: `%${search}%` } },
      ];
    }

    const states = await State.findAndCountAll({
      where,
      include: [{ model: Country, as: 'country', attributes: ['country_id', 'country_name'] }],
      limit: parseInt(limit, 10),
      offset: parseInt(offset, 10),
      order: [['state_name', 'ASC']],
    });

    res.status(200).json({
      status: 'SUCCESS',
      data: {
        states: states.rows,
        total: states.count,
        page: parseInt(page, 10),
        totalPages: Math.ceil(states.count / limit),
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: 'ERROR', error: 'Internal server error' });
  }
};


module.exports = { insertState, updateState, getState, deleteState, listState};