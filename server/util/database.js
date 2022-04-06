const { Pool } = require('pg');

const pool = new Pool({
    user : 'postgres',
    host : 'localhost',
    port : 5432,
    password : 'jay1106',
    database : 'payroll'
})

module.exports = pool;