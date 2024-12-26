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
        // references: {
        //   model: 'statuses',
        //   key: 'status_id',
        // },
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
      user_role_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        // references: {
        //   model: 'roles',
        //   key: 'role_id',
        // },
      },
      updated_by: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      updated_on: {
        type: DataTypes.DATE,
        allowNull: true,
      }
});

Role.hasOne(User, {foreignKey : 'user_role_id' , sourceKey: 'role_id'});
User.belongsTo(Role, {foreignKey: 'user_role_id', targetKey: 'role_id'});

Status.hasOne(User, {foreignKey : 'status_id' , sourceKey: 'status_id'});
User.belongsTo(Status, {foreignKey: 'status_id', targetKey: 'status_id'});

module.exports = { User };