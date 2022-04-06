const Activity = require('../models/activity');

module.exports.getActivities = async (req,res,next) => {
    const empId = req.params.empId;

    try {
        const result = await Activity.fetchAll(empId);
        res.status(200).json({
            message : "All activities of this employee",
            activities : result.rows
        })
    } catch (err) {
        if(err.statusCode) err.statusCode = 500;
        next(err);
    }
}

module.exports.postActivity = async (req, res, next) => {
    const type = req.body.type;
    const message = req.body.message;
    const employee = req.body.employee;

    try {
        const activity = new Activity({type, message, employee});
        const result = await activity.save();

        res.status(201).json({
            message : "Activity added",
            activity : result.rows[0]
        })
    } catch (err) {
        if(err.statusCode) err.statusCode = 500;
        next(err);
    }
}

module.exports.clearActivities = async (req,res,next) => {
    const empId = req.params.empId;

    try {
        await Activity.clear(empId);
        res.status(200).json({
            message : "cleared all activities"
        })
    } catch (err) {
        if(err.statusCode) err.statusCode = 500;
        next(err);
    }
}