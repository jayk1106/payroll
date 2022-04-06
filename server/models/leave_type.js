const pool = require('../util/database');

module.exports = class Leave_type{
    constructor(lt){
        this.lt_title = lt.lt_title;
        this.lt_description = lt.lt_description;
        this.limit_per_year = lt.limit_per_year;
        this.organization = lt.organization;
    }

    save(){
        return pool.query(`INSERT INTO leave_types (lt_title , lt_description, organization , limit_per_year) VALUES ($1,$2,$3,$4) RETURNING *`,[this.lt_title, this.lt_description, this.organization , this.limit_per_year]);
    }

    static update(lt){
        return pool.query(`UPDATE leave_types SET lt_title = $1, lt_description = $2, limit_per_year = $3  WHERE id = $4 RETURNING *`,[lt.lt_title , lt.lt_description , lt.limit_per_year , lt.id]);
    }

    static fetchAll(organization){
        return pool.query(`SELECT * FROM leave_types WHERE organization = $1`,[organization]);
    }

    static deleteById(id){
        return pool.query(`DELETE FROM leave_types WHERE id = $1`,[id]);
    }
}

