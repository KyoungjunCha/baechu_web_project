import React, { useState, useEffect } from "react";
import axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faThumbsUp,
  faThumbsDown,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";
import "./Comment.css";
import CommentInput from "../../components/CommentInput/CommentInput";

const userId = 5;

const Comment = ({ comment, isReply }) => {
  const [showReplies, setShowReplies] = useState(false);
  const [commentReplies, setCommentReplies] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/commentReplies/${comment.board_id}/${comment.comment_id}`);
        setCommentReplies(response.data.data);
        console.log("commentReplies: ",response.data.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };
  
    fetchData();
  }, [comment]);


    const handleLike = async () => {
      try {
        console.log('좋아요');
        const response = await axios.post(`http://localhost:3000/commentLike/${comment.comment_id}`, {
          comment_id: comment.comment_id,
          user_id: userId,
        });
        console.log(response.data);
      } catch (error) {
        console.error('Error adding like:', error);
      }
    };
    
    const handleDislike = async () => {
      try {
        const response = await axios.post(`http://localhost:3000/commentDislike/${comment.comment_id}`, {
          comment_id: comment.comment_id,
          user_id : userId,
        });
        console.log(response.data);
      } catch (error) {
        console.error('Error adding dislike:', error);
      }
    };
    
  const toggleReplies = () => {
    setShowReplies((prevShowReplies) => !prevShowReplies);
  };

  return (
    <div className={`comment${isReply ? " reply" : ""}`}>
      <h3>{comment.userNickName}</h3>
      <div className="comment-author">
        {comment.imgData && (
            <img
              style={{ margin: '10px', width: '150px', height: '100px' }}
              src={`data:image/jpeg;base64,${comment.imgData}`}
              alt="프로필 이미지"
              className="profile-image"
            />
          )}
      </div>
      <p>{comment.comment_detail}</p>
      <div className="comment-meta">
        <div className="action-buttons">
          <button onClick={handleLike}>
            <FontAwesomeIcon icon={faThumbsUp} />
            <span>{comment.like_count}</span>
          </button>
        </div>
        <div className="action-buttons">
          <button onClick={handleDislike}>
            <FontAwesomeIcon icon={faThumbsDown} />
            <span>{comment.dislike_count}</span>
          </button>
        </div>
        <div className="timestamp" style={{ marginLeft: "auto" }}>
          {comment.comment_date}
        </div>
        <CommentInput postId={comment.board_id} commentId={comment.comment_id}/>
      </div>
      {/* 대댓글 토글 버튼 렌더링 */}
      {commentReplies && commentReplies.length > 0 && (
        <button className="reply-toggle" onClick={toggleReplies}>
          <FontAwesomeIcon icon={faChevronDown} />{" "}
          {showReplies ? "대댓글 숨기기" : `${commentReplies.length}개의 대댓글 보기`}
        </button>
      )}
      {/* 대댓글이 보이면 렌더링 */}
      {showReplies && commentReplies && commentReplies.length > 0 && (
        <div className="replies-container">
          {commentReplies.map((reply) => (
            <Comment key={reply.comment_id} comment={reply} isReply={true} />
          ))}
        </div>
      )}
    </div>
  );
};
export default Comment;
