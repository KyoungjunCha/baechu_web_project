// server.js

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 5000;

// Maria DB 
const connection = require('./db');

app.use(bodyParser.json());
app.use(cors());

app.get('/users', (req, res) => {
  // 이 부분에서 DB에서 사용자 데이터를 가져와야 합니다.
  let query = 'SELECT * FROM user'; // 실제 쿼리에 맞게 수정
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching user data:', err);
      return res.status(500).json({ success: false, message: '서버 에러' });
    }
    console.log('Fetched user data:', results); // 로그에 결과 출력
    const users = results.map(user => ({
      user_id: user.user_id,
      userNickName: user.userNickName,
      email: user.email,
      province: user.province,
      city: user.city,
      birthday: user.birthday
    }));

    res.json(users);
  });
})

// POST 엔드포인트: 사용자 등록을 처리하는 엔드포인트
app.post('/signup', (req, res) => {
  const { userNickName, email, password, province, city, birthday } = req.body;

  // 필요에 따라 수신된 데이터를 유효성 검사할 수 있습니다.

  // 사용자 데이터를 데이터베이스에 삽입
  let query = 'INSERT INTO user (userNickName, email, password, province, city, birthday) VALUES (?, ?, ?, ?, ?, ?)';
  connection.query(query, [userNickName, email, password, province, city, birthday], (err, results) => {
    if (err) {
      console.error('사용자 데이터를 삽입하는 중 에러 발생:', err);
      return res.status(500).json({ success: false, message: '회원가입에 실패했습니다.' });
    }
    
    console.log('사용자가 성공적으로 등록되었습니다:', results);
    res.json({ success: true, message: '회원가입이 완료되었습니다.' });
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
