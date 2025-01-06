const DataTypes = require('sequelize');
const database = require('../config/db');
const { Role } = require('./role');
const { Status } = require('./status');

const User = database.define('users', {
    user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      emp_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      emp_code: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      user_password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      is_active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
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
      status_date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      updated_by: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      updated_on: {
        type: DataTypes.DATE,
        allowNull: true,
      }
}, {
  timestamps: false,
});

User.belongsTo(Status, { foreignKey: 'status_id', targetKey: 'status_id' });
Status.hasMany(User, { foreignKey: 'status_id', sourceKey: 'status_id' });

module.exports = { User };