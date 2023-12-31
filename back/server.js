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

const http = require('http');
const socketIo = require('socket.io');
const server = http.createServer(app);
const io = socketIo(server);

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


    // 이전에 처리한 마지막 로우의 id 값을 저장할 변수
    let lastProcessedId = 0;
  
    // 일정한 간격으로 notifications 테이블 조회 및 알림 발신
    setInterval(() => {
      // notifications 테이블에서 id 값이 증가된 로우를 조회하는 쿼리 실행
      const query = `SELECT * FROM notifications WHERE id > ${lastProcessedId}`;
      connection.query(query, (err, results) => {
        if (err) {
          console.error('조회 오류:', err);
          return;
        }
  
        // 조회 결과가 있는 경우
        if (results.length > 0) {
          // 마지막으로 처리한 로우의 id 값을 업데이트
          lastProcessedId = results[results.length - 1].id;
  
          // 푸시 알림 발신
          sendPushNotifications(results);

          // DELETE 쿼리 실행
          const deleteQuery = 'DELETE FROM notifications;';
          connection.query(deleteQuery, (deleteErr, deleteResults) => {
              if (deleteErr) {
                  console.error('DELETE 쿼리 오류:', deleteErr);
                  return;
              }
              console.log('DELETE 쿼리 실행 성공');
          });
        }
      });
    }, 5000); // 5초마다 조회 작업 실행
  
  // Expo 푸시 알림 발신 함수
  function sendPushNotifications(results) {
    const messages = results.map((result) => ({
      to: result.token, // 로우의 token 컬럼 값
      sound: 'default',
      title: result.title,
      body: result.message,
      data: { /* 추가 데이터 */ },
    }));
  
    // 푸시 알림 발신
    const chunks = expo.chunkPushNotifications(messages);
  
    for (const chunk of chunks) {
      try {
        const receipts = expo.sendPushNotificationsAsync(chunk);
        // 알림 발신 결과 처리
        // receipts 변수에는 알림 발신에 대한 응답이 포함됩니다.
        // 알림이 성공적으로 발신되었는지 여부를 확인할 수 있습니다.
      } catch (error) {
        console.error('알림 발신 오류:', error);
      }
    }
  }

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
                    const createTableSql = `CREATE TABLE ${id} (id VARCHAR(20) NOT NULL ,search VARCHAR(20) PRIMARY KEY,count INT(255))`;

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
                    const createTrash = `CREATE TABLE ${id}TRASH (id VARCHAR(30), \`비닐\` INT DEFAULT 0, \`스티로폼\` INT DEFAULT 0, \`금속캔 (알루미늄)\` INT DEFAULT 0, \`금속캔 (철)\` INT DEFAULT 0, \`종이\` INT DEFAULT 0, \`페트병 (무색 단일)\` INT DEFAULT 0, \`페트병 (유색 단일)\` INT DEFAULT 0, \`플라스틱 (PE)\` INT DEFAULT 0, \`플라스틱 (PP)\` INT DEFAULT 0, \`플라스틱 (PS)\` INT DEFAULT 0, \`유리병 (갈색)\` INT DEFAULT 0, \`유리병 (녹색)\` INT DEFAULT 0, \`유리병 (투명)\` INT DEFAULT 0, \`건전지\` INT DEFAULT 0, \`형광등\` INT DEFAULT 0)`;
                    
                    connection.query(createTrash,(err,results) => {
                        if (err) {
                            console.error('쓰레기 테이블 생성 오류:', err);
                            return;
                        }
                        console.log('유저 쓰레기분류 횟수 테이블 생성');

                        const insertTable = `INSERT INTO ${id}TRASH (id) VALUES('${id}')`;
                        connection.query(insertTable,(err,result) => {
                            if(err){
                                console.error('테이블 삽입 오류:',err);
                                return;
                            }
                            console.log('유저 쓰레기분류 테이블 생성');
                        });
                    });
                    res.json({ success: true, message: '회원가입 성공' });

                });
            });
        });
    });
});

app.post('/login', (req, res) => {
    const { id, password, token } = req.body;
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
                updateToken(id, token);
                console.log('Login token: ', token);
                res.json({ success: true, message: '로그인 성공', id: user.id, email: user.email });
            }
        }
    });
});

// 해당 유저의 토큰 업데이트 함수
const updateToken = (userId, newToken) => {
    const updateTokenSql = 'UPDATE users SET token = ? WHERE id = ?';

    console.log(updateTokenSql, [newToken, userId]); // 이 줄을 추가

    connection.query(updateTokenSql, [newToken, userId], (err, results) => {
        if (err) {
            console.error('토큰 업데이트 실패:', err);
            // 실패에 대한 처리를 추가할 수 있음
        } else {
            console.log('토큰 업데이트 성공');
        }
    });
};

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

