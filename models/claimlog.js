const DataTypes = require('sequelize');
const database = require('../config/db');
const {Claim} = require('../models/claim');
const {Product} = require('../models/product');
const {Status} = require('../models/status');

const ClaimLog = database.define('claim_log', {
    claim_log_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    claim_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        // references: {
        //     model: Claim,
        //     key: 'claim_id',
        // },
    },
    product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        // references: {
        //     model: Product,
        //     key: 'product_id',
        // },
    },
    free_qty: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
    total_qty: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
    created_on: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    created_by: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    updated_on: {
        type: DataTypes.DATE,
    },
    updated_by: {
        type: DataTypes.INTEGER,
    },
    remarks: {
        type: DataTypes.TEXT,
    },
    status_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        // references: {
        //     model: Status,
        //     key: 'status_id',
        // },
    },
    requested_date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
}, {
    timestamps: false,
  });

ClaimLog.belongsTo(Claim, { foreignKey: 'claim_id', as: 'claim' });
ClaimLog.belongsTo(Product, { foreignKey: 'product_id', as: 'product' });
ClaimLog.belongsTo(Status, { foreignKey: 'status_id', as: 'status' });

module.exports = { ClaimLog };
