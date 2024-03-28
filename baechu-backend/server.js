// server.js

const express = require("express");
// const dotenv = require("dotenv");
// const cookieParser = require('cookie-parser');

const bodyParser = require("body-parser");
const cors = require("cors");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer"); // nodemailer 패키지 import
require('dotenv').config();

const { login,
  refreshToken,
  logout } = require('./controller')


const app = express();
const port = process.env.PORT || 5000;
// const accessSecretKey = "my-access-key"; // 실제로는 환경 변수 등을 사용해야 함
// const refreshSecretKey = "my-test-refresh-Key"
// const secretKey = "my-secret-key"

// Maria DB
const connection = require("./db");

//dotenv

app.use(bodyParser.json());
app.use(cors());







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

//토큰 발급을 위해 post 임
// app.post("/login", async (req, res) => {
//   const { userNickName, password } = req.body;

//   // 사용자 데이터를 데이터베이스에서 찾습니다.
//   let query = "SELECT * FROM user WHERE userNickName = ? LIMIT 1";
//   connection.query(query, [userNickName], async (err, results) => {
//     if (err) {
//       console.error("Error fetching user data:", err);
//       return res.status(500).json({ success: false, message: "서버 에러" });
//     }

//     if (results.length === 0) {
//       // 해당 닉네임을 가진 사용자가 없을 경우
//       return res.status(401).json({
//         success: false,
//         message: "해당 닉네임을 가진 사용자를 찾을 수 없습니다."
//       });
//     }

//     const user = results[0];
//     // 비밀번호 검증
//     const isPasswordValid = await bcrypt.compare(password, user.password);

//     if (!isPasswordValid) {
//       // 비밀번호가 일치하지 않을 경우
//       return res
//         .status(401)
//         .json({ success: false, message: "비밀번호가 일치하지 않습니다." });
//     }

//     // JWT 토큰 발급
//     const token = jwt.sign(
//       {
//         user_id: user.user_id,
//         userNickName: user.userNickName,
//         email: user.email,
//         province: user.province,
//         city: user.city,
//         birthday: user.birthday
//       },
//       secretKey,
//       { expiresIn: "1h" } // 토큰 만료 시간 설정 (1시간)
//     );

//     // 로그인 성공 및 토큰 전송
//     res.json({
//       success: true,
//       message: "로그인 성공",
//       token
//     });
//   });
// });

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

// app.get('/accesstoken', accessToken)

// app.get('/refreshtoken', refreshToken)

// //로그인 성공시에 접근하여 사용자 정보를 전달할 수 있게
// app.get('/login/success', loginSuccess)

// app.post('/logout', logout)

// app.post('/login', login)


app.post('/login', login);
app.get('/refreshToken', refreshToken);
app.post('/logout', logout);













// 동하
// 디텍토리 생성 및 연결
const fs = require("fs");
const path = require("path");

const multer = require("multer");
const upload = multer(); // multer 인스턴스 생성
app.use(upload.any());

// 이미지를 저장할 디렉토리 경로
const uploadImgDir = path.join(__dirname, "images");
const uploadFileDir = path.join(__dirname, "files");


