const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const app = express();
const port = 3000;

app.use(cors());

const db = mysql.createConnection({
  host: '10.98.165.174', // MySQL 서비스의 내부 IP 또는 DNS 이름
  user: 'root',
  password: process.env.MYSQL_ROOT_PASSWORD,
  database: 'testDB'
});

db.connect((err) => {
  if (err) throw err;
  console.log("MySQL Connected!");
});

app.get('/', (req, res) => {
  db.query('SELECT * FROM messages', (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});

app.listen(port, () => {
  console.log(`WAS listening on port ${port}`);
});
