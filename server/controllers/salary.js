const Salary = require('../models/salary');

module.exports.getSalary = async (req,res,next) => {
    const empId = req.params.empId;

    try {
        const result = await Salary.fetchAll(empId);
        
        res.status(200).json({
            message : "All Salaryies for this employee",
            salaries : result.rows
        })

    } catch (err) {
        if(err.statusCode) err.statusCode = 500;
        next(err);
    }
}

module.exports.getAllSalaryForOrganization = async (req,res,next) => {
    const orgId = req.params.orgId;
    const month = req.query.month;
    const year = req.query.year;

    try {

        if(month && year){
            if(year.length !== 4 || (+month < 1 && +month > 12 )){
                return res.status(400).send({
                    error : "Send valid query parameters"
                });
            }
            const result = await Salary.fetchAllForOrganization(orgId , +month , +year);
            // console.log(result.rows);
            return res.status(200).json({
            message : "All salaries for this organization",
            salaries : result.rows
        })
        }

        const result = await Salary.fetchAllForOrganization(orgId);
        // console.log(result.rows);
        res.status(200).json({
            message : "All salaries for this organization",
            salaries : result.rows
        })
    } catch (err) {
        if(err.statusCode) err.statusCode = 500;
        next(err);
    }
}

module.exports.postSalary = async (req,res,next) => {
    const amount = req.body.amount;
    const start_date = req.body.start_date;
    const end_date = req.body.end_date;
    const duration_in_days = req.body.duration_in_days;
    const duration_in_months = req.body.duration_in_months;
    const tax_amount = req.body.tax_amount;
    const total_credits = req.body.total_credits;
    const total_deductions = req.body.total_deductions;
    const total_loans = req.body.total_loans;
    const employee = req.body.employee;
    
    try {
        const salary = new Salary({ amount, start_date, end_date, duration_in_days, duration_in_months, tax_amount, total_credits, total_deductions, total_loans, employee});
        const result = await salary.save();

        res.status(201).json({
            message : "Salary added",
            salary : result.rows[0]
        })
    } catch (err) {
        if(err.statusCode) err.statusCode = 500;
        next(err);
    }
}

module.exports.putSalary = async (req,res,next) => {
    const id = req.body.id;
    const amount = req.body.amount;
    const start_date = req.body.start_date;
    const end_date = req.body.end_date;
    const duration_in_days = req.body.duration_in_days;
    const duration_in_months = req.body.duration_in_months;
    const tax_amount = req.body.tax_amount;
    const total_credits = req.body.total_credits;
    const total_deductions = req.body.total_deductions;
    const total_loans = req.body.total_loans;

    try {
        const result = await Salary.update({ id, amount, start_date, end_date, duration_in_days, duration_in_months, tax_amount, total_credits, total_deductions, total_loans});
        res.status(200).json({
            message : "Salary updated",
            salary : result.rows[0]
        })
    } catch (err) {
        if(err.statusCode) err.statusCode = 500;
        next(err); 
    }
}

module.exports.deleteSalary = async (req,res,next) => {
    const id = req.params.id;
    try {
        const result = await Salary.deleteById(id);
        console.log(result);
        res.status(200).json({
            message : "salary deleted"
        })
    } catch (err) {
        if(err.statusCode) err.statusCode = 500;
        next(err);
    }
}