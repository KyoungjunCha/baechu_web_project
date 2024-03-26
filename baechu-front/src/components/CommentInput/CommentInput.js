import React, { useState } from 'react';
import axios from 'axios';
import imageIcon from '../../images/imgy.png';

const user_id = '2';

const CommentInput = (postId, commentId) => {
  const [showComments, setShowComments] = useState(false);
  const [comment_detail, setCommentDetail] = useState('');
  const [imgFile, setImgFile] = useState(null);
  const [imgFileName, setImgFileName] = useState(''); // 이미지 파일 이름 상태 추가
  
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const fileName = encodeURIComponent(file.name); // 파일 이름을 URL 인코딩
    setImgFile(file);
    setImgFileName(fileName); // 인코딩된 파일 이름 저장
};

const handleCommentPost = async () => {
  // console.log('board_id:', postId);
  // console.log('parents_id:', postId.commentId);
  try {
    const formData = new FormData();
    formData.append('board_id', postId.postId);
    formData.append('user_id', user_id);
    formData.append('comment_detail', comment_detail);
    formData.append('image', imgFile); // 이미지 파일 추가
    formData.append('parents_id', postId.commentId);


    // FormData에 값이 들어있는지 확인하고 출력
    const formDataValues = formData.entries();
    for (const [key, value] of formDataValues) {
      console.log(`Key: ${key}, Value: ${value}`);
    }

    const response = await axios.post('http://localhost:3000/commentWrite', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    console.log(response.data); // 성공 시 서버 응답 데이터 출력
    // 성공 시 사용자에게 알림 메시지 표시
    alert('댓글이 성공적으로 작성되었습니다.');
  } catch (error) {
    console.error('Error writing post:', error.response);
    // 오류 발생 시 사용자에게 오류 메시지 표시
    alert('댓글 작성 중 오류가 발생했습니다. 다시 시도해주세요.');
  }
};


  const toggleComments = () => {
    setShowComments((prevShowReplies) => !prevShowReplies);
  };


  return (
    <div className="commentInput">
      {showComments ? (
        <div className='commentWrite'>
          <textarea
            className='commentDetail'
            value={comment_detail}
            onChange={(e) => setCommentDetail(e.target.value)}
            placeholder="글을 작성하세요..."
          />
          <div className='imgLink'>
            <label htmlFor="imageUpload">
              <img src={imageIcon} alt="이미지 업로드" className="comment-img"/>
            </label>
            <input
              id="imageUpload"
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={handleImageUpload}
            />
          </div>
          <button className="commentPost" onClick={handleCommentPost}>입력</button>
        </div>
      ) : (
        <button className="comment-toggle" onClick={toggleComments} value={'댓글'}>
          <div>댓글</div>
        </button>
      )}
    </div>
  );
};

export default CommentInput;
