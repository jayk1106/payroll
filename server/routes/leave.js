const express = require('express');

const leaveControllers = require('../controllers/leave');

const router = express.Router();

router.get('/:empId' , leaveControllers.getLeaves);

router.post('/' , leaveControllers.postLeave);

router.put('/' , leaveControllers.putLeave);

router.delete('/:id' , leaveControllers.deleteLeave);

module.exports = router;