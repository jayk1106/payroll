const pool = require('../util/database');

module.exports = class Department{
    constructor(dp){
        this.dp_name = dp.dp_name,
        this.dp_description = dp.dp_description,
        this.organization = dp.organization
    }

    save(){
        return pool.query(`INSERT INTO departments (dp_name, dp_description, organization) VALUES ($1, $2, $3) RETURNING *` , [this.dp_name, this.dp_description, this.organization]);
    }

    static update(dp){
        return pool.query(`UPDATE departments SET dp_name = $1, dp_description = $2 WHERE id = $3 RETURNING *`,[dp.dp_name , dp.dp_description , dp.id]);
    }

    static fetchAll(organization){
        return pool.query(`SELECT * FROM departments WHERE organization = $1`,[organization]);
    }

    static deleteById(id){
        return pool.query(`DELETE FROM departments WHERE id = $1`,[id]);
    }
}    