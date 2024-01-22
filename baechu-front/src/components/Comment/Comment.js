import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faThumbsUp,
  faThumbsDown,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";
import "./Comment.css";

const Comment = ({ comment, isReply }) => {
  const [showReplies, setShowReplies] = useState(false);

  const handleLike = () => {
    // 추천 로직
    console.log("좋아요!");
  };

  const handleDislike = () => {
    // 비추천 로직
    console.log("싫어요!");
  };

  const toggleReplies = () => {
    setShowReplies((prevShowReplies) => !prevShowReplies);
  };

  return (
    <div className={`comment${isReply ? " reply" : ""}`}>
      <div className="comment-author">
        <img
          src={comment.author.profileImage}
          alt="프로필 이미지"
          className="profile-image"
        />
        <span>{comment.author.username}</span>
      </div>
      <p>{comment.text}</p>
      <div className="comment-meta">
        <div className="action-buttons">
          <button onClick={handleLike}>
            <FontAwesomeIcon icon={faThumbsUp} />
            <span>{comment.likes}</span>
          </button>
        </div>
        <div className="action-buttons">
          <button onClick={handleDislike}>
            <FontAwesomeIcon icon={faThumbsDown} />
            <span>{comment.dislikes}</span>
          </button>
        </div>
        <div className="timestamp" style={{ marginLeft: "auto" }}>
          {comment.timestamp}
        </div>
      </div>
      {/* 대댓글 토글 버튼 렌더링 */}
      {comment.replies && comment.replies.length > 0 && (
        <button className="reply-toggle" onClick={toggleReplies}>
          <FontAwesomeIcon icon={faChevronDown} />{" "}
          {showReplies
            ? "대댓글 숨기기"
            : `${comment.replies.length}개의 대댓글 보기`}
        </button>
      )}
      {/* 대댓글이 보이면 렌더링 */}
      {showReplies && comment.replies && comment.replies.length > 0 && (
        <div className="replies-container">
          {comment.replies.map((reply) => (
            <Comment key={reply.id} comment={reply} isReply={true} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Comment;
