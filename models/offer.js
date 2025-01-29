const { DataTypes } = require('sequelize');
const database = require('../config/db');
const { Product } = require('./product');
const { Employee } = require('./employee');
const { Status } = require('./status');

const Offer = database.define('offers', {
    offer_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    requested_emp_id: {
        type: DataTypes.INTEGER,
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
    requested_date: {
        type: DataTypes.DATE,
        allowNull: false,
    },    
    product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    customer_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    customer_location: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    qty: {
        type: DataTypes.INTEGER,
        allowNull: false,        
    },
    offer_qty: {
        type: DataTypes.INTEGER,
        allowNull: false,        
    },
    status_id: {
        type: DataTypes.INTEGER,
        allowNull: false,            
    },    
    updated_by: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    updated_on: {
        type: DataTypes.DATE,
        allowNull: true,
    },        
}, {
    timestamps: false,
});

// Relationships
Offer.belongsTo(Product, { foreignKey: 'product_id' });
Offer.belongsTo(Employee, { foreignKey: 'requested_emp_id' });
Offer.belongsTo(Status, { foreignKey: 'status_id', as: 'status' });

module.exports = { Offer };
