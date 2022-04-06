const pool = require('../util/database');

module.exports = class Credites_type{
    constructor(ct){
        this.ct_title = ct.ct_title;
        this.ct_description = ct.ct_description;
        this.ct_limit = ct.ct_limit;
        this.organization = ct.organization;
    }
    save(){
        return pool.query(`INSERT INTO credits_types (ct_title , ct_description, organization , ct_limit) VALUES ($1,$2,$3,$4) RETURNING *`,[this.ct_title, this.ct_description, this.organization , this.ct_limit]);
    }

    static update(ct){
        return pool.query(`UPDATE credits_types SET ct_title = $1, ct_description = $2, ct_limit = $3  WHERE id = $4 RETURNING *`,[ct.ct_title , ct.ct_description , ct.ct_limit , ct.id]);
    }

    static fetchAll(organization){
        return pool.query(`SELECT * FROM credits_types WHERE organization = $1`,[organization]);
    }

    static deleteById(id){
        return pool.query(`DELETE FROM credits_types WHERE id = $1`,[id]);
    }
}