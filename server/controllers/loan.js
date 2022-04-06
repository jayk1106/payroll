const Loan = require('../models/loan');

module.exports.getLoan = async (req,res,next) => {
    const empId = req.params.empId;
    try {
        const result = await Loan.fetchAll(empId);
        res.status(200).json({
            message : "All Loans of this employee",
            loans : result.rows
        })
    } catch (err) {
        if(err.statusCode) err.statusCode = 500;
        next(err);
    }
}

module.exports.postLoan = async (req,res,next) => {
    
    const title = req.body.title;
    const description = req.body.description;
    const type = req.body.type;
    const employee = req.body.employee;

    try {
        const loan = new Loan({title , description, type, employee});
        const result = await loan.save();
        res.status(201).json({
            message : "Loan added",
            loan : result.rows[0]
        })
    } catch (err) {
        if(err.statusCode) err.statusCode = 500;
        next(err);
    }
}

module.exports.putLoan = async (req,res,next) => {
    const id = req.body.id;
    const title = req.body.title;
    const description = req.body.description;
    const type = req.body.type;

    try {
        const result = await Loan.update({id, title, description, type});
        
        res.status(200).json({
            message : "Loan updated",
            loan : result.rows[0]
        })

    } catch (err) {
        if(err.statusCode) err.statusCode = 500;
        next(err);
    }
}

module.exports.deleteLoan = async (req,res,next) => {

    const id = req.params.id;
    try {
        await Loan.deleteById(id);
        res.status(200).json({
            message : "Loan deleted"
        })
    } catch (err) {
        if(err.statusCode) err.statusCode = 500;
        next(err);
    }
}