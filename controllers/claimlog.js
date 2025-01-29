require('dotenv').config();
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const { Claim } = require('../models/claim');
const { Product } = require('../models/product');
const { ClaimLog } = require('../models/claimlog');
const { Employee } = require('../models/employee');
const { Distributor } = require('../models/distributor');
const { Status } = require('../models/status');
const Helper = require('../utils/helper');
const {validate, claimLogValidationSchema } = require("../validation/claimLogValidation");

const insertClaimLog = async (request, response) => {
    try {
        var validationData = validate(request.body,claimLogValidationSchema);
        if (Array.isArray(validationData) && validationData.length > 0) {
            const errorDetails = validationData.map(err => ({field: err.field,message: err.message}));
            return response.status(400).send({status: 'ERROR',error: {message: 'Validation failed',details: errorDetails}});
        }

        const claimExist = await Claim.findOne({ where: { claim_id: request.body.claim_id } });
        if (!claimExist){
            return response.status(400).send({ status : 'ERROR', error: {  message: 'Claim Not Found' }});
        } 

        const productExist = await Product.findOne({ where: { product_id: request.body.product_id,is_active:0} });
        if (!productExist){
            return response.status(400).send({ status : 'ERROR', error: {  message: 'Product Not Found' }});
        }

        const statusExist = await Status.findOne({ where: { status_id: request.body.status_id,is_active:0} });
        if (!statusExist){
            return response.status(400).send({ status : 'ERROR', error: {  message: 'Status Not Found' }});
        }

        const claimLog = await ClaimLog.create({
            claim_id: request.body.claim_id,
            product_id: request.body.product_id,
            free_qty: request.body.free_qty,
            total_qty: request.body.total_qty,
            created_on: new Date(),
            created_by: request.user.userid,
            remarks: request.body.remarks,
            status_id: request.body.status_id,
            requested_date: request.body.requested_date,
        });

        response.status(201).send({ status: 'SUCCESS', data: claimLog });
    } catch (error) {
        response.status(500).send({ status: 'ERROR', error: err.message });
    }
};

const updateClaimLog = async (request, response) => {
    try {
        var validationData = validate(request.body,claimLogValidationSchema);
        if (Array.isArray(validationData) && validationData.length > 0) {
            const errorDetails = validationData.map(err => ({field: err.field,message: err.message}));
            return response.status(400).send({status: 'ERROR',error: {message: 'Validation failed',details: errorDetails}});
        }

        const claimExist = await Claim.findOne({ where: { claim_id: request.body.claim_id } });
        if (!claimExist){
            return response.status(400).send({ status : 'ERROR', error: {  message: 'Claim Not Found' }});
        } 

        const productExist = await Product.findOne({ where: { product_id: request.body.product_id,is_active:0} });
        if (!productExist){
            return response.status(400).send({ status : 'ERROR', error: {  message: 'Product Not Found' }});
        }

        const statusExist = await Status.findOne({ where: { status_id: request.body.status_id,is_active:0} });
        if (!statusExist){
            return response.status(400).send({ status : 'ERROR', error: {  message: 'Status Not Found' }});
        }

        const claimLog = await ClaimLog.findByPk(request.params.id);;
        if (!claimLog) {
            return res.status(404).json({ status: 'ERROR', message: 'ClaimLog not found' });
        }

        await claimLog.update({
            claim_id: request.body.claim_id,
            product_id: request.body.product_id,
            free_qty: request.body.free_qty,
            total_qty: request.body.total_qty,
            updated_on: new Date(),
            updated_by: request.user.userid,
            remarks: request.body.remarks,
            status_id: request.body.status_id,
            requested_date: request.body.requested_date,
        });

        response.status(200).send({ status: 'SUCCESS', data: claimLog });        
    } catch (error) {
        console.error('Error updating claim:', error);
        response.status(500).send({ status: 'ERROR', error: err.message });
    }
};

const viewClaimLog = async (request, response) => {
    try {
        const claimLog = await ClaimLog.findByPk(request.params.id, {
            include: [
                {
                    model: Claim,
                    as: 'claim',
                    attributes: ['claim_id', 'requested_date'],
                    include: [
                        { model: Employee, attributes: ['emp_id','display_name','emp_code','phone_num','email_id']},
                        { model: Distributor, attributes: ['distributor_id','distributor_name','distributor_code','distr_phone_number','distr_email']},
                    ],
                },
                { model: Product, as: 'product', attributes: ['product_id','product_name','product_code','batch_no','near_expiry','packing'] },
                { model: Status, as: 'status', attributes: ['status_id','status_name'] },
            ],
        });

        if (!claimLog) {
            return response.status(404).json({ status: 'ERROR', message: 'Claim Log not found' });
        }

        response.status(200).json({ status: 'SUCCESS', data: claimLog });
    } catch (error) {
        console.error('Error viewing claim:', error.message);
        response.status(500).send({ status: 'ERROR', error: error.message });
    }
};

const listClaimLogs = async (req, res) => {
    try {
        const { page = 1, limit = 10, search = '', sortBy = 'created_on', sortOrder = 'DESC', claim_id, product_id, status_id } = req.query;

        const filters = {};
        if (claim_id) filters.claim_id = claim_id;
        if (product_id) filters.product_id = product_id;
        if (status_id) filters.status_id = status_id;

        const claimLogs = await ClaimLog.findAndCountAll({
            where: {
                ...filters,
                [Op.or]: [
                    { remarks: { [Op.like]: `%${search}%` } },
                ],
            },
            include: [                
                {
                    model: Claim,
                    as: 'claim',
                    attributes: ['claim_id', 'requested_date'],
                    include: [
                        { model: Employee, attributes: ['emp_id','display_name','emp_code','phone_num','email_id']},
                        { model: Distributor, attributes: ['distributor_id','distributor_name','distributor_code','distr_phone_number','distr_email']},
                    ],
                },
                { model: Product, as: 'product', attributes: ['product_id','product_name','product_code','batch_no','near_expiry','packing'] },
                { model: Status, as: 'status', attributes: ['status_id','status_name'] },
             ],
            order: [[sortBy, sortOrder]],
            limit: parseInt(limit),
            offset: (parseInt(page) - 1) * parseInt(limit),
        });

        res.status(200).json({
            status: 'SUCCESS',
            data: claimLogs.rows,
            pagination: {
                total: claimLogs.count,
                page: parseInt(page),
                limit: parseInt(limit),
            },
        });
    } catch (error) {
        console.error('Error listing claim logs:', error);
        res.status(500).json({ status: 'ERROR', message: 'An unexpected error occurred' });
    }
};




module.exports = { insertClaimLog, updateClaimLog, viewClaimLog, listClaimLogs};