require('dotenv').config();
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const { Status } = require('../models/status');
const {validate, statusSaveSchema } = require("../validation/statusValidation");

const insertStatus = async (request, response) => {
  var validationData = validate(request.body,statusSaveSchema);
  if (Array.isArray(validationData) && validationData.length > 0) {
    const errorDetails = validationData.map(err => ({field: err.field,message: err.message}));
    return response.status(400).send({status: 'ERROR',error: {message: 'Validation failed',details: errorDetails}});
  }
  //Check role Already Exist 
  const statusExist = await Status.findOne({ where: { status_name: request.body.status_name,is_active:0 } });
  if (statusExist){
      return response.status(400).send({ status : 'ERROR', error: {  message: 'Status Already Exist' }});
  } 
  try {
      const createStatus = await Status.create({
        status_name: request.body.status_name,
        is_active: request.body.is_active || 0,
        created_by: request.user.userid,
        created_on: new Date(),
      });
      response.status(201).send({ status: 'SUCCESS', data: createStatus });
    } catch (err) {
      response.status(500).send({ status: 'ERROR', error: err.message });
    }
};

// Update Role
const updateStatus = async (request, response) => {
  var validationData = validate(request.body,statusSaveSchema);
  if (Array.isArray(validationData) && validationData.length > 0) {
    const errorDetails = validationData.map(err => ({field: err.field,message: err.message}));
    return response.status(400).send({status: 'ERROR',error: {message: 'Validation failed',details: errorDetails}});
  }

  try {
    const updateStatus = await Status.findOne({where: {status_id: request.params.id, is_active: 0 }  });
    if (!updateStatus) return response.status(404).send({ status: 'ERROR', error:{  message: 'Status Not Found' } });

    await updateStatus.update({
      status_name: request.body.status_name,
      is_active: request.body.is_active,
      updated_by: request.user.userid, // Use logged-in user's ID
      updated_on: new Date(),
    });

    response.status(200).send({ status: 'SUCCESS', data: updateStatus });
  } catch (err) {
    response.status(500).send({ status: 'ERROR', error: err.message });
  }
};

const getStatus = async (req, res) => {
  try {
    const getStatus = await Status.findOne({where: {status_id: req.params.id,is_active: 0 }  });
    if (!getStatus) return res.status(404).send({ status: 'ERROR', error: 'Status not found' });
    res.status(200).send({ status: 'SUCCESS', data: getStatus });
  } catch (err) {
    res.status(500).send({ status: 'ERROR', error: err.message });
  }
};

const deleteStatus = async (req, res) => {
  try {
    const deleteStatus = await Status.findOne({where: {status_id: req.params.id,is_active: 0 }  });
    if (!deleteStatus) return res.status(404).send({ status: 'ERROR', error: 'Status not found' });
    await deleteStatus.update({ is_active: 1, updated_by: req.user.userid, updated_on: new Date(),});
    res.status(200).send({ status: 'SUCCESS', message: 'Status deleted successfully' });
  } catch (err) {
    res.status(500).send({ status: 'ERROR', error: err.message });
  }
};

const listStatus = async (req, res) => {
  try {
    const {page = 1,limit = 10,search = '',sortField = 'created_on',sortOrder = 'desc',is_active} = req.query;
    const offset = (page - 1) * limit;

    // Build filter conditions
    const where = {};
    if (search) {
      where.status_name = { [Op.like]: `%${search}%` };
    }
    if (is_active !== undefined) {
      where.is_active = is_active === '1';
    }

    // Query the database
    const statuses = await Status.findAndCountAll({
      where,
      order: [[sortField, sortOrder.toUpperCase()]],
      limit: parseInt(limit, 10),
      offset: parseInt(offset, 10),
    });

    // Respond with paginated data
    res.status(200).json({
      status: 'SUCCESS',
      data: {
        statuses: statuses.rows,
        total: statuses.count,
        page: parseInt(page, 10),
        totalPages: Math.ceil(statuses.count / limit),
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: 'ERROR', error: { code: '500', message: 'Internal server error' } });
  }
};

module.exports = { insertStatus, updateStatus, getStatus, deleteStatus, listStatus};