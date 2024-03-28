import React, { useState } from 'react';
import './PageLogin.css';
import { FaUser, FaKey } from 'react-icons/fa';
import userImage from '../../images/user.png';
import myPostsImage from '../../images/myPosts.png';
import myCommentsImage from '../../images/Comments.png';
import bookmarkImage from '../../images/bookmark.png';

const UserProfile = ({ username }) => (
    <div className="RightTop">
        <img src={userImage} alt="프로필 이미지" />
        <div className="userInfo">
            <p>{username}</p>
            <div className="userActions">
                <img src={myPostsImage} alt="내가 쓴 글" />
                <img src={myCommentsImage} alt="내가 단 댓글" />
                <img src={bookmarkImage} alt="북마크" />
            </div>
        </div>
    </div>
);

const PageLogin = () => {
    const [isLoggedIn, setLoggedIn] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    // handleLogin 함수를 정의합니다.
    const handleLogin = () => {
        // 여기에 로그인 로직을 구현합니다.
        // 예: API 호출로 사용자 인증 후 로그인 상태 변경
        // setLoggedIn(true);
    };

    return (
        <div className="LoginPage">
            {isLoggedIn ? (
                <UserProfile username={username} />
            ) : (
                <div className="LoginFormPage">
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
