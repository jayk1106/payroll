const pool = require('../util/database');

module.exports = class Loan{
    constructor(loan){
        this.title = loan.title;
        this.description = loan.description;
        this.type = loan.type;
        this.employee = loan.employee;
    }

    save(){
        return pool.query(`INSERT INTO loans (title, description, type, employee) VALUES ($1, $2, $3, $4) RETURNING *`,[this.title, this.description, this.type, this.employee]);
    }

    static fetchAll(employee){
        return pool.query(`SELECT * FROM loans WHERE employee = $1`,[employee]);
    }

    static update(loan){
        return pool.query(`UPDATE loans SET title = $1, description = $2, type = $3 WHERE id = $4 RETURNING *` , [loan.title, loan.description, loan.type, loan.id]);
    }

    static deleteById(id){
        return pool.query(`DELETE FROM loans WHERE id = $1`, [id]);
    }
    static numberOfPending(){
        return pool.query(`SELECT COUNT(status) from loans WHERE status = 'Pending'`);
    }
}