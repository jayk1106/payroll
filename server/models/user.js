const pool = require('../util/database');

module.exports = class User{
    constructor(user){
        this.user_fname = user.user_fname;
        this.user_lname = user.user_lname;
        this.user_email = user.user_email;
        this.user_password = user.user_password;
    }

    save(){
        return pool.query("INSERT INTO users (id , user_fname , user_lname , user_email , user_password) VALUES ( uuid_generate_v4() , $1 , $2 , $3 , $4) RETURNING id , user_email , user_fname , user_lname" , [this.user_fname , this.user_lname , this.user_email , this.user_password]);
    }

    static fetchAllUser(){
        return pool.query("SELECT * FROM users")
    }

    static async isPresent(coulmnName , value){
        const result = await pool.query(`SELECT * FROM users WHERE ${coulmnName} = $1` , [value]);
        if(result.rowCount > 0) return true;
        return false;
    }

    static find(coulmnName , value){
        return pool.query(`SELECT * FROM users WHERE ${coulmnName} = $1` , [value]);
    }

    static updateById(id , user){
        return pool.query(`UPDATE users SET user_fname = $1 , user_lname = $2  WHERE id = $3 RETURNING id , user_email , user_fname , user_lname` , [user.user_fname , user.user_lname ,  id]);
    }

    static deleteById(id){
        return pool.query(`DELETE FROM users WHERE id = $1`,[id]);
    }
}