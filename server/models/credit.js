const pool = require('../util/database');

module.exports = class Credit{
    constructor(cr){
        this.title = cr.title;
        this.description = cr.description;
        this.type = cr.type;
        this.employee = cr.employee;
        this.amount = cr.amount;
    }

    save(){
        return pool.query(`INSERT INTO credits (title, description, type, employee, amount) VALUES ($1, $2, $3, $4, $5) RETURNING *`,[this.title, this.description, this.type, this.employee, this.amount]);
    }

    static fetchAll(employee){
        return pool.query(`SELECT * FROM credits WHERE employee = $1`,[employee]);
    }
    static fetchAllForOrganization(orgId){
        return pool.query(`SELECT credits.id, credits.status, credits.title, credits.description, credits.amount, credits.employee ,credits.approve_date, credits.date , credits.is_settled ,employees.e_fname, employees.e_lname, employees.e_email FROM employees JOIN credits ON employees.id = credits.employee JOIN credits_types ON credits.type = credits_types.id WHERE employees.organization = $1 ORDER BY date DESC`,[orgId]);
    }
    static settleCredit(creditId, isRejected = false){ 
        const status = isRejected ? 'Rejected' : 'Approved';
        return pool.query(`UPDATE credits SET status = $1, approve_date = CURRENT_DATE , is_settled = TRUE WHERE id = $2`, [status ,creditId]);
    }
    static update(cr){
        return pool.query(`UPDATE credits SET title = $1, description = $2, type = $3 WHERE id = $4 RETURNING *` , [cr.title, cr.description, cr.type, cr.id]);
    }

    static deleteById(id){
        return pool.query(`DELETE FROM credits WHERE id = $1`, [id]);
    }

    static numberOfPending(orgId){
        return pool.query(`SELECT COUNT(credits.id) from credits JOIN employees ON credits.employee = employees.id WHERE status = 'Pending' AND employees.organization = $1`,[orgId]);
    }
}