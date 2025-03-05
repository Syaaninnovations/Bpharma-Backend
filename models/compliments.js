const DataTypes = require('sequelize');
const database = require('../config/db');
const {User} = require('./user');

const Compliments = database.define('compliment', {
    complimentsId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    compliments_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    is_active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
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
    }
}, {
    timestamps: false,
});


Compliments.belongsTo(User, { foreignKey: 'created_by' });
User.hasMany(Compliments, { foreignKey: 'created_by' });
module.exports = { Compliments };