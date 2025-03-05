require('dotenv').config();
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const { ComplimentsRequest } = require('../models/complimentsRequest');
const {Compliments} = require('../models/compliments');
const {Employee} = require('../models/employee');
const {validate, complimentRequestSaveSchema } = require("../validation/complimentRequestValidation");

const insertComplimentRequest = async (request, response) => {
  var validationData = validate(request.body,complimentRequestSaveSchema);
  if (Array.isArray(validationData) && validationData.length > 0) {
    const errorDetails = validationData.map(err => ({field: err.field,message: err.message}));
    return response.status(400).send({status: 'ERROR',error: {message: 'Validation failed',details: errorDetails}});
  }
  
  try {
      const complimentRequest = await ComplimentsRequest.create({
        compliment_id: request.body.compliment_id,
        remark: request.body.remark,
        qty: request.body.qty,
        request_date : new Date(),
        request_by: request.body.emp_id,         
        is_active: request.body.is_active || 0,
        created_by: request.user.userid,
        created_on: new Date(),
      });
      response.status(201).send({ status: 'SUCCESS', data: complimentRequest });
    } catch (err) {
      response.status(500).send({ status: 'ERROR', error: err.message });
    }
};

const updateComplimentRequest = async (request, response) => {
  var validationData = validate(request.body,complimentRequestSaveSchema);
  if (Array.isArray(validationData) && validationData.length > 0) {
    const errorDetails = validationData.map(err => ({field: err.field,message: err.message}));
    return response.status(400).send({status: 'ERROR',error: {message: 'Validation failed',details: errorDetails}});
  }

  try {
    const complimentRequest = await ComplimentsRequest.findOne({ where: { complimentsRequestId: request.params.id,is_active:0 } });
    if (!complimentRequest) return response.status(404).send({ status: 'ERROR', error:{  message: 'Compliment Request Not Found' } });

    await complimentRequest.update({
      compliment_id: request.body.compliment_id,
      remark: request.body.remark,
      qty: request.body.qty,
      compliments_name: request.body.compliments_name,
      is_active: request.body.is_active,
      updated_by: request.user.userid,
      updated_on: new Date(),
    });

    response.status(200).send({ status: 'SUCCESS', data: complimentRequest });
  } catch (err) {
    response.status(500).send({ status: 'ERROR', error: err.message });
  }
};

const getComplimentRequest = async (req, res) => {
  try {
    const complimentRequest = await ComplimentsRequest.findByPk(req.params.id, {
      include: [
          { model: Employee, attributes: ['emp_id','display_name','email_id','phone_num','emp_code'] },
          {
            model: Compliments,
            as: 'compliment',
            attributes: ['complimentsId', 'is_active','compliments_name'],                
        },
      ],
  });

  if (!complimentRequest) {
      return res.status(404).json({ status: 'ERROR', message: 'Compliment Request not found' });
  }

  res.status(200).json({ status: 'SUCCESS', data: complimentRequest });
  } catch (err) {
    res.status(500).send({ status: 'ERROR', error: err.message });
  }
};



const listComplimentRequest = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = '', sortBy = 'created_on', sortOrder = 'DESC', compliment_id } = req.query;

    const filters = {};
    if (compliment_id) filters.compliment_id = compliment_id;

    const complimentRequest = await ComplimentsRequest.findAndCountAll({
        where: {
            ...filters,
            [Op.or]: [
                { '$employee.display_name$': { [Op.like]: `%${search}%` } }, // Lowercase alias
                { '$compliment.compliments_name$': { [Op.like]: `%${search}%` } }, // Lowercase alias
            ],
        },
        include: [                
            {
                model: Compliments,
                as: 'compliment',
                attributes: ['complimentsId', 'is_active','compliments_name'],                
            },
            { model: Employee, as: 'employee', attributes: ['emp_id','display_name','email_id','phone_num','emp_code'] },
         ],
        order: [[sortBy, sortOrder]],
        limit: parseInt(limit),
        offset: (parseInt(page) - 1) * parseInt(limit),
    });

    res.status(200).json({
        status: 'SUCCESS',
        data: complimentRequest.rows,
        pagination: {
            total: complimentRequest.count,
            page: parseInt(page),
            limit: parseInt(limit),
        },
    });
  } catch (error) {
      console.error('Error listing claim logs:', error);
      res.status(500).json({ status: 'ERROR', message: 'An unexpected error occurred' });
  }
};

module.exports = { insertComplimentRequest, updateComplimentRequest, getComplimentRequest, listComplimentRequest };