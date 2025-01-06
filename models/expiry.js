const { DataTypes } = require('sequelize');
const database = require('../config/db');
const { Product } = require('./product');
const { Employee } = require('./employee');

const Expiry = database.define('expiries', {
    expairy_req_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        // references: {
        //     model: Product,
        //     key: 'product_id',
        // },
    },
    requested_emp_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        // references: {
        //     model: Employee,
        //     key: 'emp_id',
        // },
    },
    total_qty: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    remarks: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    created_by: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    created_on: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
    updated_by: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    updated_on: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    expairy_req_date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    customer_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    timestamps: false,
});

Expiry.belongsTo(Product, { foreignKey: 'product_id', targetKey: 'product_id' });
Expiry.belongsTo(Employee, { foreignKey: 'requested_emp_id', targetKey: 'emp_id' });

module.exports = { Expiry };
