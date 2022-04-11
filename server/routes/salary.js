const express = require('express');

const salaryControllers = require('../controllers/salary');

const router = express.Router();

router.get('/all/:orgId' , salaryControllers.getAllSalaryForOrganization);

router.get('/:empId' , salaryControllers.getSalary);

router.post('/' , salaryControllers.postSalary);

router.put('/' , salaryControllers.putSalary);

router.delete('/:id' , salaryControllers.deleteSalary);

module.exports = router;