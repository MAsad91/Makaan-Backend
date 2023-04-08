const mysql = require('mysql');
const db = mysql.createConnection({
    user: 'root',
    password: '',
    server: '127.0.0.1', 
    database: 'makaan' 

})

module.exports = db;