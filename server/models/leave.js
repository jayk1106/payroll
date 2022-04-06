const pool = require('../util/database');

module.exports = class Leave{

    constructor(leave){
        this.title = leave.title;
        this.description = leave.description;
        this.duration_in_days = leave.duration_in_days;
        this.start_date = leave.start_date;
        this.end_date = leave.end_date;
        this.type = leave.type;
        this.employee = leave.employee;
    }

    save(){
        return pool.query(`INSERT INTO leaves (title, description, duration_in_days, start_date, end_date, type, employee) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,[this.title, this.description, this.duration_in_days, this.start_date, this.end_date, this.type, this.employee]);
    }

    static fetchAll(employee){
        return pool.query(`SELECT * FROM leaves WHERE employee = $1`,[employee]);
    }

    static update(leave){
        return pool.query(`UPDATE leaves SET title = $1, description = $2, duration_in_days = $3, start_date = $4, end_date = $5 ,type = $6  WHERE id = $7 RETURNING *` , [leave.title, leave.description, leave.duration_in_days, leave.start_date, leave.end_date, leave.type, leave.id]);
    }

    static deleteById(id){
        return pool.query(`DELETE FROM leaves WHERE id = $1`, [id]);
    } 

    static numberOfPending(){
        return pool.query(`SELECT COUNT(status) from leaves WHERE status = 'Pending'`);
    }
}