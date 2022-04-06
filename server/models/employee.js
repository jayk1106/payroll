const pool = require('../util/database');

module.exports = class Employee{
    constructor(emp){
        this.e_fname = emp.e_fname;
        this.e_lname = emp.e_lname;
        this.e_email = emp.e_email;
        this.e_password = emp.e_password;
        this.e_gender = emp.e_gender;
        this.e_age = emp.e_age;
        this.join_date = emp.join_date;
        this.payout_time = emp.payout_time;
        this.e_salary_per_year = emp.e_salary_per_year;
        this.department = emp.department;
        this.branch = emp.branch;
        this.permissions = emp.permissions;
        this.organization = emp.organization;
    }

    save(){
        return pool.query(`INSERT INTO employees ( id, e_fname, e_lname, e_email, e_password, e_gender, e_age, join_date, payout_time, e_salary_per_year, department, branch, permissions, organization ) 
                VALUES ( uuid_generate_v4() , $1 , $2, $3, $4, $5, $6, $7, $8, $9 , $10, $11, $12 , $13) RETURNING *`,
                [this.e_fname , this.e_lname, this.e_email, this.e_password , this.e_gender, this.e_age, this.join_date, this.payout_time, this.e_salary_per_year, this.department, this.branch, this.permissions, this.organization]
        )
    }

    static fetchAll(){
        return pool.query(`SELECT * FROM employees`);
    }

    static find(columnName , value){
        return pool.query(`SELECT * FROM employees WHERE ${columnName} = $1` , [value]);
    }

    static update(emp){
        return pool.query(`UPDATE employees SET e_fname = $1, e_lname = $2, e_email = $3, e_gender = $4, e_age = $5, join_date = $6, payout_time = $7, e_salary_per_year = $8, department = $9, branch = $10, permissions = $11 WHERE id = $12 RETURNING *`,
        [emp.e_fname , emp.e_lname , emp.e_email , emp.e_gender , emp.e_age, emp.join_date , emp.payout_time, emp.e_salary_per_year, emp.department, emp.branch , emp.permissions , emp.id]
        );
    }

    static deleteById(id){
        return pool.query(`DELETE FROM employees WHERE id = $1` , [id]);
    }

}