app.post("/postWrite", async (req, res) => {
  // console.log('req.body:', req.body); // 요청의 바디 콘솔 출력
  // console.log("file", req.files);
  const { user_id, board_title, board_detail, province, city, category, youtub_url, web_url } =
    req.body;

  try {
    const board_date = new Date().toISOString().slice(0, 19).replace("T", " ");

    // 유효성 검사 추가
    if (!board_title || board_title.trim() === "") {
      return res
        .status(400)
        .json({ success: false, message: "제목은 비워 둘 수 없습니다." });
    }

    let board_img = "0"; // 이미지 유무를 나타내는 값 초기화
    let board_img_url = ""; // 이미지 URL 초기화

    let board_file = "0";
    let board_file_url = "";

    // 이미지 파일이 전송되었을 경우에만 처리
    if (req.files && req.files.length > 0) {
      // console.log("1단계들어옴");

      // req.files에 있는 파일들을 반복하면서 조건 확인
      for (const file of req.files) {
        if (file.fieldname === "image") {
          let uploadedImage = file;
          // console.log("이미지 들어옴");

          // 이미지 파일 저장하기
          if (!fs.existsSync(uploadImgDir)) {
            fs.mkdirSync(uploadImgDir); // 디렉토리가 없으면 생성
          }
          const imgPath = path.join(uploadImgDir, uploadedImage.originalname); // 이미지 파일 경로

          // 이미지 파일 저장
          fs.writeFile(imgPath, uploadedImage.buffer, (err) => {
            if (err) {
              console.error("Error saving image:", err);
            } else {
              console.log("Image saved successfully.");
            }
          });

          // 이미지 URL 생성
          board_img_url = `/images/${uploadedImage.originalname}`;

          // 이미지가 존재함을 나타내는 값 설정
          board_img = "1";

          // Inserting data into the 'img' table
          if (board_img_url) {
            const queryImg = "INSERT INTO img (img_url) VALUES (?)";
            await connection.query(queryImg, [board_img_url]);
          }
        } else if (file.fieldname === "file") {
          let uploadedFile = file;
          // console.log("파일 들어옴");

          if (!fs.existsSync(uploadFileDir)) {
            fs.mkdirSync(uploadFileDir);
          }
          const filePath = path.join(uploadFileDir, uploadedFile.originalname);

          fs.writeFile(filePath, uploadedFile.buffer, (err) => {
            if (err) {
              console.error("Error saving file:", err); // 에러 메시지 수정
            } else {
              console.log("File saved successfully.");
            }
          });

          board_file_url = `/files/${uploadedFile.originalname}`;

          board_file = "1";

          if (board_file_url) {
            const queryFile = "INSERT INTO file (file_url) VALUES (?)"; // 쿼리명 수정
            await connection.query(queryFile, [board_file_url]); // 변수명 수정
          }
        }
      }
    } else {
      console.log("이미지 또는 파일이 전송되지 않았습니다."); // 에러 메시지 추가
    }

    // Inserting data into the 'board' table
    let query =
      "INSERT INTO board (user_id, board_title, board_img, board_file, youtub_url, web_url, board_detail, province, city, category, board_date) " +
      "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    let result = [
      user_id,
      board_title,
      board_img,
      board_file,
      youtub_url,
      web_url,
      board_detail,
      province,
      city,
      category,
      board_date,
    ];
    // console.log('result', result);

    await connection.query(query, result);

    return res.status(201).json({
      success: true,
      message: "게시물 작성이 성공적으로 완료되었습니다.",
    });
  } catch (error) {
    console.error("Error writing post:", error);
    return res
      .status(500)
      .json({ success: false, message: "게시물 작성 중 오류가 발생했습니다." });
  }
});

app.get("/myPostList", (req, res) => {
  const userId = req.query.userId; // 프론트엔드에서 userId를 쿼리 파라미터로 전달하도록 가정

  if (!userId) {
    return res
      .status(400)
      .json({ success: false, message: "유효하지 않은 사용자입니다." });
  }

  // 해당 사용자의 게시물 목록을 가져오는 쿼리
  const query = "SELECT * FROM board WHERE user_id = ?";
  const values = [userId];

  connection.query(query, values, (error, results) => {
    if (error) {
      console.error("Error fetching user posts:", error);
      return res.status(500).json({
        success: false,
        message: "게시물 목록을 가져오는 중 오류가 발생했습니다.",
      });
    }

    return res.status(200).json({ success: true, data: results });
  });
});

app.delete("/myPostList", async (req, res) => {
  const postsToDelete = req.body.postsToDelete;

  if (!postsToDelete || postsToDelete.length === 0) {
    return res.status(400).json({
      success: false,
      message: "삭제할 게시물이 선택되지 않았습니다.",
    });
  }

  // 게시물을 삭제하는 쿼리
  const deleteBoardQuery = "DELETE FROM board WHERE board_id IN (?)";
  const postIds = postsToDelete.map((post) => post.board_id);

  connection.query(deleteBoardQuery, [postIds], async (error, results) => {
    if (error) {
      console.error("Error deleting posts:", error);
      return res.status(500).json({
        success: false,
        message: "게시물 삭제 중 오류가 발생했습니다.",
      });
    }

    // 이미지를 삭제하는 쿼리
    const deleteImgQuery = "DELETE FROM img WHERE img_id IN (?)";
    // 댓글을 삭제하는 쿼리
    const deleteCommentQuery = "DELETE FROM comment WHERE board_id IN (?)";
    // 댓글의 이미지를 삭제하는 쿼리
    const deleteCommentImgQuery =
      "DELETE FROM commentimg WHERE img_id IN " +
      "(SELECT img_id FROM img WHERE img_id IN " +
      "(SELECT img_id FROM commentimg WHERE comment_id IN " +
      "(SELECT comment_id FROM comment WHERE board_id = ?)))";
    const deleteCommentLikeQuery =
      "DELETE FROM commentlike WHERE comment_id IN (SELECT comment_id FROM comment WHERE board_id = ?)";
    // 북마크를 삭제하는 쿼리
    const deleteBookMarkQuery = "DELETE FROM bookmark WHERE board_id = ?";

    try {
      for (const postId of postIds) {
        // 이미지를 찾아오는 쿼리
        const findImgQuery = "SELECT img_id FROM boardimg WHERE board_id = ?";
        const deleteBoardImgQuery = "DELETE FROM boardimg WHERE board_id = ?";
        const deleteBoardLikeQuery = "DELETE FROM boardlike WHERE board_id = ?";

        const imgResult = await connection.query(findImgQuery, [postId]);

        if (imgResult && imgResult.length > 0) {
          const imgId = imgResult[0].img_id;
          // 이미지를 삭제하는 쿼리 실행
          await connection.query(deleteImgQuery, [imgId]);
        }
        await connection.query(deleteBoardImgQuery, [postId]);
        await connection.query(deleteBoardLikeQuery, [postId]);

        // 댓글의 이미지를 삭제하는 쿼리 실행
        await connection.query(deleteCommentImgQuery, [postId]);
        // 댓글에 해당하는 좋아요를 삭제하는 쿼리 실행
        await connection.query(deleteCommentLikeQuery, [postId]);
        // 댓글을 삭제하는 쿼리 실행
        await connection.query(deleteCommentQuery, [postId]);
        // 북마크를 삭제하는 쿼리 실행
        await connection.query(deleteBookMarkQuery, [postId]);
      }

      return res.status(200).json({
        success: true,
        message: "게시물이 성공적으로 삭제되었습니다.",
      });
    } catch (error) {
      console.error(
        "Error deleting images, comments, or comment images:",
        error
      );
      return res.status(500).json({
        success: false,
        message: "이미지, 댓글 또는 댓글 이미지 삭제 중 오류가 발생했습니다.",
      });
    }
  });
});

