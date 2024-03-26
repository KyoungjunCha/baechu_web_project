import React, { useState, useEffect } from "react";
import axios from 'axios';
import Comment from "../Comment/Comment";
import Pagination from "../Pagination/Pagination";
import "./CommentList.css";

const pageSize = 10;

const CommentList = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/postcomment/${postId}`);
        setComments(response.data.data);
        console.log("comments: ",response.data.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };
  
    fetchData();
  }, [postId]);
  

  const totalItemsCount = Array.isArray(comments) ? comments.length : 0;
  // console.log("length:",comments.length);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, totalItemsCount);
  const currentComments = Array.isArray(comments) ? comments.slice(startIndex, endIndex) : [];

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="comment-list">
      <h3>댓글</h3>
      {currentComments.map((comment) => (
        <div key={comment.comment_id}>
          <Comment comment={comment} />
        </div>
      ))}
      <Pagination
        itemsPerPage={pageSize}
        totalItems={totalItemsCount}
        currentPage={currentPage}
        paginate={paginate}
      />
    </div>
  );
};

export default CommentList;
