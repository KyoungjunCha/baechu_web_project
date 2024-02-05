import React, { useState } from "react";
import "./SignUpForm.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignUpForm = () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [nickname, setNickname] = useState("");
  // const [address, setAddress] = useState("");
  const [birthYear, setBirthYear] = useState("");
  const [birthMonth, setBirthMonth] = useState("");
  const [birthDay, setBirthDay] = useState("");

  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  const [userNickName, setUserNickName] = useState("");
  const [province, setProvince] = useState("");
  const [city, setCity] = useState("");
  const [birthday, setBirthday] = useState("");
  const [isNicknameAvailable, setIsNicknameAvailable] = useState(null);

  const navigate = useNavigate();

  // 추가: 닉네임 중복 확인 함수
  const handleCheckNickname = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/check-nickname/${nickname}`
      );

      if (response.data.available) {
        setIsNicknameAvailable(true);
        console.log("사용 가능한 닉네임입니다.");
      } else {
        setIsNicknameAvailable(false);
        console.log("이미 사용 중인 닉네임입니다.");
      }
    } catch (error) {
      console.error("닉네임 중복 확인 오류:", error);
    }
  };

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      console.error("비밀번호와 비밀번호 확인이 일치하지 않습니다.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/signup", {
        userNickName: nickname,
        email,
        password,
        province: selectedProvince,
        city: selectedCity,
        birthday: `${birthYear}-${birthMonth}-${birthDay}`,
      });

      console.log("회원가입 성공:", response.data);
      // 회원가입 성공 후 로그인 페이지로 이동
      navigate("/login");
    } catch (error) {
      console.error("회원가입 오류:", error.response.data.message);
      // 사용자에게 오류 메시지를 보여줄 수 있습니다.
    }
  };

  const provinces = [
    "서울특별시",
    "경기도",
    "강원도",
    "충청도",
    "경상도",
    "전라도",
  ];
  const cities = {
    서울특별시: ["강남", "강북"],
    경기도: ["수원시", "성남시", "용인시", "안양시", "부천시"],
    강원도: ["춘천시", "원주시", "강릉시", "속초시", "동해시"],
    충청도: ["청주시", "대전시", "충주시", "홍성군", "보령시"],
    경상도: ["부산시", "대구시", "울산시", "창원시", "포항시"],
    전라도: ["전주시", "광주시", "목포시", "순천시", "여수시"],
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
          <button onClick={handleCheckNickname}>중복 체크</button>
        </div>
      </label>
      <label>
        도
        <select
          value={selectedProvince}
          onChange={(e) => {
            setSelectedProvince(e.target.value);
            setSelectedCity("");
          }}
        >
          <option value="">도를 선택하세요</option>
          {provinces.map((province) => (
            <option key={province} value={province}>
              {province}
            </option>
          ))}
        </select>
      </label>

      {selectedProvince && (
        <label>
          시
          <select
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
          >
            <option value="">시를 선택하세요</option>
            {cities[selectedProvince].map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </label>
      )}
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
