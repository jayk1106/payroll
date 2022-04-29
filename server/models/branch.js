const pool = require('../util/database');

module.exports = class Branch{
    constructor(br){
        this.br_name = br.br_name;
        this.br_city = br.br_city;
        this.br_country = br.br_country;
        this.br_address = br.br_address;
        this.organization = br.organization;
    }

    save(){
        return pool.query(`INSERT INTO branches (id , br_name , br_city , br_country, br_address, organization)
        VALUES (uuid_generate_v4(), $1, $2, $3 , $4, $5) RETURNING *`,
        [this.br_name , this.br_city, this.br_country, this.br_address, this.organization]
        )
    }

    static fetchAll(orgId){
        return pool.query(`SELECT * FROM branches WHERE organization = $1`,[orgId]);
    }

    static update(br){
        return pool.query(`UPDATE branches SET br_name = $1, br_city = $2, br_country = $3, br_address = $4 WHERE id = $5 RETURNING *`,
        [ br.br_name , br.br_city, br.br_country, br.br_address, br.id]
        );
    }

    static deleteById(id){
        return pool.query(`DELETE FROM branches WHERE id = $1` , [id]);
    }
}