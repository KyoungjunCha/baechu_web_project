import React, { useState } from "react";
import "./PasswordRecoveryForm.css";

const PasswordRecoveryForm = () => {
    const [username, setUsername] = useState("");

    const handleEmailVerification = () => {
        // 이메일 확인 로직 구현
        console.log("이메일 확인...");
    };

    const handleIssueTemporaryPassword = () => {
        // 임시 비밀번호 발행 로직 구현
        console.log("임시 비밀번호 발행...");
    };

    return (
        <div className="password-recovery-form">
            {/* <h2>비밀번호 찾기</h2> */}

            <label>
                * 아이디를 입력하세요.
                <div className="input-with-button">
                    <input
                        type="text"
                        placeholder="test@@"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <button onClick={handleEmailVerification}>이메일 확인</button>
                </div>
            </label>

            <label>
                * 임시 비밀번호 발행
                <button className="long-button" onClick={handleIssueTemporaryPassword}>
                    임시 비밀번호 발행
                </button>
            </label>
        </div>
    );
};

export default PasswordRecoveryForm;