// components/CommentList/CommentList.js

import React, { useState, useEffect } from "react";
import Comment from "../Comment/Comment";
import Pagination from "../Pagination/Pagination";
import "./CommentList.css";

const CommentList = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const commentsPerPage = 20;

  useEffect(() => {
    // 여기서 postId에 해당하는 댓글 데이터를 가져오는 API 호출 등을 수행
    // 더미 데이터로 대체
    const dummyComments = Array.from({ length: 100 }, (_, index) => ({
      id: index + 1,
      text: `댓글 ${index + 1}`,
      likes: Math.floor(Math.random() * 10),
      dislikes: Math.floor(Math.random() * 5),
      timestamp: "2024-01-19T12:30:00",
      author: {
        username: `유저${index + 1}`,
        profileImage: "URL_TO_PROFILE_IMAGE",
      },
      replies:
        index === 0
          ? [
              /* 대댓글이 있는 경우에만 배열에 추가합니다. */
              {
                id: 101,
                text: "대댓글 1",
                likes: 5,
                dislikes: 2,
                timestamp: "2024-01-19T12:35:00",
                author: {
                  username: "대댓글1 작성자",
                  profileImage: "URL_TO_PROFILE_IMAGE",
                },
              },
              {
                id: 102,
                text: "대댓글 2",
                likes: 3,
                dislikes: 1,
                timestamp: "2024-01-19T12:40:00",
                author: {
                  username: "대댓글2 작성자",
                  profileImage: "URL_TO_PROFILE_IMAGE",
                },
              },
            ]
          : [],
    }));

    setComments(dummyComments);
  }, [postId]);

  const indexOfLastComment = currentPage * commentsPerPage;
  const indexOfFirstComment = indexOfLastComment - commentsPerPage;
  const currentComments = comments.slice(
    indexOfFirstComment,
    indexOfLastComment
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="comment-list">
      <h3>댓글</h3>
      {currentComments.map((comment) => (
        <div key={comment.id}>
          <Comment comment={comment} />
        </div>
      ))}
      <Pagination
        itemsPerPage={commentsPerPage}
        totalItems={comments.length}
        currentPage={currentPage}
        paginate={paginate}
      />
    </div>
  );
};

export default CommentList;
