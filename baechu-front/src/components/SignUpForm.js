import React, { useState } from "react";
import "./SignUpForm.css";

const SignUpForm = () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [nickname, setNickname] = useState("");
  const [address, setAddress] = useState("");
  const [birthYear, setBirthYear] = useState("");
  const [birthMonth, setBirthMonth] = useState("");
  const [birthDay, setBirthDay] = useState("");

  const handleSignUp = () => {
    if (password !== confirmPassword) {
      console.error("비밀번호와 비밀번호 확인이 일치하지 않습니다.");
      // 또는 사용자에게 알림을 보여줄 수 있습니다.
      return;
    }

    // Implement your signup logic here
    console.log("Signing up...");
  };

  return (
    <div className="sign-up-form">
      <label>
        아이디
        <div className="input-with-button">
          <input
            type="text"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
          <button>중복 체크</button>
        </div>
      </label>
      <label>
        비밀번호
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <label>
        비밀번호 확인
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </label>
      <label>
        이메일
        <div className="input-with-button">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button>인증번호 발송</button>
        </div>
      </label>
      <label>
        인증번호
        <div className="input-with-button">
          <input
            type="text"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
          />
          <button>인증 확인</button>
        </div>
      </label>
      <label>
        닉네임
        <div className="input-with-button">
          <input
            type="text"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />
          <button>중복 체크</button>
        </div>
      </label>
      <label>
        주소
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </label>
      <label>
        생년월일
        <div className="birthday-select">
          <select
            value={birthYear}
            onChange={(e) => setBirthYear(e.target.value)}
          >
            <option value="">연도</option>
            {/* 연도 옵션 추가 */}
            {Array.from({ length: 100 }, (_, index) => {
              const year = new Date().getFullYear() - index;
              return (
                <option key={year} value={year}>
                  {year}
                </option>
              );
            })}
          </select>
          <select
            value={birthMonth}
            onChange={(e) => setBirthMonth(e.target.value)}
          >
            <option value="">월</option>
            {/* 월 옵션 추가 */}
            {Array.from({ length: 12 }, (_, index) => (
              <option key={index + 1} value={index + 1}>
                {index + 1}
              </option>
            ))}
          </select>
          <select
            value={birthDay}
            onChange={(e) => setBirthDay(e.target.value)}
          >
            <option value="">일</option>
            {/* 일 옵션 추가 */}
            {Array.from({ length: 31 }, (_, index) => (
              <option key={index + 1} value={index + 1}>
                {index + 1}
              </option>
            ))}
          </select>
        </div>
      </label>
      <button onClick={handleSignUp}>회원가입 하기</button>
    </div>
  );
};

export default SignUpForm;
