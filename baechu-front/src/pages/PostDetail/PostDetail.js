import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useParams } from "react-router-dom";
import CommentList from "../../components/CommentList/CommentList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faThumbsUp,
  faThumbsDown,
} from "@fortawesome/free-solid-svg-icons";
import "./PostDetail.css";
import VideoPlayer from "../../components/VideoPlayer/VideoPlayer";
import CommentInput from "../../components/CommentInput/CommentInput";

const PostDetail = () => {
  // const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [fileData, setFileData] = useState(null);

  const postId = '1';
  const commentId = '0';

  const downloadFile = () => {
    const url = window.URL.createObjectURL(new Blob([fileData]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'filename.ext');
    document.body.appendChild(link);
    link.click();
  };

  useEffect(() => {
    const getPostDetail = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/post/${postId}`);
        
        // 서버에서는 결과를 배열로 보내기 때문에 [0]을 사용하여 첫 번째 요소만 가져옴
        setPost({ ...response.data.data, 
          imgData: response.data.imgData, 
          fileData: response.data.fileData }); 

        setFileData(response.data.fileData);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };
  
    getPostDetail();
  }, [postId]);

  return (
    <div className="post-detail">
      {post && (
        <div className="post">
          <div className="post-header">
            <div style={{ margin: '10px', textAlign: 'right' }}>{post.province}</div>
            <h2>
              {post.board_title}{" "}
              <div className="post-author">{post.userNickName}</div>
            </h2>
          </div>
          {/* 이미지를 중앙에 정렬 */}
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <img 
              style={{margin:'10px', width:'350px', height:'200px'}}
              src={`data:image/jpeg;base64,${post.imgData}`} 
              alt="게시물 이미지" 
              className="post-image" 
            />
          </div>
          {/* VideoPlayer를 사용하면서 videoUrl을 전달 */}
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <VideoPlayer videoUrl={post.youtub_url} />
          </div>
          <p>{post.board_detail}</p>
          <div>
            <a href={post.web_url} target="_blank" rel="noopener noreferrer">{post.web_url}</a>
          </div>
          {/* 파일 다운로드 링크 추가 */}
          {/* {fileData && (
            <div>
              <button onClick={downloadFile}>파일 다운로드</button>
            </div>
          )} */}
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
              <span className="timestamp">{post.board_date}</span> {/* 게시 날짜를 보여주도록 수정 */}
            </div>
          </div>
          <CommentInput postId={postId} commentId={commentId}/>
        </div>
      )}
      <CommentList postId={postId} />
    </div>
  );
};

export default PostDetail;
