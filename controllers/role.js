require('dotenv').config();
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const { Role } = require('../models/role');
const {validate, roleSaveSchema } = require("../validation/roleValidation");

const insertRole = async (request, response) => {
    const user_id = request.user.userid;
    var validationData = validate(request.body,roleSaveSchema);
    if (validationData) {
        return response.status(400).send({ 'status': 'ERROR', 'error': { 'message': validationData.details[0].message} });
    }
    //Check role Already Exist 
    const roleExist = await Role.findOne({ where: { role_name: request.body.role_name } });
    if (roleExist){
        return response.status(400).send({ 'status': 'ERROR', 'error': {  'message': 'Role Already Exist' }});
    } 
    try {
        const role = await Role.create({
          role_name: req.body.role_name,
          is_active: req.body.is_active || 0,
          created_by: req.user.userid,
          created_on: new Date(),
        });
        response.status(201).send({ status: 'SUCCESS', data: role });
      } catch (err) {
        response.status(500).send({ status: 'ERROR', error: err.message });
      }

    
};

module.exports = { insertRole };