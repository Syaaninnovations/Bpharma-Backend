const { DataTypes } = require('sequelize');
const database = require('../config/db');
const { Employee } = require('./employee');
const { Distributor } = require('./distributor');

const Claim = database.define('claims', {
    claim_id: {
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
    distributor_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    requested_date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
}, {
    timestamps: false,
});

// Relationships
Claim.belongsTo(Employee, { foreignKey: 'requested_emp_id' });
Claim.belongsTo(Distributor, { foreignKey: 'distributor_id' });
Employee.hasMany(Claim, { foreignKey: 'requested_emp_id' });
Distributor.hasMany(Claim, { foreignKey: 'distributor_id' });

module.exports = { Claim };
