const express = require('express');

const generalControllers = require('../controllers/general');

const authUser = require('../middlewares/auth-user');
const getPermissions = require('../middlewares/get-permissions');
const isAdmin = require('../middlewares/isAdmin');

const router = express.Router();

router.get('/dashboard/:orgId', authUser, getPermissions, isAdmin, generalControllers.getDashboard);

router.get('/form-select-values/:orgId', authUser, getPermissions, isAdmin , generalControllers.getFormSelectValues);

router.get('/admin-status', authUser, getPermissions, generalControllers.getAdminStatus);

module.exports = router;