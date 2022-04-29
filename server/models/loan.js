const pool = require('../util/database');

module.exports = class Loan{
    constructor(loan){
        this.title = loan.title;
        this.description = loan.description;
        this.type = loan.type;
        this.employee = loan.employee;
        this.amount = loan.amount;
    }

    save(){
        return pool.query(`INSERT INTO loans (title, description, type, employee, amount) VALUES ($1, $2, $3, $4, $5) RETURNING *`,[this.title, this.description, this.type, this.employee, this.amount]);
    }

    static fetchAll(employee){
        return pool.query(`SELECT loans.id, loans.status, loans.title, loans.description, loans.amount ,loans.approve_date, loans.date , loans.is_settled, loans.employee ,employees.e_fname, employees.e_lname, employees.e_email FROM employees JOIN loans ON employees.id = loans.employee JOIN loan_types ON loans.type = loan_types.id WHERE employees.id = $1 ORDER BY date DESC`,[employee]);
    }

    static update(loan){
        return pool.query(`UPDATE loans SET title = $1, description = $2, type = $3 WHERE id = $4 RETURNING *` , [loan.title, loan.description, loan.type, loan.id]);
    }
    static fetchAllForOrganization(orgId){
        return pool.query(`SELECT loans.id, loans.status, loans.title, loans.description, loans.amount ,loans.approve_date, loans.date , loans.is_settled, loans.employee ,employees.e_fname, employees.e_lname, employees.e_email FROM employees JOIN loans ON employees.id = loans.employee JOIN loan_types ON loans.type = loan_types.id WHERE employees.organization = $1 ORDER BY date DESC`,[orgId]);
    }
    static settleLoan(loanId,  isRejected = false){
        const status = isRejected ? 'Rejected' : 'Approved';
        return pool.query(`UPDATE loans SET status = $1, approve_date = CURRENT_DATE , is_settled = TRUE WHERE id = $2`, [ status, loanId]);
    }
    static deleteById(id){
        return pool.query(`DELETE FROM loans WHERE id = $1`, [id]);
    }
    static numberOfPending(orgId){
        return pool.query(`SELECT COUNT(loans.status) from loans JOIN employees ON loans.employee = employees.id WHERE status = 'Pending' AND employees.organization = $1`,[orgId]);
    }

    static sumOfApprovedLoans(empId , month, year){
        if(month && year){
            return pool.query(`SELECT SUM(amount) FROM loans WHERE is_settled = TRUE AND status = 'Approved' AND employee = $1 AND DATE_PART('month', approve_date) = $2 AND DATE_PART('year',approve_date) = $3`,[empId, month, year]);
        }
        return pool.query(`SELECT SUM(amount) FROM loans WHERE is_settled = TRUE AND status = 'Approved' AND employee = $1`,[empId]);
    }
}