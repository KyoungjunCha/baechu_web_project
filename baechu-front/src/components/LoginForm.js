// LoginForm.js
import React, { useState } from "react";
import { FaUser, FaKey } from "react-icons/fa";

import "./LoginForm.css";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // 로그인 로직 구현
    console.log("Logging in...");
  };

  return (
    <div className="login-form">
      <div className="icon-container">
        <i>
          <FaUser />
        </i>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="icon-container">
        <i>
          <FaKey />
        </i>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="links">
        <a href="/signup">회원가입</a>
        <span> / </span>
        <a href="/password-recovery">비밀번호 찾기</a>
      </div>
      <button onClick={handleLogin}>로그인</button>
    </div>
  );
};

export default LoginForm;