app.post('/userLocation',(req,res) => {
    const userId = req.body.userId;
    const region = req.body.region;
    const city = req.body.city;
    const district = req.body.district;
    const street = req.body.street;
    
    const sql = 'UPDATE USERS SET REGION =?,CITY=?,district=?,street=? WHERE ID =?';
    connection.query(sql, [region,city,district,street,userId],(err,result) => {
        if (err) throw err;
        console.log('사용자 위치 받아와서 수정함');
    })
})
app.post('/attendance/update', (req, res) => {
    const userId = req.body.userId;
    const { date, points } = req.body;

    const sqlCheck = 'SELECT * FROM attendance WHERE userId = ? AND date = ?';
    const sqlInsert = 'INSERT INTO attendance (userId, date) VALUES (?, ?)';
    const sqlUpdate = 'UPDATE users SET point = point + ? WHERE ID = ?';

    connection.query(sqlCheck, [userId, date], (err, result) => {
        if (err) throw err;

        if (result.length > 0) {
            // 이미 출석체크한 경우
            console.log("이미 출석체크를 했습니다.");
            res.json({ message: "이미 출석체크를 했습니다." });
        } else {
            // 출석체크를 아직 하지 않은 경우
            connection.beginTransaction((err) => {
                if (err) throw err;
                connection.query(sqlInsert, [userId, date], (err, result) => {
                    if (err) {
                        return connection.rollback(() => {
                            throw err;
                        });
                    }

                    connection.query(sqlUpdate, [points, userId], (err, result) => {
                        if (err) {
                            return connection.rollback(() => {
                                throw err;
                            });
                        }
                        connection.commit((err) => {
                            if (err) {
                                return connection.rollback(() => {
                                    throw err;
                                });
                            }
                            console.log("출석체크가 완료되었습니다.");
                            res.json(result);
                        });
                    });
                });
            });
        }
    });
});

app.post('/attendance', (req, res) => {
    const userId = req.body.userId;
    const sql = 'SELECT * FROM attendance WHERE userId = ?';
    connection.query(sql, [userId], (err, result) => {
        if (err) throw err;
        res.json(result);
    });
});

app.post('/updateCoin',(req,res) => {
    const userId = req.body.userId;
    const coin = req.body.point;

    const sql = 'UPDATE USERS SET POINT = ? WHERE ID=?';
    connection.query(sql,[coin,userId],(err,result) => {
        if(err) throw err;
        console.log('포인트 업데이트(기프티콘 교환)');
    })
})

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
            res.json({ success: true, message: '삭제 성공' });
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
            res.json({ success: true, message: '삭제 성공' });
        }
    })
});

//사용자 위치의 사업정보 검색
app.post('/searchLocation', (req, res) => {
    const { searchText, userId } = req.body;
    const sql = `SELECT region, city, name, info ,type, location FROM business WHERE city='${searchText}' OR region='${searchText}'`;
    connection.query(sql, (err, results) => {
        if (err) {
            console.error('쿼리 실행 실패:', err);
            // res.status(500).send('Internal Server Error');
            return;
        }

        if (results.length === 0) {
            res.json({ success: false, message: '일치하는 검색어가 없습니다.' });
        } else {
            const data = results.map(result => ({
                region: result.region,
                city: result.city,
                name: result.name,
                info: result.info,
                type: result.type,
                location: result.location
            }));
            res.json({ success: true, results: data });
        }
    });

});

