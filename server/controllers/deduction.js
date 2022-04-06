const Deduction = require('../models/deduction');

module.exports.getDeduction = async (req,res,next) => {
    const empId = req.params.empId;
    try {
        const result = await Deduction.fetchAll(empId);
        res.status(200).json({
            message : "All deductions of this employee",
            deductions : result.rows
        })
    } catch (err) {
        if(err.statusCode) err.statusCode = 500;
        next(err);
    } 
}

module.exports.postDeduction = async (req,res,next) => {
    
    const title = req.body.title;
    const description = req.body.description;
    const type = req.body.type;
    const employee = req.body.employee;

    try {
        const deduction = new Deduction({title , description, type, employee});
        const result = await deduction.save();
        res.status(201).json({
            message : "Deduction added",
            deduction : result.rows[0]
        })
    } catch (err) {
        if(err.statusCode) err.statusCode = 500;
        next(err);
    }
}

module.exports.putDeduction = async (req,res,next) => {
    const id = req.body.id;
    const title = req.body.title;
    const description = req.body.description;
    const type = req.body.type;

    try {
        const result = await Deduction.update({id, title, description, type});
        
        res.status(200).json({
            message : "Deduction updated",
            deduction : result.rows[0]
        })

    } catch (err) {
        if(err.statusCode) err.statusCode = 500;
        next(err);
    }
}

module.exports.deleteDeduction = async (req,res,next) => {

    const id = req.params.id;
    try {
        await Deduction.deleteById(id);
        res.status(200).json({
            message : "Deduction deleted"
        })
    } catch (err) {
        if(err.statusCode) err.statusCode = 500;
        next(err);
    }
}