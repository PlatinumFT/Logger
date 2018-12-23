const { Pool } = require('pg');
const pool = new Pool({
    user: 'logger',
    host: 'localhost',
    database: 'logger',
    password: 'logger',
    port: 5432,
});

module.exports = async (q) => {
    const res = await pool.query(q);
    return res.rows
}