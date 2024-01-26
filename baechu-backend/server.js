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

app.post('/postWrite', async (req, res) => {
  const { user_id, board_title, board_img, board_detail, province, city, category } = req.body;

  try {
    const board_date = new Date().toISOString(); // 현재 날짜 및 시간 가져오기

    // 유효성 검사 추가
    if (!board_title) {
      return res.status(400).json({ success: false, message: '제목은 비워 둘 수 없습니다.' });
    }

    // Inserting data into the 'board' table
    let query = 'INSERT INTO board (user_id, board_title, board_img, board_detail, board_date, province, city, category) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
    let result = [
      user_id,
      board_title,
      board_img,
      board_detail,
      board_date,
      province,
      city,
      category
    ];

    await connection.query(query, result);

    return res.status(201).json({ success: true, message: '게시물 작성이 성공적으로 완료되었습니다.' });
  } catch (error) {
    console.error('Error writing post:', error);
    return res.status(500).json({ success: false, message: '게시물 작성 중 오류가 발생했습니다.' });
  }
});



app.get('/myPostList', (req, res) => {
  const userId = req.query.userId; // 프론트엔드에서 userId를 쿼리 파라미터로 전달하도록 가정

  if (!userId) {
    return res.status(400).json({ success: false, message: '유효하지 않은 사용자입니다.' });
  }

  // 해당 사용자의 게시물 목록을 가져오는 쿼리
  const query = 'SELECT * FROM board WHERE user_id = ?';
  const values = [userId];

  connection.query(query, values, (error, results) => {
    if (error) {
      console.error('Error fetching user posts:', error);
      return res.status(500).json({ success: false, message: '게시물 목록을 가져오는 중 오류가 발생했습니다.' });
    }

    return res.status(200).json({ success: true, data: results });
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
