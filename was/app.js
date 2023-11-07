const express = require('express');
const mysql = require('mysql');
const app = express();
const port = 3000;

// 환경변수를 통해 비밀번호를 받습니다.
const db = mysql.createConnection({
  host: '10.98.165.174', // MySQL 서비스의 DNS 이름을 사용
  user: 'root',
  password: process.env.MYSQL_ROOT_PASSWORD,
  database: 'testDB'
});

db.connect((err) => {
  if (err) throw err;
  console.log("MySQL Connected!");
});

app.get('/messages', (req, res) => {
  db.query('SELECT * FROM messages', (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});

app.listen(port, () => {
  console.log(`App running on http://localhost:${port}`);
});
