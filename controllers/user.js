require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const { User } = require('../models/user');
const {validate, loginSchema } = require("../validation/userValidation");

const login = async (request, response) => {
    var validationData = validate(request.body,loginSchema);
    if (validationData) {
        return response.status(400).send({ 'status': 'ERROR', 'error': { 'message': validationData} });
    }
    const userExist = await User.findOne({ where: { emp_code: request.body.emp_code } });
    if (userExist && await bcrypt.compare(request.body.user_password, userExist.user_password)) {
        const token = jwt.sign({ userid: userExist.id }, process.env.Bosecret);
        let userDetails = JSON.parse(JSON.stringify(userExist))
        delete userDetails.user_password
        return response.send({ 'status': 'OK', 'data': { 'auth_token': token, "userData": userDetails } });
    }
    else {
        return response.status(400).send({ 'status': 'ERROR', 'error': { 'message': 'Employee Code or Password Not Matching' } });
    }
};

module.exports = { login };