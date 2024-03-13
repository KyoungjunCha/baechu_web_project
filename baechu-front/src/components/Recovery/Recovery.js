import React, { useState } from 'react';
import axios from 'axios';
import './Recovery.css';

function Recovery() {
  const [email, setEmail] = useState('');
  const [userNickName, setUserNickName] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5001/recovery', { email, userNickName }); // 서버 주소를 수정

      if (response.data.success) {
        setMessage(response.data.message);
      } else {
        setMessage(response.data.message);
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('서버 에러');
    }
  };

  return (
    <div className="Recovery">
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">이메일:</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label htmlFor="userNickName">사용자 닉네임:</label>
        <input
          id="userNickName"
          type="text"
          value={userNickName}
          onChange={(e) => setUserNickName(e.target.value)}
          required
        />
        <button type="submit">비밀번호 재설정</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default Recovery;
