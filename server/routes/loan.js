const express = require('express');

const loanControllers = require('../controllers/loan');

const router = express.Router();

const authUser = require('../middlewares/auth-user');
const getPermissions = require('../middlewares/get-permissions');
const isAdmin = require('../middlewares/isAdmin');

router.get('/all/:orgId' , authUser, getPermissions, isAdmin , loanControllers.getAllLoansForOrganization);

router.put('/settle/:loanId' , authUser,loanControllers.putApproveLoan);

router.get('/:empId', authUser , loanControllers.getLoan);

router.post('/', authUser , loanControllers.postLoan);

router.put('/' ,authUser , loanControllers.putLoan);

router.delete('/:id', authUser, getPermissions, isAdmin , loanControllers.deleteLoan);

module.exports = router;