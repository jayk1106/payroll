const express = require('express');

const leaveControllers = require('../controllers/leave');

const router = express.Router();

const authUser = require('../middlewares/auth-user');
const getPermissions = require('../middlewares/get-permissions');
const isAdmin = require('../middlewares/isAdmin');

router.get('/all/:orgId', authUser, getPermissions, isAdmin , leaveControllers.getAllLoansForOrganization);

router.get('/:empId', authUser , leaveControllers.getLeaves);

router.put('/settle/:leaveId', authUser, getPermissions, isAdmin , leaveControllers.putApproveLeave);

// router.put('/reject/:leaveId' , leaveControllers);

router.post('/' , authUser, leaveControllers.postLeave);

router.put('/' , authUser, getPermissions, leaveControllers.putLeave);

router.delete('/:id', authUser, getPermissions, isAdmin , leaveControllers.deleteLeave);

module.exports = router;