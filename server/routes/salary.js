const express = require('express');

const salaryControllers = require('../controllers/salary');

const authUser = require('../middlewares/auth-user');
const getPermissions = require('../middlewares/get-permissions');
const isAdmin = require('../middlewares/isAdmin');

const router = express.Router();

router.get('/all/:orgId' , authUser, getPermissions, isAdmin , salaryControllers.getAllSalaryForOrganization);

router.get('/get/:id', authUser, salaryControllers.getById);

router.get('/:empId', authUser, salaryControllers.getSalary);

router.post('/', authUser, salaryControllers.postSalary);

router.put('/generate-salary/:empId', authUser, getPermissions, isAdmin , salaryControllers.generateSalary);

router.put('/', authUser, salaryControllers.putSalary);

router.put('/approve/:id', authUser, getPermissions, isAdmin , salaryControllers.putApprove);

router.delete('/:id', authUser, getPermissions, isAdmin , salaryControllers.deleteSalary);

module.exports = router;