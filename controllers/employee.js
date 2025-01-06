const { Employee, fullEmployeeDetails } = require('../models/employee');
const { User } = require('../models/user');
const { UserRole } = require('../models/userrole');
const { Role } = require('../models/role');
const { District } = require('../models/district');
const { Distributor } = require('../models/distributor');
const { Status } = require('../models/status');

const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const bcrypt = require('bcryptjs');

const { validate, employeeValidationSchema } = require("../validation/employeeValidation");

const insertEmployee = async (req, res) => {
    const sequelize = new Sequelize({
        database: process.env.DB_NAME,
        username: process.env.DB_USER,
        password: process.env.DB_PASS,
        host: process.env.DB_HOST,
        dialect: 'mysql',
    });

    const t = await sequelize.transaction();
    try {
        var validationData = validate(req.body,employeeValidationSchema);
        if (Array.isArray(validationData) && validationData.length > 0) {
            const errorDetails = validationData.map(err => ({field: err.field,message: err.message}));
            return res.status(400).send({status: 'ERROR',error: {message: 'Validation failed',details: errorDetails}});
        }

        const { display_name, emp_code, first_name, last_name,phone_num, email_id, district_id, distributer_id,role_id, status_id, is_active} = req.body;

        // Insert Employee
        const employee = await Employee.create({display_name, emp_code, first_name, last_name, phone_num,email_id, district_id, distributer_id, status_id, 
            is_active, created_by: req.user.userid, created_on: new Date(),}, { transaction: t });

        // Insert User
        const hashedPassword = await bcrypt.hash('Employee@123', 10);
        const user = await User.create({emp_code, user_password: hashedPassword,status_id, is_active: true, created_by: req.user.userid,created_on: new Date(), status_date: new Date(),emp_id:employee.emp_id
        }, { transaction: t });

        // Insert UserRole
        await UserRole.create({user_id: user.user_id, role_id, is_active: true,created_by: req.user.userid, created_on: new Date()}, { transaction: t });

        // Commit transaction
        await t.commit();
        const employeeDetails = await fullEmployeeDetails(employee.emp_id);
        res.status(201).json({status: 'SUCCESS',message: 'Employee added successfully',data: employeeDetails});
    } catch (error) {
        if (t.finished !== 'commit') {
            await t.rollback();
            console.error('Transaction rolled back due to error:', error);
        } else {
            console.error('Error occurred after transaction commit:', error);
        }
        res.status(500).json({status: 'ERROR',message: error.message || 'An unexpected error occurred'});
    }
};

const updateEmployee = async (req, res) => {
    const sequelize = new Sequelize({
        database: process.env.DB_NAME,
        username: process.env.DB_USER,
        password: process.env.DB_PASS,
        host: process.env.DB_HOST,
        dialect: 'mysql',
    });
    const t = await sequelize.transaction();
    try {
        var validationData = validate(req.body,employeeValidationSchema);
        if (Array.isArray(validationData) && validationData.length > 0) {
            const errorDetails = validationData.map(err => ({field: err.field,message: err.message}));
            return res.status(400).send({status: 'ERROR',error: {message: 'Validation failed',details: errorDetails}});
        }        
        const { display_name, first_name, last_name, phone_num, email_id, district_id, distributer_id, status_id, is_active } = req.body;
        const employee = await Employee.findOne({ where: { emp_id: req.params.id,is_active:0 } });
        if (!employee) {
            return res.status(404).json({ status: 'ERROR', message: 'Employee not found' });
        }
        await employee.update({ display_name, first_name, last_name, phone_num, email_id, district_id, distributer_id, status_id, is_active, updated_by: req.user.userid, updated_on: new Date() }, { transaction: t });
        await t.commit();
        const updatedDetails = await fullEmployeeDetails(req.params.id);
        res.status(200).json({ status: 'SUCCESS', message: 'Employee updated successfully', data: updatedDetails });
    } catch (error) {
        if (t.finished !== 'commit') await t.rollback();
        console.error('Transaction rolled back due to error:', error);
        res.status(500).json({ status: 'ERROR', message: error.message || 'An unexpected error occurred' });
    }
};

const viewEmployee = async (req, res) => {
    try {
        const employeeDetails = await fullEmployeeDetails(req.params.id);
        if (!employeeDetails) {
            return res.status(404).json({ status: 'ERROR', message: 'Employee not found' });
        }
        res.status(200).json({ status: 'SUCCESS', data: employeeDetails });
    } catch (error) {
        console.error('Error fetching employee:', error);
        res.status(500).json({ status: 'ERROR', message: 'An unexpected error occurred' });
    }
};

const listEmployees = async (req, res) => {
    try {
        const { page = 1, limit = 10, search = '', sortBy = 'created_on', sortOrder = 'DESC', status_id, district_id,is_active } = req.query;

        const filters = {};
        if (status_id) filters.status_id = status_id;
        if (district_id) filters.district_id = district_id;
        if (typeof is_active !== 'undefined') filters.is_active = is_active;

        const employees = await Employee.findAndCountAll({
            where: {
                ...filters,
                [Op.or]: [
                    { display_name: { [Op.like]: `%${search}%` } },
                    { first_name: { [Op.like]: `%${search}%` } },
                    { last_name: { [Op.like]: `%${search}%` } },
                ],
            },
            include: [
                {
                    model: User,
                    include: [
                        { model: UserRole, include: [Role] },
                        { model: Status },
                    ],
                },
                { model: Status },
                { model: District },
                { model: Distributor },
            ],
            order: [[sortBy, sortOrder]],
            limit: parseInt(limit),
            offset: (parseInt(page) - 1) * parseInt(limit),
        });

        res.status(200).json({
            status: 'SUCCESS',
            data: employees.rows,
            pagination: {
                total: employees.count,
                page: parseInt(page),
                limit: parseInt(limit),
            },
        });
    } catch (error) {
        console.error('Error listing employees:', error);
        res.status(500).json({ status: 'ERROR', message: 'An unexpected error occurred' });
    }
};

module.exports = { insertEmployee, updateEmployee, viewEmployee, listEmployees };