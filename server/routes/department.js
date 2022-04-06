const express = require('express');

const departmentController = require('../controllers/department');

const authUser = require('../middlewares/auth-user');
const getPermissions = require('../middlewares/get-permissions');
const isAdmin = require('../middlewares/isAdmin');

const router = express.Router();

router.get('/' , authUser, getPermissions, isAdmin, departmentController.getDepartments);

router.post('/' , authUser, getPermissions, isAdmin, departmentController.postDepartment);

router.put('/' , authUser, getPermissions, isAdmin, departmentController.putDepartment);

router.delete('/:id' , authUser, getPermissions, isAdmin, departmentController.deleteDepartment);

module.exports = router;