require('dotenv').config();
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const { Country } = require('../models/country');
const Helper = require('../utils/helper');
const {validate, countrySaveSchema } = require("../validation/countryValidation");

const insertCountry = async (request, response) => {
  var validationData = validate(request.body,countrySaveSchema);
  if (Array.isArray(validationData) && validationData.length > 0) {
    const errorDetails = validationData.map(err => ({field: err.field,message: err.message}));
    return response.status(400).send({status: 'ERROR',error: {message: 'Validation failed',details: errorDetails}});
  }
  //Check role Already Exist 
  const countryExist = await Country.findOne({ where: { country_name: request.body.country_name, country_code: request.body.country_code} });
  if (countryExist){
      return response.status(400).send({ status : 'ERROR', error: {  message: 'Country Already Exist' }});
  } 
  try {
      const country = await Country.create({
        country_name: request.body.country_name,
        country_code: request.body.country_code,
        created_by: request.user.userid,
        created_on: new Date(),
      });
      response.status(201).send({ status: 'SUCCESS', data: country });
    } catch (err) {
      response.status(500).send({ status: 'ERROR', error: err.message });
    }
};

// Update Role
const updateCountry = async (request, response) => {
  var validationData = validate(request.body,countrySaveSchema);
  if (Array.isArray(validationData) && validationData.length > 0) {
    const errorDetails = validationData.map(err => ({field: err.field,message: err.message}));
    return response.status(400).send({status: 'ERROR',error: {message: 'Validation failed',details: errorDetails}});
  }

  try {
    const country = await Country.findByPk(request.params.id);
    if (!country) return response.status(404).send({ status: 'ERROR', error:{  message: 'Country Not Found' } });

    await country.update({
      country_name: request.body.country_name,
      country_code: request.body.country_code,
      created_by: request.user.userid,
    });

    response.status(200).send({ status: 'SUCCESS', data: country });
  } catch (err) {
    response.status(500).send({ status: 'ERROR', error: err.message });
  }
};

const getCountry = async (req, res) => {
  try {
    const country = await Country.findByPk(req.params.id);
    if (!country) return res.status(404).send({ status: 'ERROR', error: 'Country not found' });
    res.status(200).send({ status: 'SUCCESS', data: country });
  } catch (err) {
    res.status(500).send({ status: 'ERROR', error: err.message });
  }
};

const deleteCountry = async (req, res) => {
  try {
    const country = await Country.findByPk(req.params.id);
    if (!country) return res.status(404).send({ status: 'ERROR', error: 'Country not found' });
    let checkDataLink = await Helper.checkLinkData('country',req.params.id);
    if(checkDataLink){      
      return response.status(409).send({ status: 'ERROR', error: { message : "Can't able to delete it is linked with some other module"} });
    }else{
      await country.destroy();
      res.status(200).send({ status: 'SUCCESS', message: 'Country deleted successfully' });
    }
    
  } catch (err) {
    res.status(500).send({ status: 'ERROR', error: err.message });
  }
};

const listCountry = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = '', sortField = 'created_on', sortOrder = 'desc', is_active } = req.query;
    const offset = (page - 1) * limit;

    // Build filter conditions
    const where = {};
    if (search) {
      where[Op.or] = [
        { country_name: { [Op.like]: `%${search}%` } },
        { country_code: { [Op.like]: `%${search}%` } },
      ];
    }

    // Validate sort field and sort order
    const validSortOrder = ['asc', 'desc'];
    const validSortFields = ['created_on', 'country_name', 'country_code']; // Add other fields if needed

    const order = validSortFields.includes(sortField) && validSortOrder.includes(sortOrder.toLowerCase())
      ? [[sortField, sortOrder.toUpperCase()]]
      : [['created_on', 'DESC']];

    // Query the database
    const country = await Country.findAndCountAll({
      where,
      order,
      limit: parseInt(limit, 10),
      offset: parseInt(offset, 10),
    });

    // Respond with paginated data
    res.status(200).json({
      status: 'SUCCESS',
      data: {
        country: country.rows,
        total: country.count,
        page: parseInt(page, 10),
        totalPages: Math.ceil(country.count / limit),
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: 'ERROR', error: { code: '500', message: 'Internal server error' } });
  }
};


module.exports = { insertCountry, updateCountry, getCountry, deleteCountry, listCountry};