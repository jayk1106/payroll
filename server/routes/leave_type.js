const express = require('express');

const leaveTypeControllers = require('../controllers/leave_type');

const authUser = require('../middlewares/auth-user');
const getPermissions = require('../middlewares/get-permissions');
const isAdmin = require('../middlewares/isAdmin');

const router = express.Router();

router.get('/:orgId' , authUser, getPermissions, isAdmin, leaveTypeControllers.getLeaveType);

router.post('/' , authUser, getPermissions, isAdmin, leaveTypeControllers.postLeaveType);

router.put('/' , authUser, getPermissions, isAdmin, leaveTypeControllers.putLeaveType);

router.delete('/:id' , authUser, getPermissions, isAdmin, leaveTypeControllers.deleteLeaveType);

module.exports = router;