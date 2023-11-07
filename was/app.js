const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const app = express();
const port = 3000;

app.use(cors());

const db = mysql.createConnection({
  host: 'mysql-service',
  user: 'root',
  password: process.env.MYSQL_ROOT_PASSWORD,
  database: 'testDB'
});

// 데이터베이스 연결
db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log("MySQL Connected!");

  // 서버 시작 시 데이터베이스에서 메시지를 가져와서 확인합니다.
  db.query('SELECT * FROM messages', (err, results) => {
    if (err) {
      console.error('Error querying the database:', err);
    } else {
      console.log('Initial messages from the database:', results);
    }
  });
});

// 클라이언트 요청에 대한 응답으로 데이터베이스에서 메시지를 가져옵니다.
app.get('/', (req, res) => {
  db.query('SELECT * FROM messages', (err, results) => {
    if (err) {
      console.error('Error querying the database:', err);
      res.status(500).send('Error querying the database');
      return;
    }
    res.send(results);
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
