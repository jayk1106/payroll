const express = require('express');

const leaveControllers = require('../controllers/leave');

const router = express.Router();

router.get('/all/:orgId' , leaveControllers.getAllLoansForOrganization);

router.get('/:empId' , leaveControllers.getLeaves);

router.put('/settle/:leaveId' , leaveControllers.putApproveLeave);

// router.put('/reject/:leaveId' , leaveControllers);

router.post('/' , leaveControllers.postLeave);

router.put('/' , leaveControllers.putLeave);

router.delete('/:id' , leaveControllers.deleteLeave);

module.exports = router;