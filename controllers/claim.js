require('dotenv').config();
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const { Claim } = require('../models/claim');
const { Employee } = require('../models/employee');
const { Distributor } = require('../models/distributor');
const Helper = require('../utils/helper');
const {validate, claimValidationSchema } = require("../validation/claimValidation");

const insertClaim = async (request, response) => {
    try {
        var validationData = validate(request.body,claimValidationSchema);
        if (Array.isArray(validationData) && validationData.length > 0) {
            const errorDetails = validationData.map(err => ({field: err.field,message: err.message}));
            return response.status(400).send({status: 'ERROR',error: {message: 'Validation failed',details: errorDetails}});
        }

        const distributorExist = await Distributor.findOne({ where: { distributor_id: request.body.distributor_id,is_active:0} });
        if (!distributorExist){
            return response.status(400).send({ status : 'ERROR', error: {  message: 'Distributor Not Found' }});
        } 

        const employeeExist = await Employee.findOne({ where: { emp_id: request.body.requested_emp_id,is_active:0} });
        if (!employeeExist){
            return response.status(400).send({ status : 'ERROR', error: {  message: 'Employee Not Found' }});
        }

        const claim = await Claim.create({
            requested_emp_id: request.body.requested_emp_id,
            distributor_id: request.body.distributor_id,
            requested_date: request.body.requested_date,
            created_by: request.user.userid,
            created_on: new Date(),
        });

        response.status(201).send({ status: 'SUCCESS', data: claim });
    } catch (error) {
        response.status(500).send({ status: 'ERROR', error: err.message });
    }
};

const updateClaim = async (request, response) => {
    try {
        var validationData = validate(request.body,claimValidationSchema);
        if (Array.isArray(validationData) && validationData.length > 0) {
            const errorDetails = validationData.map(err => ({field: err.field,message: err.message}));
            return response.status(400).send({status: 'ERROR',error: {message: 'Validation failed',details: errorDetails}});
        }

        const distributorExist = await Distributor.findOne({ where: { distributor_id: request.body.distributor_id,is_active:0} });
        if (!distributorExist){
            return response.status(400).send({ status : 'ERROR', error: {  message: 'Distributor Not Found' }});
        } 

        const employeeExist = await Employee.findOne({ where: { emp_id: request.body.requested_emp_id,is_active:0} });
        if (!employeeExist){
            return response.status(400).send({ status : 'ERROR', error: {  message: 'Employee Not Found' }});
        } 

        const claim = await Claim.findByPk(request.params.id);;
        if (!claim) {
            return res.status(404).json({ status: 'ERROR', message: 'Claim not found' });
        }

        await claim.update({
            requested_emp_id: request.body.requested_emp_id,
            distributor_id: request.body.distributor_id,
            requested_date: request.body.requested_date,
        });

        response.status(200).send({ status: 'SUCCESS', data: claim });        
    } catch (error) {
        console.error('Error updating claim:', error);
        response.status(500).send({ status: 'ERROR', error: err.message });
    }
};

const viewClaim = async (request, response) => {
    try {
       

        const claim = await Claim.findByPk(request.params.id, {
            include: [
                { model: Employee, attributes: ['emp_id','display_name'] },
                { model: Distributor, attributes: ['emp_id','distributor_name'] },
            ],
        });

        if (!claim) {
            return response.status(404).json({ status: 'ERROR', message: 'Claim not found' });
        }

        response.status(200).json({ status: 'SUCCESS', data: claim });
    } catch (error) {
        console.error('Error viewing claim:', error);
        response.status(500).send({ status: 'ERROR', error: err.message });
    }
};



const listClaims = async (req, res) => {
    try {
        const { page = 1, limit = 10, search = '', sortBy = 'created_on', sortOrder = 'DESC' } = req.query;

        const filters = {};

        const claims = await Claim.findAndCountAll({
            where: {
                ...filters,
                [Op.or]: [
                    { '$employee.display_name$': { [Op.like]: `%${search}%` } }, // Lowercase alias
                    { '$distributor.distributor_name$': { [Op.like]: `%${search}%` } }, // Lowercase alias
                ],
            },
            include: [
                { model: Employee, as: 'employee', attributes: ['display_name'] }, // Explicit alias
                { model: Distributor, as: 'distributor', attributes: ['distributor_name'] }, // Explicit alias
            ],
            order: [[sortBy, sortOrder]],
            limit: parseInt(limit),
            offset: (parseInt(page) - 1) * parseInt(limit),
        });

        res.status(200).json({
            status: 'SUCCESS',
            data: claims.rows,
            pagination: {
                total: claims.count,
                page: parseInt(page),
                limit: parseInt(limit),
            },
        });
    } catch (error) {
        console.error('Error listing claims:', error);
        res.status(500).json({ status: 'ERROR', message: 'An unexpected error occurred' });
    }
};



module.exports = { insertClaim, updateClaim, viewClaim, listClaims};