// server.js

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer"); // nodemailer 패키지 import

const app = express();
const port = 5000;
const secretKey = "your-secret-key"; // 실제로는 환경 변수 등을 사용해야 함

// Maria DB
const connection = require("./db");

app.use(bodyParser.json());
app.use(cors());

// 유정
// '/bestlist'
app.get("/bestlist", (req, res) => {
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
      console.error("Error fetching best data:", err);
      return res.status(500).json({ success: false, message: "서버 에러" });
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
      likes: item.likes
    }));

    res.json(bestData);
  });
});

// '/bestlist/:id/views/increase'
app.put("/bestlist/:id/views/increase", (req, res) => {
  const postId = req.params.id;

  const updateViewsQuery = `
    UPDATE board
    SET views = views + 1
    WHERE board_id = ${postId}
  `;

  connection.query(updateViewsQuery, (err, results) => {
    if (err) {
      console.error("Error increasing views:", err);
      return res.status(500).json({ success: false, message: "서버 에러" });
    }

    res.json({ success: true, message: "조회수가 증가되었습니다." });
  });
});

// '/boardlist'
app.get("/boardlist", (req, res) => {
  let query = `
    SELECT b.board_id, b.category, b.board_img, b.board_title, b.user_id, b.views, b.board_date, b.province, 
           (SELECT COUNT(*) FROM boardlike WHERE board_id = b.board_id AND like_status = 1) AS likes
    FROM board AS b
    GROUP BY b.board_id
    ORDER BY b.board_date DESC
  `;

  connection.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching board data:", err);
      return res.status(500).json({ success: false, message: "서버 에러" });
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
      likes: item.likes
    }));

    res.json(boardData);
  });
});

// '/boardlist/:id/views/increase'
app.put("/boardlist/:id/views/increase", (req, res) => {
  const postId = req.params.id;

  const updateViewsQuery = `
    UPDATE board
    SET views = views + 1
    WHERE board_id = ${postId}
  `;

  connection.query(updateViewsQuery, (err, results) => {
    if (err) {
      console.error("Error increasing views:", err);
      return res.status(500).json({ success: false, message: "서버 에러" });
    }

    res.json({ success: true, message: "조회수가 증가되었습니다." });
  });
});

// '/search'
app.get("/search", (req, res) => {
  const { query } = req.query;

  const searchQuery = `
    SELECT b.category, b.board_img, b.board_title, b.user_id, b.views, b.board_date, b.province, 
           (SELECT COUNT(*) FROM boardlike WHERE board_id = b.board_id AND like_status = 1) AS likes
    FROM board AS b
    WHERE b.board_title LIKE '%${query}%'
  `;

  connection.query(searchQuery, (err, results) => {
    if (err) {
      console.error("Error fetching search data:", err);
      return res.status(500).json({ success: false, message: "서버 에러" });
    }

    const searchData = results.map(item => ({
      category: item.category,
      hasImage: item.board_img === 1,
      title: item.board_title,
      author: item.user_id,
      views: item.views,
      date: item.board_date,
      province: item.province,
      likes: item.likes
    }));

    res.json(searchData);
  });
});

// '/search/:id/views/increase'
app.put("/search/:id/views/increase", (req, res) => {
  const postId = req.params.id;

  const updateViewsQuery = `
    UPDATE board
    SET views = views + 1
    WHERE board_id = ${postId}
  `;

  connection.query(updateViewsQuery, (err, results) => {
    if (err) {
      console.error("Error increasing views:", err);
      return res.status(500).json({ success: false, message: "서버 에러" });
    }

    res.json({ success: true, message: "조회수가 증가되었습니다." });
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
      return res
        .status(404)
        .json({ success: false, message: "해당 정보를 가진 사용자를 찾을 수 없습니다." });
    }

    // 임시 비밀번호 생성
    const temporaryPassword = generateTemporaryPassword();

    // 데이터베이스에 임시 비밀번호 업데이트
    const updateQuery = "UPDATE user SET password = ? WHERE email = ?";
    connection.query(
      updateQuery,
      [temporaryPassword, email],
      (updateError, updateResults) => {
        if (updateError) {
          console.error("Error updating password:", updateError);
          return res.status(500).json({ success: false, message: "서버 에러" });
        }

        // 임시 비밀번호 이메일로 전송
        sendTemporaryPasswordEmail(email, temporaryPassword);

        res.json({ success: true, message: "임시 비밀번호가 이메일로 전송되었습니다." });
      }
    );
  });
});

