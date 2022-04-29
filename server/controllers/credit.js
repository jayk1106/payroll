const Credit = require('../models/credit');

module.exports.getCredits = async (req,res,next) => {
    const empId = req.params.empId;
    try {
        const result = await Credit.fetchAll(empId);
        res.status(200).json({
            message : "All Credits of this employee",
            credits : result.rows
        })
    } catch (err) {
        if(err.statusCode) err.statusCode = 500;
        next(err);
    }
}

module.exports.getAllOrganizationsCredits = async (req,res,next) => {
    const orgId = req.params.orgId;
    try {
        const result = await Credit.fetchAllForOrganization(orgId);
        res.status(200).json({
            message : "All Credits for organization",
            credits : result.rows
        })
    } catch (err) {
        if(err.statusCode) err.statusCode = 500;
        next(err);
    }
}


module.exports.putSettleCredit = async (req,res,next) => {
    const creditId = req.params.creditId;
    const isReject = req.query.reject;
    // console.log(req.query);
    // return res.status(200).json('');
    try {
        const result = await Credit.settleCredit(creditId , isReject === 'true' );
        res.status(200).json({
            message : `This credit was ${isReject === 'true' ? 'rejected' : 'approved'}`
        })
    } catch (err) {
        if(err.statusCode) err.statusCode = 500;
        next(err);
    }
} 

module.exports.postCredit = async (req,res,next) => {
    
    const title = req.body.title;
    const description = req.body.description;
    const type = req.body.type;
    const employee = req.body.employee;
    const amount = req.body.amount;

    try {
        const credit = new Credit({title , description, type, employee,amount});
        const result = await credit.save();
        res.status(201).json({
            message : "Credit added",
            credit : result.rows[0]
        })
    } catch (err) {
        if(err.statusCode) err.statusCode = 500;
        next(err);
    }
}

module.exports.putCredits = async (req,res,next) => {
    const id = req.body.id;
    const title = req.body.title;
    const description = req.body.description;
    const type = req.body.type;

    try {
        const result = await Credit.update({id, title, description, type});
        res.status(200).json({
            message : "credit updated",
            credit : result.rows[0]
        })

    } catch (err) {
        if(err.statusCode) err.statusCode = 500;
        next(err);
    }
}

module.exports.deleteCredit = async (req,res,next) => {

    const id = req.params.id;
    try {
        await Credit.deleteById(id);
        res.status(200).json({
            message : "Credit deleted"
        })
    } catch (err) {
        if(err.statusCode) err.statusCode = 500;
        next(err);
    }
}