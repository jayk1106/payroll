const pool = require('../util/database');

module.exports = class Credit{
    constructor(cr){
        this.title = cr.title;
        this.description = cr.description;
        this.type = cr.type;
        this.employee = cr.employee;
    }

    save(){
        return pool.query(`INSERT INTO credits (title, description, type, employee) VALUES ($1, $2, $3, $4) RETURNING *`,[this.title, this.description, this.type, this.employee]);
    }

    static fetchAll(employee){
        return pool.query(`SELECT * FROM credits WHERE employee = $1`,[employee]);
    }

    static update(cr){
        return pool.query(`UPDATE credits SET title = $1, description = $2, type = $3 WHERE id = $4 RETURNING *` , [cr.title, cr.description, cr.type, cr.id]);
    }

    static deleteById(id){
        return pool.query(`DELETE FROM credits WHERE id = $1`, [id]);
    }

    static numberOfPending(){
        return pool.query(`SELECT COUNT(id) from credits WHERE status = 'Pending'`);
    }
}