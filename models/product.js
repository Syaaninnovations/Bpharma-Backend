const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Product = sequelize.define('products', {
    product_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    product_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    product_code: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    is_active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    batch_no: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    near_expiry: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
    },
    packing: {
        type: DataTypes.STRING,
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
    },
}, {
    timestamps: false,
});

module.exports = { Product };
