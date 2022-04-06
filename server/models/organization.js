const pool = require('../util/database');

module.exports = class Organization{
    constructor(org){
        this.org_name = org.org_name;
        this.org_city = org.org_city;
        this.org_country = org.org_country;
        this.org_address = org.org_address;
        this.org_user = org.org_user;
    }

    save(){
        return pool.query("INSERT INTO organization (id , org_name , org_city , org_country , org_address , org_user ) VALUES ( uuid_generate_v4() , $1 , $2 , $3 , $4 , $5) RETURNING *" , [this.org_name , this.org_city , this.org_country , this.org_address , this.org_user]);
    }
    static fetchAll(){
        return pool.query("SELECT * FROM organization");
    }
    static update(org){
        return pool.query("UPDATE organization SET org_name = $1 , org_city = $2 , org_country = $3 , org_address = $4 WHERE id = $5 RETURNING *" , [org.org_name , org.org_city , org.org_country , org.org_address , org.id]);
    }
    static deleteById(id){
        return pool.query("DELETE FROM organization WHERE id = $1" , [id]);
    }
}