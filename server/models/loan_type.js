const pool = require('../util/database');

module.exports = class Loan_type{
    constructor(lt){
        this.lt_title = lt.lt_title;
        this.lt_description = lt.lt_description;
        this.lt_limit = lt.lt_limit;
        this.organization = lt.organization;
    }

    save(){
        return pool.query(`INSERT INTO loan_types (lt_title , lt_description, organization , lt_limit) VALUES ($1,$2,$3,$4) RETURNING *`,[this.lt_title, this.lt_description, this.organization , this.lt_limit]);
    }

    static update(lt){
        return pool.query(`UPDATE loan_types SET lt_title = $1, lt_description = $2, lt_limit = $3  WHERE id = $4 RETURNING *`,[lt.lt_title , lt.lt_description , lt.lt_limit , lt.id]);
    }

    static fetchAll(organization){
        return pool.query(`SELECT * FROM loan_types WHERE organization = $1`,[organization]);
    }

    static deleteById(id){
        return pool.query(`DELETE FROM loan_types WHERE id = $1`,[id]);
    }
}

