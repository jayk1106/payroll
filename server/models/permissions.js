const pool = require('../util/database');

module.exports.getAdminId = async () => {
    return pool.query('SELECT id FROM permissions WHERE read = TRUE AND write = TRUE AND approve = TRUE');
};