// 임시 비밀번호 생성 함수
function generateTemporaryPassword() {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const length = 10;
  let temporaryPassword = "";
  for (let i = 0; i < length; i++) {
    temporaryPassword += characters.charAt(
      Math.floor(Math.random() * characters.length)
    );
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
      pass: "" // 보내는 이메일 비밀번호
    }
  });

  // 이메일 옵션 설정
  const mailOptions = {
    from: "", // 보내는 이메일 주소
    to: email, // 수신자 이메일 주소
    subject: "임시비밀번호발급", // 이메일 제목
    text: `임시비밀번호: ${temporaryPassword}` // 이메일 내용
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

//형민
app.get("/users", (req, res) => {
  // 이 부분에서 DB에서 사용자 데이터를 가져와야 합니다.
  let query = "SELECT * FROM user"; // 실제 쿼리에 맞게 수정
  connection.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching user data:", err);
      return res.status(500).json({ success: false, message: "서버 에러" });
    }
    console.log("Fetched user data:", results); // 로그에 결과 출력
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
});

app.post("/login", async (req, res) => {
  const { userNickName, password } = req.body;

  // 사용자 데이터를 데이터베이스에서 찾습니다.
  let query = "SELECT * FROM user WHERE userNickName = ? LIMIT 1";
  connection.query(query, [userNickName], async (err, results) => {
    if (err) {
      console.error("Error fetching user data:", err);
      return res.status(500).json({ success: false, message: "서버 에러" });
    }

    if (results.length === 0) {
      // 해당 닉네임을 가진 사용자가 없을 경우
      return res.status(401).json({
        success: false,
        message: "해당 닉네임을 가진 사용자를 찾을 수 없습니다."
      });
    }

    const user = results[0];
    // 비밀번호 검증
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      // 비밀번호가 일치하지 않을 경우
      return res
        .status(401)
        .json({ success: false, message: "비밀번호가 일치하지 않습니다." });
    }

    // JWT 토큰 발급
    const token = jwt.sign(
      {
        user_id: user.user_id,
        userNickName: user.userNickName,
        email: user.email,
        province: user.province,
        city: user.city,
        birthday: user.birthday
      },
      secretKey,
      { expiresIn: "1h" } // 토큰 만료 시간 설정 (1시간)
    );

    // 로그인 성공 및 토큰 전송
    res.json({
      success: true,
      message: "로그인 성공",
      token
    });
  });
});

app.post("/signup", async (req, res) => {
  const { userNickName, email, password, province, city, birthday } = req.body;

  try {
    // 비밀번호 해싱
    const hashedPassword = await bcrypt.hash(password, 10);

    // 주소 검증
    if (province === "서울특별시" && !city) {
      return res.status(400).json({
        success: false,
        message: "서울특별시를 선택했으면 시를 선택해주세요."
      });
    } else if (province !== "서울특별시" && (!city || city === "시를 선택하세요")) {
      return res.status(400).json({
        success: false,
        message: "시를 선택해주세요."
      });
    }

    // 사용자 데이터를 데이터베이스에 삽입
    let query =
      "INSERT INTO user (userNickName, email, password, province, city, birthday) VALUES (?, ?, ?, ?, ?, ?)";
    connection.query(
      query,
      [userNickName, email, hashedPassword, province, city, birthday],
      (err, results) => {
        if (err) {
          console.error("사용자 데이터를 삽입하는 중 에러 발생:", err);
          return res
            .status(500)
            .json({ success: false, message: "회원가입에 실패했습니다." });
        }

        console.log("사용자가 성공적으로 등록되었습니다:", results);
        res.json({ success: true, message: "회원가입이 완료되었습니다." });
      }
    );
  } catch (error) {
    console.error("비밀번호 해싱 중 에러 발생:", error);
    return res.status(500).json({ success: false, message: "회원가입에 실패했습니다." });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;
