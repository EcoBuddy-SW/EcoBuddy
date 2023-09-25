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
    const {email, password, nickname, phoneNumber} = req.body;

    // 이메일이 중복 확인
    const checkEmail = 'SELECT * FROM users WHERE email = ?';
    connection.query(checkEmail, [email], (errCheck,resultCheck)=>{
        if(errCheck) {
            console.error('데이터 조회 실패',errCheck);
            res.status(500).send('Internal Server Error');
            return;
        }

        // 이메일이 중복이면 에러 메시지 전송 후 return
        if(resultCheck.length > 0){
            res.json({ //.status(400)
                success: false,
                message: '해당 이메일은 이미 가입되어있습니다.'
            });
            console.log('해당 이메일은 이미 가입되어있습니다.');
            return;
        }

        // 이메일이 중복이 아니면 닉네임 중복 확인
        const checkNickname = 'SELECT * FROM users WHERE nickname = ?';
        connection.query(checkNickname, [nickname], (errCheck,resultCheck)=>{
            if(errCheck) {
                console.error('데이터 조회 실패',errCheck);
                res.status(500).send('Internal Server Error');
                return;
            }

            if(resultCheck.length > 0){
                res.json({ //.status(400)
                    success: false,
                    message: '해당 닉네임은 이미 가입되어있습니다.'
                });
                console.log('해당 닉네임은 이미 가입되어있습니다.');
                return;
            }
                
            const insertSql = `INSERT INTO users(email,password,nickname,phoneNumber)
            VALUES(?,?,?,?)`;
        
            connection.query(insertSql,[email,password,nickname,phoneNumber],(errInsert,resultInsert)=>{
                if(errInsert) {
                    console.error('데이터 저장 실패',errInsert);
                    res.json({ //.status(500)
                        success: false,
                        message: 'Internal Server Error'
                    });
                    return;
                }

                console.log('데이터 저장 성공');
                res.json({success: true, message: '회원가입 성공'});

            });
        });
    });
});

