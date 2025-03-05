const DataTypes = require('sequelize');
const database = require('../config/db');
const {Compliments} = require('./compliments');
const { Employee } = require('./employee');

const ComplimentsRequest = database.define('compliment_request', {
    complimentsRequestId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    compliment_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    remark: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    qty: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    is_active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    request_date: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    request_by: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    created_on: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
    created_by: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    updated_on: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    updated_by: {
        type: DataTypes.INTEGER,
        allowNull: true,
    }
}, {
    timestamps: false,
});

ComplimentsRequest.belongsTo(Compliments, { foreignKey: 'compliment_id', as: 'compliment' });
ComplimentsRequest.belongsTo(Employee, { foreignKey: 'request_by' });
Employee.hasMany(ComplimentsRequest, { foreignKey: 'request_by' });

module.exports = { ComplimentsRequest };