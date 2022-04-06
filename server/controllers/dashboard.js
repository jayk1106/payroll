const Credit = require('../models/credit');
const Loan = require('../models/loan');
const Leave = require('../models/leave');
const Salary = require('../models/salary');
const Employee = require('../models/employee');

module.exports.getDashboard = async (req,res,next) => {
    try {
        let sum = 0;

        // pending requests
        let result = await Credit.numberOfPending();
        if(result.rows[0].count) sum += +result.rows[0].count;

        result = await Loan.numberOfPending();
        if(result.rows[0].count) sum += +result.rows[0].count;

        result = await Leave.numberOfPending();
        if(result.rows[0].count) sum += +result.rows[0].count;
        
        // total employees
        result = await Employee.numberOfEmployees();
        const totalEmployees = +result.rows[0].count;

        //pending salary
        result = await Salary.pendingAmount();
        const pendingSalary = +result.rows[0].sum;

        // paid salary
        result = await Salary.spendAmount();
        const paidSalary = +result.rows[0].sum;

        res.status(200).json({
            message : 'Dashboard details',
            pendingRequests : sum,
            totalEmployees : totalEmployees,
            pendingSalary : pendingSalary,
            paidSalary : paidSalary
        });
    } catch (err) {
        if(err.statusCode) err.statusCode = 500;
        next(err);
    }
}