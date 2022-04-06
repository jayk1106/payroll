const Loan_type = require('../models/loan_type');

module.exports.getLoanTypes = async (req,res,next) => {
    const orgId = req.params.orgId;

    try {
        const result = await Loan_type.fetchAll(orgId);

        res.status(200).json({
            message : "All loan types",
            loanTypes : result.rows
        })
    } catch (err) {
        if(err.statusCode) err.statusCode = 500;
        next(err);
    }
}

module.exports.postLoanType = async (req,res,next) => {
    
    const lt_title = req.body.lt_title;
    const lt_description = req.body.lt_description;
    const lt_limit = req.body.lt_limit;
    const organization = req.body.organization;

    try {
        const loan_type = new Loan_type({
            lt_title, lt_description, lt_limit, organization
        })
        const result = await loan_type.save();

        res.status(201).json({
            message : "New loan type added!",
            loanType : result.rows[0]
        })
    } catch (err) {
        if(err.statusCode) err.statusCode = 500;
        next(err);
    }
}

module.exports.putLoanType = async (req,res,next) => {
    const id = req.body.id;
    const lt_title = req.body.lt_title;
    const lt_description = req.body.lt_description;
    const lt_limit = req.body.lt_limit;

    try {
        const result = await Loan_type.update({id , lt_title , lt_description, lt_limit});

        res.status(200).json({
            message : "Loan type updated!",
            loanType : result.rows[0]
        })
    } catch (err) {
        if(err.statusCode) err.statusCode = 500;
        next(err);
    }
}

module.exports.deleteLoanType = async (req,res,next) => {
    const id = req.params.id;
    try {
        await Loan_type.deleteById(id);
        res.status(200).json({
            message : "Loan type deleted"
        })
    } catch (err) {
        if(err.statusCode) err.statusCode = 500;
        next(err);
    }
}