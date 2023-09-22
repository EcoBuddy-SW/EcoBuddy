// const express = require("express");
// const mysql = require('mysql');
// const dbconfig = require('./config/database.js');

// const app = express();
// const connection = mysql.createConnection({
//   host     : 'localhost',
//   user     : 'root',
//   password : 'root',
//   database : 'ecobuddy'
// });

// connection.connect();

// connection.query('SELECT * from Users', (error, rows, fields) => {
//     if (error) throw error;
//     console.log('User info is: ', rows);
// });

// connection.end();
const express = require("express");
const mysql = require('mysql');
const dbconfig = require('../config/database.js');
const connection = mysql.createConnection(dbconfig);

const app = express();

//configuration
app.set('port', process.env.PORT || 3002);

app.get('/', (req, res) => {
    res.send('Root');
});

app.get('/users', (req, res) => {
    connection.query('SELECT * from Users', (error, rows) => {
        if (error) throw error;
        console.log('User info is: ', rows);
        res.send(rows);
    });
});

app.listen(app.get('port'), () => {
    console.log('Express server listening on port ' + app.get('port'));
});