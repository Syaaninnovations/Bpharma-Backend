const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const {State} = require('../models/state');
const {Country} = require('../models/country');

const District = sequelize.define('district', {
    district_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    district_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    district_code: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
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
    state_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        // references: {
        //     model: State,
        //     key: 'state_id',
        // },
    },
    country_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        // references: {
        //     model: Country,
        //     key: 'country_id',
        // },
    },
}, {    
    timestamps: false,
});

// Define relationships
// District.belongsTo(State, { foreignKey: 'state_id', as: 'state' });
// District.belongsTo(Country, { foreignKey: 'country_id', as: 'country' });

// State.hasMany(District, { foreignKey: 'state_id', as: 'districts' });
// Country.hasMany(District, { foreignKey: 'country_id', as: 'districts' });

Country.hasOne(District, {foreignKey : 'country_id' , sourceKey: 'country_id'});
District.belongsTo(Country, {foreignKey: 'country_id', targetKey: 'country_id'});

State.hasOne(District, {foreignKey : 'state_id' , sourceKey: 'state_id'});
District.belongsTo(State, {foreignKey: 'state_id', targetKey: 'state_id'});


module.exports = { District };
