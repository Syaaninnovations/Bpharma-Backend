const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const {District} = require('../models/district');

const Distributor = sequelize.define('distributor', {
    distributor_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    distributor_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    distributor_code: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    distributor_district_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    created_by: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    created_on: {
        type: DataTypes.DATE,
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
    address_1: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    address_2: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    emp_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    distr_phone_number: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    distr_email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isEmail: true,
        },
    },
}, {
    timestamps: false,
});



District.hasOne(Distributor, {foreignKey : 'distributor_district_id' , sourceKey: 'district_id'});
Distributor.belongsTo(District, {foreignKey: 'distributor_district_id', targetKey: 'district_id'});

module.exports = { Distributor };
