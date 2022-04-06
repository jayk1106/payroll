const Leave_type = require('../models/leave_type');

module.exports.getLeaveType = async (req,res,next) => {
    const orgId = req.params.orgId;

    try {
        const result = await Leave_type.fetchAll(orgId);

        res.status(200).json({
            message : "All leave types",
            leaveTypes : result.rows
        })
    } catch (err) {
        if(err.statusCode) err.statusCode = 500;
        next(err);
    }
}

module.exports.postLeaveType = async (req,res,next) => {
    
    const lt_title = req.body.lt_title;
    const lt_description = req.body.lt_description;
    const limit_per_year = req.body.limit_per_year;
    const organization = req.body.organization;

    try {
        const leave_type = new Leave_type({
            lt_title, lt_description, limit_per_year, organization
        })
        const result = await leave_type.save();

        res.status(201).json({
            message : "New loan type added!",
            leaveType : result.rows[0]
        })
    } catch (err) {
        if(err.statusCode) err.statusCode = 500;
        next(err);
    }
}

module.exports.putLeaveType = async (req,res,next) => {
    const id = req.body.id;
    const lt_title = req.body.lt_title;
    const lt_description = req.body.lt_description;
    const limit_per_year = req.body.limit_per_year;

    try {
        const result = await Leave_type.update({id , lt_title , lt_description, limit_per_year});

        res.status(200).json({
            message : "Loan type updated!",
            leaveType : result.rows[0]
        })
    } catch (err) {
        if(err.statusCode) err.statusCode = 500;
        next(err);
    }
}

module.exports.deleteLeaveType = async (req,res,next) => {
    const id = req.params.id;
    try {
        await Leave_type.deleteById(id);
        res.status(200).json({
            message : "Loan type deleted"
        })
    } catch (err) {
        if(err.statusCode) err.statusCode = 500;
        next(err);
    }
}