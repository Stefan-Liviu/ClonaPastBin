const mysql = require('mysql');
const connectionDb = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'test',
    port: '3306'
});

connectionDb.connect(function(error) {
    if(error) throw error;
     console.log('Connected to database');
});

module.exports = connectionDb