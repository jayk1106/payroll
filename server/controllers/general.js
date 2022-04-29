const Credit = require('../models/credit');
const Loan = require('../models/loan');
const Leave = require('../models/leave');
const Salary = require('../models/salary');
const Employee = require('../models/employee');

const Branch = require('../models/branch');
const Department = require('../models/department');

module.exports.getAdminStatus = (req, res, next) => {
    if(req.isAdmin){
        return res.status(200).json({
            message : "This user is an Admin",
            isAdmin : true,
            isUser : req.userId ? true : false
        })
    }
    res.status(200).json({
        message : "This user is not an Admin",
        isAdmin : false,
        isUser : req.userId ? true : false
    })
}


module.exports.getDashboard = async (req,res,next) => {
    const orgId = req.params.orgId;
    const numOfEmp = req.query.numOfEmp;
    
    try {
        let sum = 0;

        // pending requests
        let result = await Credit.numberOfPending(orgId);
        if(result.rows[0].count) sum += +result.rows[0].count;
       
        result = await Loan.numberOfPending(orgId);
        if(result.rows[0].count) sum += +result.rows[0].count;
        
        result = await Leave.numberOfPending(orgId);
        if(result.rows[0].count) sum += +result.rows[0].count;
        
        // total employees
        result = await Employee.numberOfEmployees(orgId);
        const totalEmployees = +result.rows[0].count;
        
        //pending salary
        result = await Salary.pendingAmount(orgId);
        const pendingSalary = +result.rows[0].sum;
    
        // paid salary
        result = await Salary.spendAmount(orgId);
        const paidSalary = +result.rows[0].sum;
        
        // get latest employees
        result = await Employee.latestEmployees( numOfEmp || 3 ,orgId);
        const latestEmp = result.rows;

        res.status(200).json({
            message : 'Dashboard details',
            pendingRequests : sum,
            totalEmployees : totalEmployees,
            pendingSalary : pendingSalary,
            paidSalary : paidSalary,
            latestEmployees : latestEmp
        });
    } catch (err) {
        if(err.statusCode) err.statusCode = 500;
        next(err);
    }
}


module.exports.getFormSelectValues = async (req,res,next) => {

    const orgId = req.params.orgId;
    try {
        let result = await Branch.fetchAll(orgId);
        const branches = result.rows;
        result = await Department.fetchAll(orgId);
        const departments = result.rows;
        res.status(200).json({
            message : "Form select values",
            departments,
            branches
        });
    } catch (err) {
        if(err.statusCode) err.statusCode = 500;
        next(err);
    }
}