//쓰레기 배출 방법 검색
app.post('/search', (req, res) => {
    const { searchText, userId } = req.body;
    const sql = `SELECT product, sortation, way FROM searchtrash WHERE product LIKE '%${searchText}%'`;
    connection.query(sql, (err, results) => {
        if (err) {
            console.error('쿼리 실행 실패:', err);
            // res.status(500).send('Internal Server Error');
            return;
        }

        if (results.length === 0) {
            // 일치하는 검색어가 없을 떄 
            console.log('데이터 찾지 못함');
            res.json({ success: false, message: '일치하는 검색어가 없습니다.' });
        } else {
            console.log('찾은 데이터: ' , results);
            const data = results.map(result => ({
                product: result.product,
                sortation: result.sortation,
                way: result.way

            }));
            res.json({ success: true, results: data });
        }
        const searchsql = `INSERT INTO ${userId} (id, search,count)
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
            console.log('데이터 저장 성공: ', searchText);
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
    const sql = 'SELECT num, writer, context, imageUrl, date FROM writing ORDER BY date DESC';
    connection.query(sql, (err, results) => {
        if (err) {
            console.error('쿼리 실행 실패:', err);
            res.json({ error: 'Internal Server Error' });
        } else {
            res.json(results);
        }
    });
});

app.post('/getUserNickname', (req, res) => {
    const { userId } = req.body;
  
    const sql = 'SELECT NICKNAME FROM USERS WHERE ID = ?';
  
    connection.query(sql, [userId], (err, result) => {
      if (err) {
        console.error('사용자 정보 조회 실패:', err);
        res.json({ success: false, message: 'Internal Server Error' });
        return;
      }
  
      if (result.length === 0) {
        res.json({ success: false, message: '사용자를 찾을 수 없음' });
        return;
      }
  
      const nickname = result[0].NICKNAME;
  
      res.json({ success: true, nickname });
    });
  });
  

app.post('/comment', (req, res) => {
    const { postId, commentWriter, comment, date } = req.body;

    const insertSql = `INSERT INTO comment(num ,commentWriter , comment, date)
    VALUES(?,?,?,?)`;

    connection.query(insertSql, [postId, commentWriter, comment, date], (errInsert, resultInsert) => {
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
    console.log('num: ', num);

    const sql = `SELECT commentWriter, comment FROM comment WHERE num='${num}'`;
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
            to: 'ExponentPushToken[XvhlDAP6t7Zn68v9Hl0Sp9]',
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

// 소켓 연결 및 댓글 저장 시 알림 전송 로직
io.on('connection', (socket) => {
    // 클라이언트가 연결되면 소켓 ID와 사용자 ID를 맵에 추가
    socket.on('setUserId', (userId) => {
        userSocketMap.set(userId, socket.id);
    });

    // 클라이언트에서 댓글 저장 시
    socket.on('saveComment', ({ postId, commenterId }) => {
        // 글 작성자의 소켓 ID를 맵에서 찾음
        const authorSocketId = userSocketMap.get(postId);

        if (authorSocketId) {
            // 해당 글 작성자에게 알림 전송
            io.to(authorSocketId).emit('newComment', { postId, commenterId });
        }
    });

    // 연결이 끊기면 맵에서 해당 소켓 ID 제거
    socket.on('disconnect', () => {
        userSocketMap.forEach((value, key) => {
            if (value === socket.id) {
                userSocketMap.delete(key);
            }
        });
    });
});

// 클라이언트로부터 댓글 저장 요청이 오면
app.post('/saveComment', (req, res) => {
    const { postId, commenterId } = req.body;

    // 클라이언트에게 댓글 저장 알림 전송
    io.emit('saveComment', { postId, commenterId });

    res.status(200).send('Comment saved successfully');
});

app.post('/downloadProfile',(req,res) => {
    const {userId} = req.body;
    const sql = `SELECT profileUrl FROM users WHERE id='${userId}'`;

    connection.query(sql,(err,result) => {
        if(err){
            console.err('이미지url 받아오기 실패(서버)',err);
            return;
        }
        const data=result[0];
        res.json({success:true, data});
        console.log('프로필 전송 (서버)',data);
    })
});

app.post('/downloadUserInfo',(req,res) => {
    const {userId} = req.body;
    const sql = `SELECT profileUrl,nickname,email,phoneNumber,Point FROM users WHERE id='${userId}'`;

    connection.query(sql,(err,result) => {
        if (err) {
            // 에러 처리
            console.error(err);
            res.status(500).json({ error: '서버 오류' });
          } else {
            // 결과 반환
            if (result.length > 0) {
              const userInfo = result[0];
              res.json(userInfo);
            } else {
              res.status(404).json({ error: '사용자 정보를 찾을 수 없음' });
            }
        }
    });
});

app.post('/uploadProfile',(req,res) => {
    const {userId,url} = req.body;
    const sql = `UPDATE users SET profileUrl='${url}' WHERE id='${userId}'`;

    connection.query(sql,(err) => {
        if(err){
            console.log('서버에서 프로필url저장 실패',err);
            res.json({
                success:false,
                message:err.message
            });
            return;
        }
        console.log('다운로드 url 저장 성공(서버)');
    });
})

app.post('/userGetLocation',(req, res) => {
    const userId = req.body.userId;
    const sql = 'SELECT CITY FROM USERS WHERE ID = ?';
    connection.query(sql, [userId],(err,result) => {
        if(err) throw err;
        res.json(result);
    })
})


app.post('/sendCommentNotification', (req, res) => {
    // let messages = [];
    // for (let pushToken of req.body.tokens) {
    //     console.log('token for문');
    //     // 각 토큰이 올바른 형식인지 확인합니다.
    //     if (!Expo.isExpoPushToken(pushToken)) {
    //         console.error(`Push token ${pushToken} is not a valid Expo push token`);
    //         continue;
    //     }

    //     console.log('pushToken: ', pushToken);

    //     // 메세지 생성
    //     messages.push({
    //         to: pushToken,
    //         sound: 'default',
    //         title: '댓글 달렸음',
    //         body: '확인 부탁~~',
    //         data: { withSome: 'data' },
    //     })
    // }

    // // 메세지를 한번에 많이 보낼 경우 분할해서 보냅니다.
    // let chunks = expo.chunkPushNotifications(messages);

    // for (let chunk of chunks) {
    //     try {
    //         let receipts = expo.sendPushNotificationsAsync(chunk);

    //         console.log(receipts);

    //         res.status(200).send({ success: true });

    //     } catch (error) {
    //         console.error(error);

    //         res.status(500).send({ success: false });

    //         return;
    //     }
    // }
    const message = req.body.comments;
    const activePostNum = req.body.activePostNum;
    const getToken = 'SELECT u.token, u.nickname FROM writing w JOIN users u ON u.id = w.writer WHERE w.num = ?';
    connection.query(getToken, [activePostNum], (err, results) => {
        if (err) {
        console.error('쿼리 실행 오류:', err);
        return;
        }

    if (results.length > 0) {
      const userToken = results[0].token;
      const title = '게시글에 댓글이 달렸어요!';
      console.log('userToken:', userToken);
      const query = 'INSERT INTO notifications (title, message, token) VALUES (?, ?, ?)';

    connection.query(query, [title, results[0].nickname+': '+message, userToken], (err, result) => {
        if (err) {
        console.error('데이터 삽입 오류:', err);
        return;
        }
        console.log('데이터가 성공적으로 삽입되었습니다.');
        const query2 = 'INSERT INTO notifications2 (title, message, time, token) VALUES (?, ?, CURRENT_TIMESTAMP, ?)';
                connection.query(query2, [title, results[0].nickname+': '+message, userToken], (err2, result2) => {
                    if (err2) {
                        console.error('두 번째 데이터 삽입 오류:', err2);
                        return;
                    }
                    console.log('두 번째 데이터가 성공적으로 삽입되었습니다.');
                });

        });
    } else {
      console.log('해당하는 데이터가 없습니다.');
    }
//   const token = 'ExponentPushToken[cHhlRrD_5nZQxvC_qfF3Ip]';
    });
});
// server.listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`);
// });

app.post('/trashAdd',(req,res) => {
    const trash = req.body.trash;
    const userId = req.body.userId;
    
    const query = 'UPDATE `' + userId + 'TRASH` SET `' + trash + '` = `' + trash + '` + 1 WHERE id = ?';
  connection.query(query, [userId], (err2, result2) => {
                    if (err2) {
                        console.error('쓰레기 데이터 삽입 오류:', err2);
                        return;
                    }
                    console.log('쓰레기 데이터가 성공적으로 삽입되었습니다.');
                });
});

app.post('/getData', (req, res) => {
    const userId = req.body.userId;
  
    const query = `SELECT \`비닐\`, \`스티로폼\`, \`금속캔 (알루미늄)\`, \`금속캔 (철)\`, \`종이\`, \`페트병 (무색 단일)\`, \`페트병 (유색 단일)\`, \`플라스틱 (PE)\`, \`플라스틱 (PP)\`, \`플라스틱 (PS)\`, \`유리병 (갈색)\`, \`유리병 (녹색)\`, \`유리병 (투명)\`, \`건전지\`, \`형광등\` FROM \`${userId}trash\``;
  
    connection.query(query, (err, results) => {
      if (err) {
        console.error('데이터 조회 오류:', err);
        res.status(500).json({ error: '데이터 조회 오류' });
      } else {
        const data = Object.entries(results[0]).map(([columnName, value]) => ({
            value: value,
            label: columnName,
            dataPointText: value
        }));
        res.json(data);
        console.log(data);
      }
    });
  });

  app.post('/getNotifications',(req,res) => {
    const userId = req.body.userId;
    const query = `SELECT *FROM notifications2 WHERE token IN (SELECT token FROM Users WHERE id = '${userId}') ORDER BY time DESC`;
    connection.query(query,(err,results) => {
        if(err) {
            console.error('데이터 조회 오류:', err);
            res.status(500).json({error:'데이터 조회 오류'});
        } else {
            const data = results;
            res.json(data);
            console.log(data);
        }
    });
  });

  app.post('/updatePoint',(req,res) => {
    const userId = req.body.userId;
    const query = 'UPDATE users SET point = point + 13 WHERE ID = ?';
    connection.query(query, [userId], (err, result) => {
        if (err) {
            console.error('포인트 증가 실패:', err);
            return;
        }
        console.log('포인트 증가 성공');
    });
  })