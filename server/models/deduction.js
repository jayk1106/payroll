const pool = require('../util/database');

module.exports = class Deduction{
    constructor(dr){
        this.title = dr.title;
        this.description = dr.description;
        this.type = dr.type;
        this.employee = dr.employee;
    }
 
    save(){
        return pool.query(`INSERT INTO deduction (title, description, type, employee) VALUES ($1, $2, $3, $4) RETURNING *`,[this.title, this.description, this.type, this.employee]);
    }

    static fetchAll(employee){
        return pool.query(`SELECT * FROM deduction WHERE employee = $1`,[employee]);
    }

    static update(dr){
        return pool.query(`UPDATE deduction SET title = $1, description = $2, type = $3 WHERE id = $4 RETURNING *` , [dr.title, dr.description, dr.type, dr.id]);
    }

    static deleteById(id){
        return pool.query(`DELETE FROM deduction WHERE id = $1`, [id]);
    }
}