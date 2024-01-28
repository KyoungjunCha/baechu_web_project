// server.js

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const bcrypt = require("bcrypt");

const app = express();
const port = 5000;

// Maria DB
const connection = require("./db");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.get("/users", (req, res) => {
  // 이 부분에서 DB에서 사용자 데이터를 가져와야 합니다.
  let query = "SELECT * FROM user"; // 실제 쿼리에 맞게 수정
  connection.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching user data:", err);
      return res.status(500).json({ success: false, message: "서버 에러" });
    }
    console.log("Fetched user data:", results); // 로그에 결과 출력
    const users = results.map((user) => ({
      user_id: user.user_id,
      userNickName: user.userNickName,
      email: user.email,
      province: user.province,
      city: user.city,
      birthday: user.birthday,
    }));

    res.json(users);
  });
});

// 로그인 엔드포인트 추가
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
        message: "해당 닉네임을 가진 사용자를 찾을 수 없습니다.",
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

    // 로그인 성공
    res.json({
      success: true,
      message: "로그인 성공",
      user: {
        user_id: user.user_id,
        userNickName: user.userNickName,
        email: user.email,
        province: user.province,
        city: user.city,
        birthday: user.birthday,
      },
    });
  });
});

app.post("/signup", async (req, res) => {
  const { userNickName, email, password, province, city, birthday } = req.body;

  // 비밀번호 해싱
  const hashedPassword = await bcrypt.hash(password, 10);

  // 사용자 데이터를 데이터베이스에 삽입
  let query =
    "INSERT INTO user (userNickName, email, password, province, city, birthday) VALUES (?, ?, ?, ?, ?, ?)";
  connection.query(
    query,
    [userNickName, email, password, province, city, birthday],
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
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
