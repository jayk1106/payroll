const pool = require('../util/database');

module.exports = class Activity{
    constructor(act){
        this.type = act.type;
        this.message = act.message;
        this.employee = act.employee;
    }

    save(){
        return pool.query(`INSERT INTO activities (type, message, employee) VALUES ($1,$2,$3) RETURNING *`,
        [this.type, this.message, this.employee]);
    }

    static fetchAll(employee){
        return pool.query(`SELECT * FROM activities WHERE employee = $1 ORDER BY date DESC`,[employee]);
    }

    static clear(employee){
        return pool.query(`DELETE FROM activities WHERE employee = $1`,[employee]);
    }
}