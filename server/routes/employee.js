const express = require('express');

const empControllers = require('../controllers/employee');

const authUser = require('../middlewares/auth-user');
const getPermissions = require('../middlewares/get-permissions');
const isAdmin = require('../middlewares/isAdmin');

const router = express.Router();

router.get('/' , authUser, getPermissions, isAdmin, empControllers.getEmployee);

router.post('/' , authUser, getPermissions, isAdmin, empControllers.postEmployee);

router.post('/login' , empControllers.loginEmployee);

router.put('/' , authUser, getPermissions, isAdmin, empControllers.putEmployee);

router.delete('/' , authUser, getPermissions, isAdmin, empControllers.deleteEmployee);

module.exports = router;