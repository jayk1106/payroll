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
        return pool.query(`INSERT INTO employees ( e_fname, e_lname, e_email, e_password, e_gender, e_age, join_date, e_salary_per_year, department, branch, organization ) 
                VALUES ( $1 , $2, $3, $4, $5, $6, $7, $8, $9 , $10, $11) RETURNING *`,
                [this.e_fname , this.e_lname, this.e_email, this.e_password , this.e_gender, this.e_age, this.join_date, this.e_salary_per_year, this.department, this.branch, this.organization]
        )
    }

    static fetchAllByOrg(orgId){
        return pool.query(`SELECT employees.id ,e_fname, e_lname, e_email, br_name, dp_name FROM employees JOIN branches ON employees.branch = branches.id JOIN departments ON employees.department = departments.id WHERE employees.organization = $1 ORDER BY created_at DESC`,[orgId]);
    }

    static find(columnName , value){
        return pool.query(`SELECT * FROM employees WHERE ${columnName} = $1` , [value]);
    }

    static findInOrganization(columnName , value, organization){
        return pool.query(`SELECT * FROM employees WHERE ${columnName} = $1 AND organization = $2` , [value, organization]);
    }

    static update(emp){
        return pool.query(`UPDATE employees SET e_fname = $1, e_lname = $2, e_email = $3, e_gender = $4, e_age = $5, join_date = $6, e_salary_per_year = $7, department = $8, branch = $9 WHERE id = $10 RETURNING *`,
        [emp.e_fname , emp.e_lname , emp.e_email , emp.e_gender , emp.e_age, emp.join_date , emp.e_salary_per_year, emp.department, emp.branch , emp.id]
        );
    }

    static deleteById(id){
        return pool.query(`DELETE FROM employees WHERE id = $1` , [id]);
    }

    static numberOfEmployees(){
        return pool.query(`SELECT COUNT(id) from employees`);
    }

    static latestEmployees(num){
        return pool.query(``);
    }

    static getEmployeeProfile(id){
        return pool.query(`SELECT employees.id, e_fname, e_lname, e_email, e_gender, e_age, employees.join_date, employees.end_date, department,  branch, employees.organization, e_salary_per_year, payout_time, br_name, dp_name FROM employees JOIN branches ON employees.branch = branches.id JOIN departments ON employees.department = departments.id WHERE employees.id = $1`,[id]);
    }

    static makeAdmin(id){
        return pool.query(`UPDATE employees SET permissions = 'c40441eb-06ae-4b67-8cd4-fc15ced1a94e' WHERE id = $1`, [id]);
    }
}   