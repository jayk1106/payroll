const express = require('express');
const cors = require('cors');

const userRoutes = require('./routes/user');
const orgRoutes = require('./routes/organization');
const branchRoutes = require('./routes/branch');
const empRoutes = require('./routes/employee');
const departmentRoutes = require('./routes/department');
const creditsTypeRoutes = require('./routes/credits_type');
const deductionTypeRoutes  = require('./routes/deduction_type');
const loanTypeRoutes = require('./routes/loan_type');
const leaveTypeRoutes = require('./routes/leave_type');
const creditRoutes = require('./routes/credit');
const deductionRoutes = require('./routes/deduction');
const loanRoutes = require('./routes/loan');
const leaveRoutes = require('./routes/leave');
const salaryRoutes = require('./routes/salary');
const taxRoutes = require('./routes/tax');
const activityRoutes = require('./routes/activity');
const generalRoutes = require('./routes/general');

const app = express();

// For allowing request
app.use(cors());
// app.use((req,res,next) => {
//     console.log(req.method);
//     res.setHeader('Access-Control-Allow-Origin' , '*'); // also give some specific domains like 'xyz.com,abc.com'
//     res.setHeader('Access-Control-Allow-Methods' , 'GET,POST,PUT,PATCH,DELETE,OPTIONS');
//     res.setHeader('Access-Control-Allow-Headers' , 'Content-Type , Authorization');
//     next();
// })



// For parsing json 
app.use(express.json());

app.use('/api/v1/user' , userRoutes);
app.use('/api/v1/organization' , orgRoutes);
app.use('/api/v1/branch' , branchRoutes);
app.use('/api/v1/employee' , empRoutes);
app.use('/api/v1/department' , departmentRoutes);
app.use('/api/v1/credits-type' , creditsTypeRoutes);
app.use('/api/v1/deduction-type' , deductionTypeRoutes);
app.use('/api/v1/loan-type', loanTypeRoutes);
app.use('/api/v1/leave-type', leaveTypeRoutes);
app.use('/api/v1/credit', creditRoutes);
app.use('/api/v1/deduction', deductionRoutes);
app.use('/api/v1/loan' , loanRoutes);
app.use('/api/v1/leave' , leaveRoutes);
app.use('/api/v1/salary' , salaryRoutes);
app.use('/api/v1/tax' , taxRoutes);
app.use('/api/v1/activity' , activityRoutes);
app.use('/api/v1/general', generalRoutes);


// error handling
app.use( (err , req , res ,next) => {
    console.log(err);
    const message = err.message;
    const statusCode = err.statusCode || 500;
    
    res.status(statusCode).json({
        error : message
    })
})

app.listen(8080 , () => {
    console.log("Server is running on port 8080");
})