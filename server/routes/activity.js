const express = require('express');

const activityControllers = require('../controllers/activity');

const router = express.Router();

const authUser = require('../middlewares/auth-user');

router.get('/:empId' ,authUser, activityControllers.getActivities);

router.post('/' , authUser, activityControllers.postActivity);

router.get('/clear/:empId',authUser, activityControllers.clearActivities);

module.exports = router;