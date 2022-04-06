const express = require('express');

const activityControllers = require('../controllers/activity');

const router = express.Router();

router.get('/:empId' , activityControllers.getActivities);

router.post('/' , activityControllers.postActivity);

router.get('/clear/:empId', activityControllers.clearActivities);

module.exports = router;