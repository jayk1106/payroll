const express = require('express');

const deductionTypeControllers = require('../controllers/deduction_type');

const authUser = require('../middlewares/auth-user');
const getPermissions = require('../middlewares/get-permissions');
const isAdmin = require('../middlewares/isAdmin');

const router = express.Router();

router.get('/:orgId' , authUser, getPermissions, isAdmin, deductionTypeControllers.getDeductionTypes);

router.post('/' , authUser, getPermissions, isAdmin, deductionTypeControllers.postDeductionType);

router.put('/' , authUser, getPermissions, isAdmin, deductionTypeControllers.putDeductionType);

router.delete('/:id' , authUser, getPermissions, isAdmin, deductionTypeControllers.deleteDeductionType);

module.exports = router;