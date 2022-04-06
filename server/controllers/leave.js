const Leave = require('../models/leave');

module.exports.getLeaves = async (req,res,next) => {
    const empId = req.params.empId;
    try {
        const result = await Leave.fetchAll(empId);
        res.status(200).json({
            message : "All Leaves of this employee",
            leaves : result.rows
        })
    } catch (err) {
        if(err.statusCode) err.statusCode = 500;
        next(err);
    }
}

module.exports.postLeave = async (req,res,next) => {
    
    const title = req.body.title;
    const description = req.body.description;
    const duration_in_days = req.body.duration_in_days;
    const start_date = req.body.start_date;
    const end_date = req.body.end_date;
    const type = req.body.type;
    const employee = req.body.employee;

    try {
        const leave = new Leave({title , description, type, employee , duration_in_days, start_date, end_date});
        const result = await leave.save();
        res.status(201).json({
            message : "Leave added",
            leave : result.rows[0]
        })
    } catch (err) {
        if(err.statusCode) err.statusCode = 500;
        next(err);
    }
}

module.exports.putLeave = async (req,res,next) => {
    const id = req.body.id;
    const title = req.body.title;
    const description = req.body.description;
    const duration_in_days = req.body.duration_in_days;
    const start_date = req.body.start_date;
    const end_date = req.body.end_date;
    const type = req.body.type;

    try {
        const result = await Leave.update({id, title, description, type , duration_in_days, start_date, end_date});

        res.status(200).json({
            message : "Leave updated",
            leave : result.rows[0]
        })

    } catch (err) {
        if(err.statusCode) err.statusCode = 500;
        next(err);
    }
}

module.exports.deleteLeave = async (req,res,next) => {

    const id = req.params.id;
    try {
        await Leave.deleteById(id);
        res.status(200).json({
            message : "Leave deleted"
        })
    } catch (err) {
        if(err.statusCode) err.statusCode = 500;
        next(err);
    }
}