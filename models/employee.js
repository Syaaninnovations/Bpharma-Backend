const { DataTypes } = require('sequelize');
const database = require('../config/db');
const { User } = require('./user');
const { District } = require('./district');
const { Distributor } = require('./distributor');
const { Status } = require('./status');
const { UserRole } = require('./userrole');
const { Role } = require('./role');

const Employee = database.define('employees', {
    emp_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    display_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    emp_code: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    phone_num: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email_id: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    district_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    distributer_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    first_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    last_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    is_active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    status_id: {
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

// Define relationships
Employee.belongsTo(User, { foreignKey: 'emp_id', targetKey: 'emp_id' });
User.hasMany(Employee, { foreignKey: 'emp_id', sourceKey: 'emp_id' });

Employee.belongsTo(District, { foreignKey: 'district_id', targetKey: 'district_id' });
District.hasMany(Employee, { foreignKey: 'district_id', sourceKey: 'district_id' });

Employee.belongsTo(Distributor, { foreignKey: 'distributer_id', targetKey: 'distributor_id' });
Distributor.hasMany(Employee, { foreignKey: 'distributer_id', sourceKey: 'distributor_id' });

Employee.belongsTo(Status, { foreignKey: 'status_id', targetKey: 'status_id' });
Status.hasMany(Employee, { foreignKey: 'status_id', sourceKey: 'status_id' });

const fullEmployeeDetails = async ( emp_id) => {

    return await Employee.findOne({
        where: { emp_id: emp_id,is_active:0 },
        include: [
            {
                model: User,
                include: [
                    {
                        model: UserRole,
                        include: [
                            {
                                model: Role,
                                attributes: ['role_id', 'role_name', 'is_active'],
                            }
                        ],
                        attributes: ['user_role_id', 'role_id', 'is_active'],
                    },
                    {
                        model: Status,
                        attributes: ['status_id', 'status_name', 'is_active'],
                    },
                ],
                attributes: ['user_id', 'emp_code', 'is_active', 'status_date', 'created_on'],
            },
            {
                model: Status,
                attributes: ['status_id', 'status_name', 'is_active'],
            },
        ],
    });
}


module.exports = { Employee, fullEmployeeDetails };
