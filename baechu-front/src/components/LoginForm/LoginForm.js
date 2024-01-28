// LoginForm.js
import React, { useState } from "react";
import { FaUser, FaKey } from "react-icons/fa";
import axios from "axios";
import "./LoginForm.css";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:5000/login", {
        userNickName: username,
        password,
      });

      if (response.data.success) {
        console.log("로그인 성공");

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
