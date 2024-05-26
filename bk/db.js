const Pool = require("pg").Pool;

const pool =  new Pool({
    user:"akhil",
    password:"doorknob2023@",
    host:"localhost",
    port:5432,
    database:"postgres"
});


module.exports = pool;