app.get("/myCommentList", (req, res) => {
  const userId = req.query.userId;

  if (!userId) {
    return res
      .status(400)
      .json({ success: false, message: "유효하지 않은 사용자입니다." });
  }

  const query =
    "SELECT " +
    "comment.comment_id, " +
    "comment.comment_date, " +
    "comment.comment_img, " +
    "board.board_title, " +
    "user.userNickName " +
    "FROM comment " +
    "JOIN board ON comment.board_id = board.board_id " +
    "JOIN user ON board.user_id = user.user_id " +
    "WHERE comment.user_id = ?";

  const values = [userId];

  connection.query(query, values, (error, results) => {
    if (error) {
      console.error("Error fetching user comments:", error);
      return res.status(500).json({
        success: false,
        message: "댓글 목록을 가져오는 중 오류가 발생했습니다.",
      });
    }

    return res
      .status(200)
      .json({ success: true, data: results, totalItems: results.length });
  });
});

app.delete("/myCommentList", async (req, res) => {
  const commentIdsToDelete = req.body.commentIdsToDelete;

  if (!commentIdsToDelete || commentIdsToDelete.length === 0) {
    return res
      .status(400)
      .json({ success: false, message: "삭제할 댓글이 선택되지 않았습니다." });
  }

  // 이미지 ID들에 대한 이미지 데이터를 삭제합니다.
  const deleteImagesQuery = `
  DELETE FROM img
  WHERE img_id IN (
    SELECT img_id
    FROM commentimg
    WHERE comment_id IN (${commentIdsToDelete.join(",")})
  );
`;

  // 댓글과 관련된 데이터를 삭제합니다.
  const deleteCommentDataQuery = `
    DELETE comment, commentimg, commentlike
    FROM comment
    LEFT JOIN commentimg ON comment.comment_id = commentimg.comment_id
    LEFT JOIN commentlike ON comment.comment_id = commentlike.comment_id
    WHERE comment.comment_id IN (${commentIdsToDelete.join(",")})
    OR comment.parents_id IN (${commentIdsToDelete.join(",")});
  `;

  try {
    // 1. 이미지 ID들에 대한 이미지 데이터 삭제
    await connection.query(deleteImagesQuery);

    // 2. 댓글과 관련된 데이터 삭제
    await connection.query(deleteCommentDataQuery);

    return res
      .status(200)
      .json({ success: true, message: "댓글이 성공적으로 삭제되었습니다." });
  } catch (error) {
    console.error("댓글 및 관련 데이터 삭제 중 오류 발생:", error);
    return res
      .status(500)
      .json({ success: false, message: "댓글 삭제 중 오류가 발생했습니다." });
  }
});

app.get("/bookMarkList", (req, res) => {
  const userId = req.query.userId;

  if (!userId) {
    return res
      .status(400)
      .json({ success: false, message: "유효하지 않은 사용자입니다." });
  }

  const query =
    "SELECT " +
    "bookmark.bookmark_id, " +
    "bookmark.user_id, " +
    "board.board_title, " +
    "board.board_detail, " +
    "board.board_img " +
    "FROM bookmark " +
    "JOIN board ON bookmark.board_id = board.board_id " +
    "WHERE bookmark.user_id = ?";

  const values = [userId];

  connection.query(query, values, (error, results) => {
    if (error) {
      console.error("Error fetching user comments:", error);
      return res.status(500).json({
        success: false,
        message: "댓글 목록을 가져오는 중 오류가 발생했습니다.",
      });
    }
    return res
      .status(200)
      .json({ success: true, data: results, totalItems: results.length });
  });
});

