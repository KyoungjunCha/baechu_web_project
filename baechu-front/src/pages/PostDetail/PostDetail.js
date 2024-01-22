// PostDetail.js

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import CommentList from "../../components/CommentList/CommentList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faThumbsUp,
  faThumbsDown,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";
import "./PostDetail.css";

const PostDetail = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const dummyPost = {
      id: postId,
      title: "게시글 제목",
      content: "게시글 내용",
      likes: 10,
      dislikes: 2,
      timestamp: "2024-01-19T12:30:00",
      author: {
        username: "작성자",
        profileImage: "URL_TO_PROFILE_IMAGE",
      },
    };

    setPost(dummyPost);
  }, [postId]);

  return (
    <div className="post-detail">
      {post && (
        <div className="post">
          <div className="post-header">
            <h2>
              {post.title}{" "}
              <span className="post-author">{post.author.username}</span>
            </h2>
          </div>
          <p>{post.content}</p>
          <div className="post-meta">
            <div className="action-buttons">
              <button>
                <FontAwesomeIcon icon={faThumbsUp} /> 추천
              </button>
              <button>
                <FontAwesomeIcon icon={faThumbsDown} /> 비추천
              </button>
            </div>
            <div className="comment-meta">
              <span className="timestamp">{post.timestamp}</span>
            </div>
          </div>
        </div>
      )}
      <CommentList postId={postId} />
    </div>
  );
};

export default PostDetail;
