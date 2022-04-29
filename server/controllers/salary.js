const Salary = require('../models/salary');
const Credit = require('../models/credit');
const Loan = require('../models/loan');
const Deduction = require('../models/deduction');
const Leave = require('../models/leave');
const Activity = require('../models/activity');

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

module.exports.getById = async (req,res,next) => {
    const id = req.params.id;
    try {
        const result = await Salary.fetchById(id);
        res.status(200).json({
            message : "Salary details",
            salary : result.rows[0]
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


function getDay(month,year){
    const monthsDays = new Map([ [1,31], [2,28], [2,31], [4,30], [5,31], [6,30], [7,31], [8,31], [9,30], [10,31], [11,30], [12,31] ]);
    if( month === 2 && year%4 === 0 ){
        return 29;
    }
    return monthsDays.get(month);
}

module.exports.generateSalary = async (req, res, next) => {
    const empId = req.params.empId;
    const month = +req.query.month;
    const year = +req.query.year;

    if( !month && !year ){
        return res.status(400).json({
            message : "Enter valid parametters"
        })
    }
    let amount;
    let start_date = `${year}-${month}-01`;
    let end_date = `${year}-${month}-${getDay(month,year)}`;
    let duration_in_days = getDay(month, year);
    let duration_in_months = 1;
    let tax_amount = 0;
    let total_credits;
    let total_deductions;
    let total_loans;
    let employee= empId;

    try {
        // 1. Find total credits for this month
        let result = await Credit.sumOfApprovedCredits(empId, month, year);
        total_credits = result.rows[0].sum ? +result.rows[0].sum : 0;
        
        // 2. Find total loans for this month
        result = await Loan.sumOfApprovedLoans(empId, month, year);
        total_loans = result.rows[0].sum ? +result.rows[0].sum : 0;

        // 3. Find total deduction for this month
        result = await Deduction.sumOfDeduction(empId, month, year);
        total_deductions = result.rows[0].sum ? +result.rows[0].sum : 0;

        // 4. Find salary
        result = await Salary.getMonthlySalary(empId);
        amount = result.rows[0].e_salary_per_year/12 + total_credits - total_deductions - total_loans;

        // 5. Get Num of leaves
        result = await Leave.getNumLeavePerMonth(empId, month, year);
        duration_in_days -= result.rows[0].sum ? result.rows[0].sum : 0; 

        // 6. Generate salary for the employee
        // console.log({ amount, start_date, end_date, duration_in_days, duration_in_months, tax_amount, total_credits, total_deductions, total_loans, employee})
        const salary = new Salary({ amount, start_date, end_date, duration_in_days, duration_in_months, tax_amount, total_credits, total_deductions, total_loans, employee});
        result = await salary.save();

        res.status(201).json({
            message : "Salary Generated",
            salary : result.rows[0]
        })

        const activity = new Activity({
            type : "Salary Generated",
            message : "New salary generated in your account",
            employee : empId
        })

        await activity.save();
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

module.exports.putApprove = async (req,res,next) => {
    
    const id = req.params.id;

    try {
        const result = await Salary.approveSalary(id);
        res.status(200).json({
            message : "Salary approved successfully",
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