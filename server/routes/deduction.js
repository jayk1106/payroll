const express = require('express');

const deductionControllers = require('../controllers/deduction');

const router = express.Router();

router.get('/:empId' , deductionControllers.getDeduction);

router.post('/' , deductionControllers.postDeduction);

router.put('/' , deductionControllers.putDeduction);

router.delete('/:id' , deductionControllers.deleteDeduction);

module.exports = router;