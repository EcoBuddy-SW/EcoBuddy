const express = require('express');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const axios = require("axios");
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const dbconfig = require('../config/database.js');
const connection = mysql.createConnection(dbconfig);
connection.connect();

const app = express();
const sessionStore = new MySQLStore(dbconfig);

app.use(bodyParser.json());
app.use(cors());

const port = 3003;

app.use(session({
    key: 'userInfo',
    secret: 'nhth453recasd',
    store: sessionStore,
    resave: false,
    saveUninitialized: true,
}));

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    next();
  });

app.listen(port, '0.0.0.0', () => {
    console.log(`Express server listening on port ${port}`);
});

// app.get('/', (req, res) => {
//     res.send('Welcome to my website!');
// });

  
app.post('/join', (req, res) => {
    const {email, id, password, nickname, phoneNumber} = req.body;

    // 이메일 중복 확인
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

        const checkId = 'SELECT * FROM users WHERE id = ?';
        connection.query(checkId, [id], (errCheck, resultCheck) => {
            if(errCheck) {
                console.error('데이터 조회 실패',errCheck);
                res.status(500).send('Internal Server Error');
                return;
            }
            if(resultCheck.length > 0){
                res.json({ //.status(400)
                    success: false,
                    message: '해당 아이디는 이미 가입되어있습니다.'
                });
                console.log('해당 아이디는 이미 가입되어있습니다.');
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
                    
                const insertSql = `INSERT INTO users(email,id,password,nickname,phoneNumber)
                VALUES(?,?,?,?,?)`;
            
                connection.query(insertSql,[email,id,password,nickname,phoneNumber],(errInsert,resultInsert)=>{
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
});

app.post('/login', (req, res) => {
    const { id, password } = req.body;
    //db에서 email, password 컬럼에 있는값 가져오기
    const sql = `SELECT id, password FROM users WHERE id=?`;
  
    connection.query(sql, [id], (err, results) => {
        if (err) {
            console.error('쿼리 실행 실패:', err);
            res.status(500).send('Internal Server Error');
            return;
        }
  
        if (results.length === 0) {
            // 일치하는 아이디가 없는 경우
            res.json({ success: false, message: '일치하는 아이디가 없습니다.' });
        } else {
            const user = results[0];
            
            if (user.password !== password) {
                // 비밀번호가 일치하지 않는 경우
                res.json({ success: false, message: '비밀번호가 일치하지 않습니다.' });
            } else {
                // 로그인 성공
                req.session.uid = user.id;
                req.session.isLogined = true;

                req.session.save(err => {
                    if (err) {
                        console.error('세션 저장 실패: ', err);
                        res.status(500).send('Internal Server Error');
                        return;
                    }
                })
                res.json({ success: true, message: '로그인 성공', id: user.id, email: user.email });
            }
        }
    });
});

app.post('/findId', (req, res) => {
    const { email, phoneNumber } = req.body;

    const sql = `SELECT id FROM users WHERE email='${email}' and phoneNumber='${phoneNumber}'`;
  
    connection.query(sql, (err, results) => {
        if (err) {
            console.error('쿼리 실행 실패:', err);
            res.status(500).send('Internal Server Error');
            return;
        }
  
        if (results.length === 0) {
            // 일치하는 이메일이 없는 경우
            res.json({ success: false, message: '일치하는 아이디가 없습니다.' });
        } else {
            const user = results[0];
            res.json({ success: true, message: `'${user.id}'` });
        }
    });
});

app.post('/findPw', (req, res) => {
    const { id, email, phoneNumber } = req.body;

    const sql = `SELECT password FROM users WHERE id='${id}' and email='${email}' and phoneNumber='${phoneNumber}'`;
  
    connection.query(sql, (err, results) => {
        if (err) {
            console.error('쿼리 실행 실패:', err);
            res.status(500).send('Internal Server Error');
            return;
        }
  
        if (results.length === 0) {
            // 일치하는 이메일이 없는 경우
            res.json({ success: false, message: '일치하는 아이디가 없습니다.' });
        } else {
            const user = results[0];
            res.json({ success: true, message: `'${user.password}'` });
        }
    });
});

app.post('/logout', (req, res) => {
    req.session.destroy((err) => {
      if(err) {
        console.log(err);
        return;
      } else {
        res.json({ success: true, message: '로그아웃 성공' });
      }
    });
});

app.post('/delAccount', (req, res) => {
    const { id } = req.body;
    const sql = `DELETE FROM users WHERE id=?`;
    req.session.destroy((err) => {
      if(err) {
        console.log(err);
        return;
      } else {
        connection.query(sql, [id], (err, results) => {
            if (err) {
                console.error('쿼리 실행 실패:', err);
                res.status(500).send('Internal Server Error');
                return;
            }
            res.json({ success: true });
        });
    
      }
    });
    
});
  