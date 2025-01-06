require('dotenv').config();
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const { Distributor } = require('../models/distributor');
const {validate, distributorSaveSchema } = require("../validation/distributorValidation");
const { Employee } = require('../models/employee');

const insertDistributor = async (request, response) => {
  //console.log("---------"); return false; 
  var validationData = validate(request.body,distributorSaveSchema);
  if (Array.isArray(validationData) && validationData.length > 0) {
    const errorDetails = validationData.map(err => ({field: err.field,message: err.message}));
    return response.status(400).send({status: 'ERROR',error: {message: 'Validation failed',details: errorDetails}});
  }
  const employeeExist = await Employee.findOne({ where: { emp_id: request.body.emp_id, is_active : 0} });
  if (!employeeExist){
      return response.status(400).send({ status : 'ERROR', error: {  message: 'Employee Not Found' }});
  } 
  try {
      const distributor = await Distributor.create({
        distributor_name: request.body.distributor_name,
        distributor_code: request.body.distributor_code,
        distributor_district_id: request.body.distributor_district_id,
        is_active: request.body.is_active || 0,
        created_by: request.user.userid,
        created_on: new Date(),
        address_1: request.body.address_1,
        address_2: request.body.address_2,
        distr_phone_number: request.body.distr_phone_number,
        distr_email: request.body.distr_email,
        emp_id:request.body.emp_id
      });
      response.status(201).send({ status: 'SUCCESS', data: distributor });
    } catch (err) {
      response.status(500).send({ status: 'ERROR', error: err.message });
    }
};

const updateDistributor = async (request, response) => {
  var validationData = validate(request.body,distributorSaveSchema);
  if (Array.isArray(validationData) && validationData.length > 0) {
    const errorDetails = validationData.map(err => ({field: err.field,message: err.message}));
    return response.status(400).send({status: 'ERROR',error: {message: 'Validation failed',details: errorDetails}});
  }

  try {
    const employeeExist = await Employee.findOne({ where: { emp_id: request.body.emp_id, is_active : 0} });
    if (!employeeExist){
        return response.status(400).send({ status : 'ERROR', error: {  message: 'Employee Not Found' }});
    }
    const distributor = await Distributor.findOne({ where: { distributor_id: request.params.id,is_active:0 } });
    if (!distributor) return response.status(404).send({ status: 'ERROR', error:{  message: 'Distributor Not Found' } });

    await distributor.update({
      distributor_name: request.body.distributor_name,
      distributor_code: request.body.distributor_code,
      distributor_district_id: request.body.distributor_district_id,
      is_active: request.body.is_active,
      updated_by: request.user.userid,
      updated_on: new Date(),
      address_1: request.body.address_1,
      address_2: request.body.address_2,
      distr_phone_number: request.body.distr_phone_number,
      distr_email: request.body.distr_email,
      emp_id:request.body.emp_id
    });

    response.status(200).send({ status: 'SUCCESS', data: distributor });
  } catch (err) {
    response.status(500).send({ status: 'ERROR', error: err.message });
  }
};

const getDistributor = async (req, res) => {
  try {
    const distributor = await Distributor.findOne({ where: { distributor_id: req.params.id,is_active:0 } });
    if (!distributor) return res.status(404).send({ status: 'ERROR', error: 'Distributor not found' });
    res.status(200).send({ status: 'SUCCESS', data: distributor });
  } catch (err) {
    res.status(500).send({ status: 'ERROR', error: err.message });
  }
};

const deleteDistributor = async (req, res) => {
  try {
    const distributor = await Distributor.findOne({ where: { distributor_id: req.params.id,is_active:0 } });
    if (!distributor) return res.status(404).send({ status: 'ERROR', error: 'Distributor not found' });
    //let checkDataLink = await Helper.checkLinkData('country',req.params.id);

    // if (checkDataLink.length > 0) { // If linked modules are found
    //   return res.status(409).send({status: 'ERROR',error: {message: `Can't delete. It is linked with the following module(s): ${checkDataLink.join(', ')}`}});
    // } else {
      await distributor.update({is_active: 1,updated_by: req.user.userid,updated_on: new Date()});
        return res.status(200).send({status: 'SUCCESS',message: 'Distributor deleted successfully'});
    //}
  } catch (err) {
    res.status(500).send({ status: 'ERROR', error: err.message });
  }
};

const listDistributor = async (req, res) => {
  
  const { page = 1, limit = 10, search = '', sortField = 'created_on', sortOrder = 'desc', is_active } = req.query;
  const offset = (page - 1) * limit;

  const where = {};
  if (search) {
      where[Op.or] = [
          { distributor_name: { [Op.like]: `%${search}%` } },
          { distributor_code: { [Op.like]: `%${search}%` } },
          { distr_phone_number: { [Op.like]: `%${search}%` } },
          { distr_email: { [Op.like]: `%${search}%` } },
          // { '$district.district_name$': { [Op.like]: `%${search}%` } },
      ];
  }

  if (is_active && is_active !== undefined) {
      where.is_active = is_active === "1";
  }

  try {
      const distributors = await Distributor.findAndCountAll({
          where,
          // include: [{ association: 'district' }],
          order: [[sortField, sortOrder.toUpperCase()]],
          limit: parseInt(limit, 10),
          offset: parseInt(offset, 10),
      });

      res.status(200).send({
          status: 'SUCCESS',
          data: {
              distributors: distributors.rows,
              total: distributors.count,
              page: parseInt(page, 10),
              totalPages: Math.ceil(distributors.count / limit),
          },
      });
  } catch (err) {
      res.status(500).send({ status: 'ERROR', error: 'Internal server error' });
  }
};


module.exports = { insertDistributor, updateDistributor, getDistributor, deleteDistributor, listDistributor};