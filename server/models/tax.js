const pool = require('../util/database');

module.exports = class Tax{
    constructor(tax){
        this.title = tax.title;
        this.description = tax.description;
        this.tax_in_pr = tax.tax_in_pr;
        this.organization = tax.organization;
    }

    save(){
        return pool.query(`INSERT INTO taxes (title, description, tax_in_pr, organization) VALUES ($1,$2,$3,$4) RETURNING *`,
        [this.title, this.description, this.tax_in_pr, this.organization]
        );
    }

    static update(tax){
        return pool.query(`UPDATE taxes SET title = $1, description = $2, tax_in_pr = $3 WHERE id = $4 RETURNING *`,
        [tax.title, tax.description, tax.tax_in_pr, tax.id]
        );
    }

    static fetchAll(){
        return pool.query(`SELECT * FROM taxes`);
    }

    static deleteById(id){
        return pool.query(`DELETE FROM taxes WHERE id = $1`,[id]);
    }
}