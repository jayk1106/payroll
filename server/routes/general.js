const express = require('express');

const generalControllers = require('../controllers/general');

const authUser = require('../middlewares/auth-user');
const getPermissions = require('../middlewares/get-permissions');

const router = express.Router();

router.get('/dashboard/:orgId', generalControllers.getDashboard);

router.get('/form-select-values/:orgId' , generalControllers.getFormSelectValues);

router.get('/admin-status', authUser, getPermissions, generalControllers.getAdminStatus);

module.exports = router;