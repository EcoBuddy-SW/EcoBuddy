const express = require("express");
const axios = require("axios");
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const dbconfig = require('../config/database.js');
const connection = mysql.createConnection(dbconfig);
connection.connect();

const app = express();
const port = 3003;

app.use(bodyParser.json());
app.use(cors());
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    next();
  });
// app.use(cors({
//     origin: 'https://example.com', // 여기에 원하는 도메인을 지정
// }));

app.listen(port, '0.0.0.0', () => {
    console.log(`Express server listening on port ${port}`);
});
//configuration
// app.set('port', process.env.PORT || 3003);

app.get('/', (req, res) => {
    res.send('Root');
});
// app.get('/users', (req, res) => {
//     connection.query('INSERT INTO users', (error, rows) => {
//         if (error) throw error;
//         console.log('User info is: ', rows);
//         res.send(rows);
//     });
// });

app.post('/join', (req, res) => {
    console.log("성공");
    const {email, password, nickname, phoneNumber} = req.body;

    const sql = `INSERT INTO users(email,password,nickname,phoneNumber)
    VALUES('${email}','${password}','${nickname}','${phoneNumber}')`;

    connection.query(sql,(err,result)=>{
        if(err) {
            console.error('데이터 저장 실패',err);
            res.status(500).send('Internal Server Error');
            return;
        }
        else {
            console.log('데이터 저장 성공');
            res.send('데이터 저장 성공');
            res.json({success: true, message: '회원가입 성공', email: email, password: password, nickname: nickname, phoneNumber: phoneNumber});
        }
    });


    connection.end();
});
