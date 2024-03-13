const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connection = require('./db'); // MariaDB 연결 설정
const nodemailer = require('nodemailer'); // nodemailer 패키지 import

const app = express();
const port = process.env.PORT || 5001;

app.use(bodyParser.json());
app.use(cors());


// '/bestlist'
app.get('/bestlist', (req, res) => {
  let query = `
    SELECT b.board_id, b.category, b.board_img, b.board_title, b.user_id, b.views, b.board_date, b.province, 
           (SELECT COUNT(*) FROM boardlike WHERE board_id = b.board_id AND like_status = 1) AS likes
    FROM board AS b
    GROUP BY b.board_id
    HAVING likes >= 0  
    ORDER BY likes DESC
  `;

  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching best data:', err);
      return res.status(500).json({ success: false, message: '서버 에러' });
    }

    const bestData = results.map(item => ({
      id: item.board_id,
      category: item.category,
      hasImage: item.board_img === 1,
      title: item.board_title,
      author: item.user_id,
      views: item.views,
      date: item.board_date,  
      province: item.province,
      likes: item.likes,
    }));

    res.json(bestData);
  });
});

// '/bestlist/:id/views/increase'
app.put('/bestlist/:id/views/increase', (req, res) => {
  const postId = req.params.id;

  const updateViewsQuery = `
    UPDATE board
    SET views = views + 1
    WHERE board_id = ${postId}
  `;

  connection.query(updateViewsQuery, (err, results) => {
    if (err) {
      console.error('Error increasing views:', err);
      return res.status(500).json({ success: false, message: '서버 에러' });
    }

    res.json({ success: true, message: '조회수가 증가되었습니다.' });
  });
});

// '/boardlist'
app.get('/boardlist', (req, res) => {
  let query = `
    SELECT b.board_id, b.category, b.board_img, b.board_title, b.user_id, b.views, b.board_date, b.province, 
           (SELECT COUNT(*) FROM boardlike WHERE board_id = b.board_id AND like_status = 1) AS likes
    FROM board AS b
    GROUP BY b.board_id
    ORDER BY b.board_date DESC
  `;
  
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching board data:', err);
      return res.status(500).json({ success: false, message: '서버 에러' });
    }

    const boardData = results.map(item => ({
      id: item.board_id,
      category: item.category,
      hasImage: item.board_img === 1,
      title: item.board_title,
      author: item.user_id,
      views: item.views,
      date: item.board_date,  
      province: item.province,
      likes: item.likes,
    }));

    res.json(boardData);
  });
});

// '/boardlist/:id/views/increase'
app.put('/boardlist/:id/views/increase', (req, res) => {
  const postId = req.params.id;

  const updateViewsQuery = `
    UPDATE board
    SET views = views + 1
    WHERE board_id = ${postId}
  `;

  connection.query(updateViewsQuery, (err, results) => {
    if (err) {
      console.error('Error increasing views:', err);
      return res.status(500).json({ success: false, message: '서버 에러' });
    }

    res.json({ success: true, message: '조회수가 증가되었습니다.' });
  });
});

// '/search'
app.get('/search', (req, res) => {
  const { query } = req.query;

  const searchQuery = `
    SELECT b.category, b.board_img, b.board_title, b.user_id, b.views, b.board_date, b.province, 
           (SELECT COUNT(*) FROM boardlike WHERE board_id = b.board_id AND like_status = 1) AS likes
    FROM board AS b
    WHERE b.board_title LIKE '%${query}%'
  `;
  
  connection.query(searchQuery, (err, results) => {
    if (err) {
      console.error('Error fetching search data:', err);
      return res.status(500).json({ success: false, message: '서버 에러' });
    }

    const searchData = results.map(item => ({
      category: item.category,
      hasImage: item.board_img === 1,
      title: item.board_title,
      author: item.user_id,
      views: item.views,
      date: item.board_date,  
      province: item.province,
      likes: item.likes,
    }));

    res.json(searchData);
  });
});

// '/search/:id/views/increase'
app.put('/search/:id/views/increase', (req, res) => {
  const postId = req.params.id;

  const updateViewsQuery = `
    UPDATE board
    SET views = views + 1
    WHERE board_id = ${postId}
  `;

  connection.query(updateViewsQuery, (err, results) => {
    if (err) {
      console.error('Error increasing views:', err);
      return res.status(500).json({ success: false, message: '서버 에러' });
    }

    res.json({ success: true, message: '조회수가 증가되었습니다.' });
  });
});

// GET 요청 처리: 유저 테이블에서 이메일과 닉네임 가져오기
app.get("/user", (req, res) => {
  // 유저 테이블에서 이메일과 유저 닉네임 가져오기
  const query = "SELECT email, userNickName FROM user";
  connection.query(query, (error, results) => {
    if (error) {
      console.error("Error fetching users:", error);
      return res.status(500).json({ success: false, message: "서버 에러" });
    }

    // 조회된 사용자 정보를 클라이언트에 응답으로 제공
    res.json({ success: true, users: results });
  });
});

// POST 요청 처리: 비밀번호 복구
app.post("/recovery", (req, res) => {
  const { email, userNickName } = req.body;

  // 이메일과 사용자 닉네임으로 사용자 조회
  const query = "SELECT * FROM user WHERE email = ? AND userNickName = ?";
  connection.query(query, [email, userNickName], (error, results) => {
    if (error) {
      console.error("Error fetching user:", error);
      return res.status(500).json({ success: false, message: "서버 에러" });
    }

    // 이메일과 사용자 닉네임으로 사용자가 존재하지 않는 경우
    if (results.length === 0) {
      return res.status(404).json({ success: false, message: "해당 정보를 가진 사용자를 찾을 수 없습니다." });
    }

    // 임시 비밀번호 생성
    const temporaryPassword = generateTemporaryPassword();

    // 데이터베이스에 임시 비밀번호 업데이트
    const updateQuery = "UPDATE user SET password = ? WHERE email = ?";
    connection.query(updateQuery, [temporaryPassword, email], (updateError, updateResults) => {
      if (updateError) {
        console.error("Error updating password:", updateError);
        return res.status(500).json({ success: false, message: "서버 에러" });
      }

      // 임시 비밀번호 이메일로 전송
      sendTemporaryPasswordEmail(email, temporaryPassword);

      res.json({ success: true, message: "임시 비밀번호가 이메일로 전송되었습니다." });
    });
  });
});

// 임시 비밀번호 생성 함수
function generateTemporaryPassword() {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const length = 10;
  let temporaryPassword = "";
  for (let i = 0; i < length; i++) {
    temporaryPassword += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return temporaryPassword;
}

// 이메일로 임시 비밀번호를 전송하는 함수
function sendTemporaryPasswordEmail(email, temporaryPassword) {
  // 이메일 전송 설정
  const transporter = nodemailer.createTransport({
    service: "naver",
    auth: {
      user: "", // 보내는 이메일 주소
      pass: "", // 보내는 이메일 비밀번호
    },
  });

  // 이메일 옵션 설정
  const mailOptions = {
    from: "", // 보내는 이메일 주소
    to: email, // 수신자 이메일 주소
    subject: "임시비밀번호발급", // 이메일 제목
    text: `임시비밀번호: ${temporaryPassword}`, // 이메일 내용
  };

  // 이메일 전송
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
    } else {
      console.log("Email sent:", info.response);
    }
  });
}

// 서버 리스닝
app.listen(port, () => {
  console.log(`서버가 포트 ${port}에서 실행 중입니다.`);
});