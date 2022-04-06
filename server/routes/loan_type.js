const express = require('express');

const loanTypesControllers = require('../controllers/loan_type');

const authUser = require('../middlewares/auth-user');
const getPermissions = require('../middlewares/get-permissions');
const isAdmin = require('../middlewares/isAdmin');

const router = express.Router();

router.get('/:orgId' , authUser, getPermissions, isAdmin, loanTypesControllers.getLoanTypes);

router.post('/' , authUser, getPermissions, isAdmin, loanTypesControllers.postLoanType);

router.put('/' , authUser, getPermissions, isAdmin, loanTypesControllers.putLoanType);

router.delete('/:id' , authUser, getPermissions, isAdmin, loanTypesControllers.deleteLoanType);

module.exports = router;