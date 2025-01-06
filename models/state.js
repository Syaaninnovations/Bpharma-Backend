const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const { Country } = require('../models/country');

const State = sequelize.define('state', {
  state_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  state_code: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  state_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  country_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  created_by: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  created_on: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  timestamps: false,
});

Country.hasOne(State, {foreignKey : 'country_id' , sourceKey: 'country_id'});
State.belongsTo(Country, {foreignKey: 'country_id', targetKey: 'country_id'})



module.exports = { State };
