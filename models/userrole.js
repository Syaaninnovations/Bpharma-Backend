const { DataTypes } = require('sequelize');
const database = require('../config/db');
const { Role } = require('./role');
const { User } = require('./user');

const UserRole = database.define('user_roles', {
    user_role_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    role_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    updated_by: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    updated_on: {
        type: DataTypes.DATE,
        allowNull: true,
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

UserRole.belongsTo(User, { foreignKey: 'user_id', targetKey: 'user_id' });
User.hasMany(UserRole, { foreignKey: 'user_id', sourceKey: 'user_id' });

UserRole.belongsTo(Role, { foreignKey: 'role_id', targetKey: 'role_id' });
Role.hasMany(UserRole, { foreignKey: 'role_id', sourceKey: 'role_id' });

module.exports = { UserRole };
