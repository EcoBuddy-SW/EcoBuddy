const mysql = require('mysql');
const express = require('express');
const app = express();

const connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'0000',
    database:'ecobuddy'
});


connection.connect(function(err) {
    if (err) {
      return console.error('error: ' + err.message);
    }   
    console.log('DB연동 성공!!');
  });

  app.post('api/data',(req,res)=>{
    const {email, password, nickname, phoneNumber} = req.body;

    const sql = `INSERT INTO users(email,password,nickname,phoneNumber)
    VALUES('${email}','${password}','${nickname}','${phoneNumber}')`;

    connection.query(sql,(err,result)=>{
        if(err) throw err;
        console.log('데이터 저장 성공');
        res.send('데이터 저장 성공');
    });
  });
  app.listen(3000,()=>{
    console.log('3000포트 서버 대기중');
  })

connection.end(function(err) {
  if (err) {
    return console.log('error:' + err.message);
  }
  console.log('DB 연결 끊기 성공!!');
});
