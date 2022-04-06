const pool = require('../util/database');

module.exports = class Deduction_type{
    constructor(dt){
        this.dt_title = dt.dt_title;
        this.dt_description = dt.dt_description;
        this.dt_limit = dt.dt_limit;
        this.organization = dt.organization;
    }

    save(){
        return pool.query(`INSERT INTO deduction_types (dt_title , dt_description, organization , dt_limit) VALUES ($1,$2,$3,$4) RETURNING *`,[this.dt_title, this.dt_description, this.organization , this.dt_limit]);
    }

    static update(dt){
        return pool.query(`UPDATE deduction_types SET dt_title = $1, dt_description = $2, dt_limit = $3  WHERE id = $4 RETURNING *`,[dt.dt_title , dt.dt_description , dt.dt_limit , dt.id]);
    }

    static fetchAll(organization){
        return pool.query(`SELECT * FROM deduction_types WHERE organization = $1`,[organization]);
    }

    static deleteById(id){
        return pool.query(`DELETE FROM deduction_types WHERE id = $1`,[id]);
    }
}

