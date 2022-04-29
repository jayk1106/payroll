const express = require('express');

const deductionControllers = require('../controllers/deduction');

const router = express.Router();

const authUser = require('../middlewares/auth-user');
const getPermissions = require('../middlewares/get-permissions');
const isAdmin = require('../middlewares/isAdmin');

router.get('/:empId', authUser , deductionControllers.getDeduction);

router.post('/', authUser, getPermissions, isAdmin , deductionControllers.postDeduction);

router.put('/', authUser, getPermissions, isAdmin , deductionControllers.putDeduction);

router.delete('/:id', authUser, getPermissions, isAdmin , deductionControllers.deleteDeduction);

module.exports = router;