const DataTypes = require('sequelize');
const database = require('../config/db');


const Country = database.define('country', {
    country_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    country_code: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    country_name: {
        type: DataTypes.STRING,
        allowNull: false,
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
});

module.exports = { Country };