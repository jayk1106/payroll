const pool = require('../util/database');

module.exports = class Salary{
    constructor(salary){
        this.amount = salary.amount;
        this.start_date = salary.start_date;
        this.end_date = salary.end_date;
        this.duration_in_days = salary.duration_in_days;
        this.duration_in_months = salary.duration_in_months;
        this.tax_amount = salary.tax_amount;
        this.total_credits = salary.total_credits;
        this.total_deductions = salary.total_deductions;
        this.total_loans = salary.total_loans;
        this.employee = salary.employee;
    }

    save(){
        return pool.query(`INSERT INTO salary (amount, start_date, end_date, duration_in_days, duration_in_months, tax_amount, total_credits, total_deductions, total_loans, employee) 
        VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) RETURNING *`,
        [this.amount,this.start_date,this.end_date,this.duration_in_days,this.duration_in_months,this.tax_amount,this.total_credits,this.total_deductions,this.total_loans,this.employee]
        );
    }

    static update(salary){
        return pool.query(`UPDATE salary SET amount = $1, start_date = $2, end_date = $3, duration_in_days = $4, duration_in_months = $5, tax_amount = $6, total_credits = $7, total_deductions = $8, total_loans = $9 WHERE id = $10 RETURNING *`,
        [salary.amount, salary.start_date, salary.end_date, salary.duration_in_days, salary.duration_in_months, salary.tax_amount, salary.total_credits, salary.total_deductions, salary.total_loans, salary.id ] 
        );
    }

    static fetchAll(employee){
        return pool.query(`SELECT * FROM salary WHERE employee = $1`,[employee]);
    }

    static deleteById(id){
        return pool.query(`DELETE FROM salary WHERE id = $1`, [id]);
    }
}