import React, { useState } from 'react';
import './PageLogin.css';
import axios from 'axios';
import { FaUser, FaKey } from 'react-icons/fa';

// 이미지 
import userImage from '../../images/user.png';
import myPostsImage from '../../images/myPosts.png';
import myCommentsImage from '../../images/Comments.png';
import bookmarkImage from '../../images/bookmark.png';
// import { response } from '../../../../baechu-backend/server';

const UserProfile = ({ username, onLogout }) => (
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
      <button onClick={onLogout} className="logoutButton">로그아웃</button>
    </div>
  </div>
);


const PageLogin = () => {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [userNickname, setUserNickname] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      // const response = await axios.post(`${process.env.REACT_APP_API_URL}/login`, {
      //   userNickName: userNickname,
      //   password
      // });

      const response = await axios.post("http://localhost:5000/login", {
        userNickName: userNickname,
        password
      });


      if (response.data.success) {
        console.log("로그인 성공", response.data);

        localStorage.setItem('accessToken', response.data.accessToken);
        localStorage.setItem('refreshToken', response.data.refreshToken);
        setLoggedIn(true);
        // 로그인 성공 시에 다음 페이지로 이동하거나 필요한 동작을 수행합니다.
        // 예를 들어, 다음 페이지로 이동하는 경우:
        // history.push("/next-page");
      } else {
        console.error("로그인 실패:", response.data.message);
        // 로그인 실패 시의 동작을 추가하면 됩니다.
      }
    } catch (error) {
      console.error("로그인 오류:", error.message);
      // 오류 발생 시의 동작을 추가하면 됩니다.
    }
  };

  const handleLogout = async () => {
    // localStorage에서 토큰을 제거합니다.
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    // 로그인 상태를 false로 변경합니다.
    setLoggedIn(false);
    console.log("로그아웃 정상적으로 완료");
    // 로그아웃 후의 동작을 수행합니다.
    // 예를 들어, 로그인 페이지로 리다이렉트:
    // history.push("/login");
  };

  return (
    <div className="LoginPage">
      {isLoggedIn ? (
        <UserProfile userNickname={userNickname} onLogout={handleLogout} />
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
              onChange={(e) => setUserNickname(e.target.value)}
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
