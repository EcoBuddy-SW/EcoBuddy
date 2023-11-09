const express = require('express');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const axios = require("axios");
const { Expo } = require('expo-server-sdk');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const dbconfig = require('../config/database.js');
const connection = mysql.createConnection(dbconfig);
connection.connect();

const app = express();
let expo = new Expo({});

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
    cookie: {
        maxAge: 1 * 60 * 1000 //1분
    }
}));

app.use(function (req, res, next) {
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
    const { email, id, password, nickname, phoneNumber } = req.body;

    // 이메일 중복 확인
    const checkEmail = 'SELECT * FROM users WHERE email = ?';
    connection.query(checkEmail, [email], (errCheck, resultCheck) => {
        if (errCheck) {
            console.error('데이터 조회 실패', errCheck);
            // res.status(500).send('Internal Server Error');
            return;
        }

        // 이메일이 중복이면 에러 메시지 전송 후 return
        if (resultCheck.length > 0) {
            res.json({ //.status(400)
                success: false,
                message: '해당 이메일은 이미 가입되어있습니다.'
            });
            console.log('해당 이메일은 이미 가입되어있습니다.');
            return;
        }

        const checkId = 'SELECT * FROM users WHERE id = ?';
        connection.query(checkId, [id], (errCheck, resultCheck) => {
            if (errCheck) {
                console.error('데이터 조회 실패', errCheck);
                // res.status(500).send('Internal Server Error');
                return;
            }
            if (resultCheck.length > 0) {
                res.json({ //.status(400)
                    success: false,
                    message: '해당 아이디는 이미 가입되어있습니다.'
                });
                console.log('해당 아이디는 이미 가입되어있습니다.');
                return;
            }
            // 이메일이 중복이 아니면 닉네임 중복 확인
            const checkNickname = 'SELECT * FROM users WHERE nickname = ?';
            connection.query(checkNickname, [nickname], (errCheck, resultCheck) => {
                if (errCheck) {
                    console.error('데이터 조회 실패', errCheck);
                    // res.status(500).send('Internal Server Error');
                    return;
                }

                if (resultCheck.length > 0) {
                    res.json({ //.status(400)
                        success: false,
                        message: '해당 닉네임은 이미 가입되어있습니다.'
                    });
                    console.log('해당 닉네임은 이미 가입되어있습니다.');
                    return;
                }

                const insertSql = `INSERT INTO users(email,id,password,nickname,phoneNumber)
                VALUES(?,?,?,?,?)`;

                connection.query(insertSql, [email, id, password, nickname, phoneNumber], (errInsert, resultInsert) => {
                    if (errInsert) {
                        console.error('데이터 저장 실패', errInsert);
                        res.json({ //.status(500)
                            success: false,
                            message: 'Internal Server Error'
                        });
                        return;
                    }

                    console.log('데이터 저장 성공');

                    req.session.uid = id;
                    req.session.uemail = email;
                    req.session.isLogined = true;

                    req.session.save(err => {
                        if (err) {
                            console.error('세션 저장 실패:', err);
                            // res.status(500).send('Internal Server Error');
                            return;
                        }
                    });
                    const createTableSql = `CREATE TABLE ${id} (id VARCHAR(20) PRIMARY KEY NOT NULL ,search VARCHAR(20),count INT(255))`;

                    connection.query(createTableSql, (errCreate, resultCreate) => {
                        if (errCreate) {
                            console.error('테이블 생성 실패', errCreate);
                            res.json({
                                success: false,
                                message: 'Internal Server Error'
                            });
                            return;
                        }
                    });
                    res.json({ success: true, message: '회원가입 성공' });

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

app.post('/updateprofile', (req, res) => {

    const { name, email } = req.body; // name과 email 필드
    const profile_picture = req.file; // profile_picture 파일

    console.log(id);
    console.log(img);

    const update = "UPDATE users SET img = ? WHERE id = ?";

    connection.query(update, [img, id], (errUpdate, resultUpdate) => {
        if (errUpdate) {
            console.error('데이터 업데이트 실패', errUpdate);
            res.status(500).json({
                success: false,
                message: 'Internal Server Error'
            });
            return;
        }

        console.log('데이터 업데이트 성공');
        res.json({ success: true, message: '프로필 이미지 업데이트 성공' });
    });
});


app.post('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.log(err);
            return;
        } else {
            res.json({ success: true, message: '로그아웃 성공' });
        }
    });
});
app.post('/deleteSearch', (req, res) => {
    const { search, userId } = req.body;
    const sql = `DELETE FROM ${userId} WHERE search='${search}'`

    connection.query(sql, (err) => {
        if (err) {
            console.error('서버 삭제 실패:', err);
            return;
        } else {
            console.log('서버에서 삭제요청 응답 성공');
        }
    })
});

app.post('/deleteAll', (req, res) => {
    const { userId } = req.body;
    const sql = `DELETE FROM ${userId} WHERE id='${userId}'`

    connection.query(sql, (err) => {
        if (err) {
            console.error('전체삭제 실패 (서버)', err);
            return;
        } else {
            console.log('서버에서 전체삭제 성공');
        }
    })
});

app.post('/search', (req, res) => {
    const { searchText, userId } = req.body;
    const sql = `SELECT region, city, name, info ,type FROM business WHERE city='${searchText}' OR region='${searchText}'`;
    connection.query(sql, (err, results) => {
        if (err) {
            console.error('쿼리 실행 실패:', err);
            // res.status(500).send('Internal Server Error');
            return;
        }

        if (results.length === 0) {
            // 일치하는 검색어가 없을 떄 
            res.json({ success: false, message: '일치하는 검색어가 없습니다.' });
        } else {
            const data = results.map(result => ({
                region: result.region,
                city: result.city,
                name: result.name,
                info: result.info,
                type: result.type
            }));
            res.json({ success: true, results: data });
        }
        const searchsql = `
    INSERT INTO ${userId} (id, search,count)
    VALUES ('${userId}', '${searchText}', 1)
    ON DUPLICATE KEY UPDATE count=count+1`;

        connection.query(searchsql, (errInsert, resultInsert) => {
            if (errInsert) {
                console.error('데이터 저장 실패', errInsert);
                res.json({
                    success: false,
                    message: 'Internal Server Error'
                });
                return;
            }

            console.log('데이터 저장 성공');
        })
    });

});

app.post('/recentsearch', (req, res) => {
    const userId = req.body.userId;
    const searchSql = `SELECT search FROM ${userId} ORDER BY count DESC`;
    connection.query(searchSql, (err, results) => {
        if (err) {
            console.error('데이터 조회 실패', err);
            // res.status(500).send('Internal Server Error');
            return;
        }
        const data = results.map(result => ({
            searchs: result.search
        }));
        res.json({ success: true, results: data });
    });
});

app.post('/delAccount', (req, res) => {
    const { id } = req.body;
    const sql = `DELETE FROM users WHERE id=?`;
    req.session.destroy((err) => {
        if (err) {
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

// Expo를 초기화하고 반환하는 함수를 정의합니다.
// function initializeExpo() {
//   const expo = new Expo();
//   return expo;
// }

// app.post('/sendNotification', async (req, res) => {
//   const somePushTokens = req.body.tokens;
//   const data = req.body.data;

// 서버 코드 내에서 EXPO_ACCESS_TOKEN 환경 변수를 설정
// process.env.EXPO_ACCESS_TOKEN = 'bSMbj2OTZyu9y_sLNXuIdyKqlTF4-0k1ysFr75MW';

//   console.log(`ExpoPushMessages > ${somePushTokens}, ${data}`);
//   console.log(`환경 변수에서 토큰 > ${process.env.EXPO_ACCESS_TOKEN}`);

//   if (!somePushTokens || somePushTokens.length === 0) {
//     return res.status(400).send({ success: false, message: '유효한 푸시 토큰이 제공되지 않았습니다' });
//   }

//   const messages = somePushTokens.map((pushToken) => ({
//     to: pushToken,
//     sound: 'default',
//     body: '로그인 성공이요~~',
//     data: { withSome: 'data' },
//   }));

//   // Expo를 초기화합니다
//   const expo = initializeExpo();

//   const chunks = expo.chunkPushNotifications(messages);

//   for (let chunk of chunks) {
//     try {
//       const receipts = await expo.sendPushNotificationsAsync(chunk);

//       console.log(receipts);
//     } catch (error) {
//       console.error(error);
//       return res.status(500).send({ success: false, message: '알림을 보내는 데 실패했습니다' });
//     }
//   }

//   res.status(200).send({ success: true });
// });


app.post('/sendNotification', (req, res) => {
    let messages = [];
    for (let pushToken of req.body.tokens) {
        console.log('token for문');
        // 각 토큰이 올바른 형식인지 확인합니다.
        if (!Expo.isExpoPushToken(pushToken)) {
            console.error(`Push token ${pushToken} is not a valid Expo push token`);
            continue;
        }

        console.log('pushToken: ', pushToken);

        // 메세지 생성
        messages.push({
            to: pushToken,
            sound: 'default',
            title: '서윤아 로그인 좀 하자',
            body: '로그인 성공이요~~',
            data: { withSome: 'data' },
        })
    }

    // 메세지를 한번에 많이 보낼 경우 분할해서 보냅니다.
    let chunks = expo.chunkPushNotifications(messages);

    for (let chunk of chunks) {
        try {
            let receipts = expo.sendPushNotificationsAsync(chunk);

            console.log(receipts);

            res.status(200).send({ success: true });

        } catch (error) {
            console.error(error);

            res.status(500).send({ success: false });

            return;
        }
    }
});

app.post('/write', (req, res) => {
    const { writer, context, imageUrl, date } = req.body;

    const insertSql = `INSERT INTO writing(writer, context, imageUrl, date)
    VALUES(?,?,?,?)`;

    connection.query(insertSql, [writer, context, imageUrl, date], (errInsert, resultInsert) => {
        if (errInsert) {
            console.error('데이터 저장 실패', errInsert);
            res.json({
                success: false,
                message: 'Internal Server Error',
            });
            return;
        }

        console.log('데이터 저장 성공');
        res.json({ success: true, message: '글 저장 성공' });
    });
});

app.get('/community', (req, res) => {
    const sql = 'SELECT num, writer, context, imageUrl, date FROM writing';
    connection.query(sql, (err, results) => {
        if (err) {
            console.error('쿼리 실행 실패:', err);
            res.json({ error: 'Internal Server Error' });
        } else {
            res.json(results);
        }
    });
});

app.post('/comment', (req, res) => {
    const { postId, comment, date } = req.body;

    const insertSql = `INSERT INTO comment(num , comment, date)
    VALUES(?,?,?)`;

    connection.query(insertSql, [postId, comment, date], (errInsert, resultInsert) => {
        if (errInsert) {
            console.error('데이터 저장 실패', errInsert);
            res.json({
                success: false,
                message: 'Internal Server Error',
            });
            return;
        }

        console.log('데이터 저장 성공');
        res.json({ success: true, message: '댓글 저장 성공' });
    });
});

app.get('/commentList', (req, res) => {
    const { num } = req.query; // postId 대신 num 사용
    console.log('num: ' , num);

    const sql = `SELECT comment FROM comment WHERE num='${num}'`;
    connection.query(sql, [num], (err, results) => {
        if (err) {
            console.error('쿼리 실행 실패:', err);
            res.json({ error: 'Internal Server Error' });
        } else {
            res.json(results);
            console.log('commentList result: ', results);
        }

        if (results.length === 0) {
            // 댓글이 없을 경우 예외 처리임,,
            
        }
    });
});
