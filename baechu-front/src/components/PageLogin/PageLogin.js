import React, { useState } from 'react';
import './PageLogin.css';
import { FaUser, FaKey } from 'react-icons/fa'; 

// 이미지 
import userImage from '../../images/user.png';
import myPostsImage from '../../images/myPosts.png';
import myCommentsImage from '../../images/Comments.png';
import bookmarkImage from '../../images/bookmark.png';

const UserProfile = ({ username }) => (
  <div className="RightTop">
    <div>
      <img src={userImage} alt="프로필 이미지" style={{ width: '50px', height: '50px', borderRadius: '50%', objectFit: 'cover', marginRight: '10px' }} />
    </div>
    <div className="userInfo">
      <p>{username}</p>
      <div className="userActions">
        <img src={myPostsImage} alt="내가 쓴 글" style={{ width: '30px', height: '30px', marginRight: '10px' }} />
        <img src={myCommentsImage} alt="내가 단 댓글" style={{ width: '30px', height: '30px', marginRight: '10px' }} />
        <img src={bookmarkImage} alt="북마크" style={{ width: '30px', height: '30px', marginRight: '10px' }} />
      </div>
    </div>
  </div>
);


const PageLogin = () => {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState(""); 

  const handleLogin = () => {
    const dummyUserId = "test";
    const dummyPassword = "test";

    if (username === dummyUserId && password === dummyPassword) {
      // 로그인 성공
      setLoggedIn(true);
    } else {
      // 로그인 실패
      alert("아이디 또는 비밀번호가 올바르지 않습니다.");
    }
  };

  return (
    <div className="LoginPage">
      {isLoggedIn ? (
        <UserProfile username={username} />
      ) : (
        <div className="LoginFormPage">
          {/* 로그인 폼 */}
          <div className="input-container">
  <div className="icon-container">
    <FaUser className="icon" />
  </div>
  <input
    type="text"
    placeholder="아이디"
    onChange={(e) => setUsername(e.target.value)}
  />
</div>
<div className="input-container">
  <div className="icon-container">
    <FaKey className="icon" />
  </div>
  <input
    type="password"
    placeholder="비밀번호"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button onClick={handleLogin}>로그인</button>
        </div>
      )}
    </div> 
  );
};

export default PageLogin;
