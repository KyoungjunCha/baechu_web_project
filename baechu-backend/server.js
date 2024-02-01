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
    let query = 'INSERT INTO board (user_id, board_title, board_img, board_detail, province, city, category) VALUES (?, ?, ?, ?, ?, ?, ?)';
    let result = [
      user_id,
      board_title,
      board_img,
      board_detail,
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

app.delete('/myPostList', async (req, res) => {
  const postsToDelete = req.body.postsToDelete;

  if (!postsToDelete || postsToDelete.length === 0) {
    return res.status(400).json({ success: false, message: '삭제할 게시물이 선택되지 않았습니다.' });
  }

  // 게시물을 삭제하는 쿼리
  const deleteBoardQuery = 'DELETE FROM board WHERE board_id IN (?)';
  const postIds = postsToDelete.map(post => post.board_id);

  connection.query(deleteBoardQuery, [postIds], async (error, results) => {
    if (error) {
      console.error('Error deleting posts:', error);
      return res.status(500).json({ success: false, message: '게시물 삭제 중 오류가 발생했습니다.' });
    }

    // 이미지를 삭제하는 쿼리
    const deleteImgQuery = 'DELETE FROM img WHERE img_id IN (?)';
    // 댓글을 삭제하는 쿼리
    const deleteCommentQuery = 'DELETE FROM comment WHERE board_id IN (?)';
    // 댓글의 이미지를 삭제하는 쿼리
    const deleteCommentImgQuery = 'DELETE FROM commentimg WHERE img_id IN ' +
    '(SELECT img_id FROM img WHERE img_id IN ' +
    '(SELECT img_id FROM commentimg WHERE comment_id IN ' +
    '(SELECT comment_id FROM comment WHERE board_id = ?)))';
    const deleteCommentLikeQuery = 'DELETE FROM commentlike WHERE comment_id IN (SELECT comment_id FROM comment WHERE board_id = ?)';
    // 북마크를 삭제하는 쿼리
    const deleteBookMarkQuery = 'DELETE FROM bookmark WHERE board_id = ?';
    
    try {
      for (const postId of postIds) {
        // 이미지를 찾아오는 쿼리
        const findImgQuery = 'SELECT img_id FROM boardimg WHERE board_id = ?';
        const deleteBoardImgQuery = 'DELETE FROM boardimg WHERE board_id = ?';
        const deleteBoardLikeQuery = 'DELETE FROM boardlike WHERE board_id = ?';

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

      return res.status(200).json({ success: true, message: '게시물이 성공적으로 삭제되었습니다.' });
    } catch (error) {
      console.error('Error deleting images, comments, or comment images:', error);
      return res.status(500).json({ success: false, message: '이미지, 댓글 또는 댓글 이미지 삭제 중 오류가 발생했습니다.' });
    }
  });
});

app.get('/myCommentList', (req, res) => {
  const userId = req.query.userId;

  if (!userId) {
    return res.status(400).json({ success: false, message: '유효하지 않은 사용자입니다.' });
  }

  const query =
    'SELECT ' +
    'comment.comment_id, ' +
    'comment.comment_date, ' +
    'comment.comment_img, ' +
    'board.board_title, ' +
    'user.userNickName ' + 
    'FROM comment ' +
    'JOIN board ON comment.board_id = board.board_id ' +
    'JOIN user ON board.user_id = user.user_id ' + 
    'WHERE comment.user_id = ?';

  const values = [userId];

  connection.query(query, values, (error, results) => {
    if (error) {
      console.error('Error fetching user comments:', error);
      return res.status(500).json({ success: false, message: '댓글 목록을 가져오는 중 오류가 발생했습니다.' });
    }

    return res.status(200).json({ success: true, data: results, totalItems: results.length });
  });
});

app.delete('/myCommentList', async (req, res) => {
  const commentIdsToDelete = req.body.commentIdsToDelete;

  if (!commentIdsToDelete || commentIdsToDelete.length === 0) {
    return res.status(400).json({ success: false, message: '삭제할 댓글이 선택되지 않았습니다.' });
  }

  // 이미지 ID들에 대한 이미지 데이터를 삭제합니다.
  const deleteImagesQuery = `
  DELETE FROM img
  WHERE img_id IN (
    SELECT img_id
    FROM commentimg
    WHERE comment_id IN (${commentIdsToDelete.join(',')})
  );
`;

  // 댓글과 관련된 데이터를 삭제합니다.
  const deleteCommentDataQuery = `
    DELETE comment, commentimg, commentlike
    FROM comment
    LEFT JOIN commentimg ON comment.comment_id = commentimg.comment_id
    LEFT JOIN commentlike ON comment.comment_id = commentlike.comment_id
    WHERE comment.comment_id IN (${commentIdsToDelete.join(',')})
    OR comment.parents_id IN (${commentIdsToDelete.join(',')});
  `;

  try {
    // 1. 이미지 ID들에 대한 이미지 데이터 삭제
    await connection.query(deleteImagesQuery);

    // 2. 댓글과 관련된 데이터 삭제
    await connection.query(deleteCommentDataQuery);

    return res.status(200).json({ success: true, message: '댓글이 성공적으로 삭제되었습니다.' });
  } catch (error) {
    console.error('댓글 및 관련 데이터 삭제 중 오류 발생:', error);
    return res.status(500).json({ success: false, message: '댓글 삭제 중 오류가 발생했습니다.' });
  }
});

app.get('/bookMarkList', (req, res) => {
  const userId = req.query.userId;

  if (!userId) {
    return res.status(400).json({ success: false, message: '유효하지 않은 사용자입니다.' });
  }

  const query = 'SELECT ' +
  'bookmark.bookmark_id, ' +
  'bookmark.user_id, ' +
  'board.board_title, ' +
  'board.board_detail, ' +
  'board.board_img ' +
  'FROM bookmark ' +
  'JOIN board ON bookmark.board_id = board.board_id ' + 
  'WHERE bookmark.user_id = ?';

  const values = [userId];

  connection.query(query, values, (error, results) => {
    if (error) {
      console.error('Error fetching user comments:', error);
      return res.status(500).json({ success: false, message: '댓글 목록을 가져오는 중 오류가 발생했습니다.' });
    }
    return res.status(200).json({ success: true, data: results, totalItems: results.length });
  });
});

app.delete('/bookMarkList', (req, res) => {
  const bookmarkId = req.body.bookmarkId;

  const deleteQuery = `DELETE FROM bookmark WHERE bookmark_id = ?;`;

  // 데이터베이스에서 해당 ID의 북마크 삭제
  connection.query(deleteQuery, [bookmarkId], (err, result) => {
    if (err) {
      console.error('Error deleting bookmark:', err);
      res.status(500).json({ success: false, message: 'Error deleting bookmark' });
    } else {
      res.json({ success: true, message: 'Bookmark deleted successfully' });
    }
  });
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
