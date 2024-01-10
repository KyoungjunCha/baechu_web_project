// server.js

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

// Maria DB 
const connection = require('./db');

app.use(bodyParser.json());
app.use(cors());

const users = [];

app.post('/signup', (req, res) => {
  const { email, nickname, password, year, month, day, gender} = req.body;

  const existingUser = users.find(user => user.email === email);
  if (existingUser) {
    return res.status(400).json({ success: false, message: '이미 등록된 사용자입니다.' });
  }
  
  const barthday = year +' '+month +day;

  const newUser = { email, nickname, password,barthday, gender };
  users.push(newUser);
  // console.log("users test sdasda:",users);

  let query = 'INSERT INTO test (email, nickname, password, barthday, gender) VALUES (?, ?, ?, ?, ?)';
  let result =[
    email,
    nickname,
    password,
    barthday,
    gender
  ]
  connection.query(query, result);

  return res.status(201).json({ success: true, message: '회원가입이 성공적으로 완료되었습니다.' });
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;

  const user = users.find(user => user.email === email && user.password === password);
  if (user) {
    return res.json({ success: true, message: '로그인이 성공적으로 완료되었습니다.' });
  } else {
    return res.status(401).json({ success: false, message: '유효하지 않은 사용자입니다.' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
