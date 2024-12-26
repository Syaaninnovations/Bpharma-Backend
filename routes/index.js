const express = require('express');
const router = express.Router();
const { verify } = require('./auth');
const UserController = require('../controllers/user');
const RoleController = require('../controllers/role');
router.post('/login', UserController.login);

//Role module
router.post('/insertRole', verify, RoleController.insertRole);

module.exports = router;