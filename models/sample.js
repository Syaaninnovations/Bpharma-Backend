const { DataTypes } = require('sequelize');
const database = require('../config/db'); // Sequelize instance
const { Product } = require('./product'); // Assuming the Product model exists
const { Employee } = require('./employee'); // Assuming the Employee model exists

const SampleRequest = database.define('sample_requests', {
    sample_req_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    requested_emp_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    total_qty: {
        type: DataTypes.INTEGER,
        allowNull: false,        
    },
    remarks: {
        type: DataTypes.STRING,
        allowNull: true,
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
    requested_date: {
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

// Relationships
SampleRequest.belongsTo(Product, { foreignKey: 'product_id' });
SampleRequest.belongsTo(Employee, { foreignKey: 'requested_emp_id' });
Product.hasMany(SampleRequest, { foreignKey: 'product_id' });
Employee.hasMany(SampleRequest, { foreignKey: 'requested_emp_id' });

module.exports = { SampleRequest };
