import React from "react";
import PasswordRecoveryForm from "../components/PasswordRecoveryForm";

const PasswordRecoveryPage = () => {
  return (
    <div>
      <div className="centerText">
        <h2>비밀번호 찾기</h2>
        <PasswordRecoveryForm />
      </div>
    </div>
  );
};

export default PasswordRecoveryPage;
