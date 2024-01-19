import React, { useState } from 'react';
import './PageLogin.css';

// 이미지 
import userImage from '../../images/user.png';

const UserProfile = ({ username }) => (
  <div className="RightTop">
    <div>
      <img src={userImage} alt="프로필 이미지" />
    </div>
    <div>
      <p>{username}</p>
      <p>내가 쓴 글</p>
      <p>내가 단 댓글</p>
      <p>북마크</p>
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
        <div className="LoginForm">
          {/* 로그인 폼 */}
          <input
            type="text"
            placeholder="아이디"
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="비밀번호"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleLogin}>로그인</button>
        </div>
      )}
    </div>
  );
};

export default PageLogin;
