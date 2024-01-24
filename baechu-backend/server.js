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

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
