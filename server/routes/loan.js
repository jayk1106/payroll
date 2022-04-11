const express = require('express');

const loanControllers = require('../controllers/loan');

const router = express.Router();

router.get('/all/:orgId' , loanControllers.getAllLoansForOrganization);

router.put('/settle/:loanId',loanControllers.putApproveLoan);

// router.put('/reject/:loanId',loanControllers);

router.get('/:empId' , loanControllers.getLoan);

router.post('/' , loanControllers.postLoan);

router.put('/' , loanControllers.putLoan);

router.delete('/:id' , loanControllers.deleteLoan);

module.exports = router;