app.delete("/bookMarkList", (req, res) => {
  const bookmarkId = req.body.bookmarkId;

  const deleteQuery = `DELETE FROM bookmark WHERE bookmark_id = ?;`;

  // 데이터베이스에서 해당 ID의 북마크 삭제
  connection.query(deleteQuery, [bookmarkId], (err, result) => {
    if (err) {
      console.error("Error deleting bookmark:", err);
      res
        .status(500)
        .json({ success: false, message: "Error deleting bookmark" });
    } else {
      res.json({ success: true, message: "Bookmark deleted successfully" });
    }
  });
});

app.get("/post/:postId", (req, res) => {
  const boardId = req.params.postId;

  if (!boardId) {
    return res
      .status(400)
      .json({ success: false, message: "유효하지 않은 페이지입니다." });
  }

  const query =
    "SELECT " +
    "board.user_id, " +
    "board.board_date, " +
    "board.board_title, " +
    "board.board_detail, " +
    "board.province, " +
    "board.city, " +
    "board.board_img, " +
    "board.web_url, " +
    "board.youtub_url, " +
    "board.board_file, " +
    "board.views, " +
    "user.userNickName " +
    "FROM board " +
    "LEFT JOIN user ON board.user_id = user.user_id " +
    "WHERE board.board_id = ?";

  const values = [boardId];

  connection.query(query, values, (error, results) => {
    if (error) {
      console.error("Error fetching post details:", error);
      return res.status(500).json({
        success: false,
        message: "게시물 정보를 가져오는 중 오류가 발생했습니다.",
      });
    }

    if (results.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "해당 ID의 게시물을 찾을 수 없습니다." });
    }

    const postData = results[0];

    // 만약 board_img가 '001'이면 이미지 정보를 가져옵니다.
    if (postData.board_img === '001') {
      const imgQuery = "SELECT img.img_url FROM img INNER JOIN boardimg ON img.img_id = boardimg.img_id WHERE boardimg.board_id = ?";
      connection.query(imgQuery, [boardId], (imgError, imgResults) => {
        if (imgError) {
          console.error("Error fetching image:", imgError);
          return res.status(500).json({
            success: false,
            message: "이미지를 가져오는 중 오류가 발생했습니다.",
          });
        }

        if (imgResults.length > 0) {
          postData.img_url = imgResults[0].img_url;
        }

        // 이미지 파일을 읽어와 base64로 인코딩합니다.
        const imgPath = path.join(uploadImgDir, postData.img_url)
        const imageData = fs.readFileSync(imgPath);
        const base64Image = imageData.toString('base64');

        // 만약 board_file이 '001'이면 파일 정보를 가져옵니다.
        if (postData.board_file === '001') {
          const fileQuery = "SELECT file.file_url FROM file INNER JOIN boardfile ON file.file_id = boardfile.file_id WHERE boardfile.board_id = ?";
          connection.query(fileQuery, [boardId], (fileError, fileResults) => {
            if (fileError) {
              console.error("Error fetching file:", fileError);
              return res.status(500).json({
                success: false,
                message: "파일을 가져오는 중 오류가 발생했습니다.",
              });
            }

            if (fileResults.length > 0) {
              postData.file_url = fileResults[0].file_url;
            }

            const filePath = path.join(__dirname, postData.file_url)
            const fileData = fs.readFileSync(filePath);
            const base64File = fileData.toString('base64');

            return res.status(200).json({ success: true, data: postData, imgData: base64Image, fileData: base64File });
          });
        } else {
          return res.status(200).json({ success: true, data: postData, imgData: base64Image });
        }
      });
    } else {
      // 만약 board_file이 '001'이면 파일 정보를 가져옵니다.
      if (postData.board_file === '001') {
        const fileQuery = "SELECT file.file_url FROM file INNER JOIN boardfile ON file.file_id = boardfile.file_id WHERE boardfile.board_id = ?";
        connection.query(fileQuery, [boardId], (fileError, fileResults) => {
          if (fileError) {
            console.error("Error fetching file:", fileError);
            return res.status(500).json({
              success: false,
              message: "파일을 가져오는 중 오류가 발생했습니다.",
            });
          }

          if (fileResults.length > 0) {
            postData.file_url = fileResults[0].file_url;
          }

          const filePath = path.join(__dirname, postData.file_url)
          const fileData = fs.readFileSync(filePath);
          const base64File = fileData.toString('base64');

          return res.status(200).json({ success: true, data: postData, fileData: base64File });
        });
      } else {
        return res.status(200).json({ success: true, data: postData });
      }
    }
  });
});









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


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;
