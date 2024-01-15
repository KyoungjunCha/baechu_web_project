import React from "react";
import SignUpForm from "../components/SignUpForm";

const SignUpPage = () => {
  return (
    <div>
      {/* You can include the header if needed */}
      {/* <Header /> */}
      <div className="centerText">
        <h2>회원가입</h2>
        <SignUpForm />
      </div>
      {/* Include the footer if needed */}
      {/* <Footer /> */}
    </div>
  );
};

export default SignUpPage;
