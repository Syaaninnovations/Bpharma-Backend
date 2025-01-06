require('dotenv').config();
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const { Role } = require('../models/role');
const {validate, roleSaveSchema } = require("../validation/roleValidation");

const insertRole = async (request, response) => {
  var validationData = validate(request.body,roleSaveSchema);
  if (Array.isArray(validationData) && validationData.length > 0) {
    const errorDetails = validationData.map(err => ({field: err.field,message: err.message}));
    return response.status(400).send({status: 'ERROR',error: {message: 'Validation failed',details: errorDetails}});
  }
  //Check role Already Exist 
  const roleExist = await Role.findOne({ where: { role_name: request.body.role_name,is_active:0 } });
  if (roleExist){
      return response.status(400).send({ status : 'ERROR', error: {  message: 'Role Already Exist' }});
  } 
  try {
      const role = await Role.create({
        role_name: request.body.role_name,
        is_active: request.body.is_active || 0,
        created_by: request.user.userid,
        created_on: new Date(),
      });
      response.status(201).send({ status: 'SUCCESS', data: role });
    } catch (err) {
      response.status(500).send({ status: 'ERROR', error: err.message });
    }
};

// Update Role
const updateRole = async (request, response) => {
  var validationData = validate(request.body,roleSaveSchema);
  if (Array.isArray(validationData) && validationData.length > 0) {
    const errorDetails = validationData.map(err => ({field: err.field,message: err.message}));
    return response.status(400).send({status: 'ERROR',error: {message: 'Validation failed',details: errorDetails}});
  }

  try {
    const role = await Role.findOne({ where: { role_id: request.params.id,is_active:0 } });
    if (!role) return response.status(404).send({ status: 'ERROR', error:{  message: 'Role Not Found' } });

    await role.update({
      role_name: request.body.role_name,
      is_active: request.body.is_active,
      updated_by: request.user.userid,
      updated_on: new Date(),
    });

    response.status(200).send({ status: 'SUCCESS', data: role });
  } catch (err) {
    response.status(500).send({ status: 'ERROR', error: err.message });
  }
};

const getRole = async (req, res) => {
  try {
    const role = await Role.findOne({ where: { role_id: req.params.id,is_active:0 } });
    if (!role) return res.status(404).send({ status: 'ERROR', error: 'Role not found' });
    res.status(200).send({ status: 'SUCCESS', data: role });
  } catch (err) {
    res.status(500).send({ status: 'ERROR', error: err.message });
  }
};

const deleteRole = async (req, res) => {
  try {
    const role = await Role.findOne({ where: { role_id: req.params.id,is_active:0 } });
    if (!role) return res.status(404).send({ status: 'ERROR', error: 'Role not found' });
    await role.update({ is_active: 1, updated_by: req.user.userid, updated_on: new Date(),});

    res.status(200).send({ status: 'SUCCESS', message: 'Role deleted successfully' });
  } catch (err) {
    res.status(500).send({ status: 'ERROR', error: err.message });
  }
};

const listRoles = async (req, res) => {
  try {
    const {page = 1,limit = 10,search = '',sortField = 'created_on',sortOrder = 'desc',is_active} = req.query;
    const offset = (page - 1) * limit;

    // Build filter conditions
    const where = {};
    if (search) {
      where.role_name = { [Op.like]: `%${search}%` };
    }
    if (is_active !== undefined) {
      where.is_active = is_active === '1';
    }

    // Query the database
    const roles = await Role.findAndCountAll({
      where,
      order: [[sortField, sortOrder.toUpperCase()]],
      limit: parseInt(limit, 10),
      offset: parseInt(offset, 10),
    });

    // Respond with paginated data
    res.status(200).json({
      status: 'SUCCESS',
      data: {
        roles: roles.rows,
        total: roles.count,
        page: parseInt(page, 10),
        totalPages: Math.ceil(roles.count / limit),
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: 'ERROR', error: { code: '500', message: 'Internal server error' } });
  }
};

module.exports = { insertRole, updateRole, getRole, deleteRole, listRoles};