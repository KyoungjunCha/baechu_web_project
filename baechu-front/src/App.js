import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import TalkDetail from "./pages/TalkDetail";
import BoardList from "./components/BoardList";
import PasswordRecoveryPage from "./pages/PasswordRecoveryPage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import "./index.css";
import TalkList from "./pages/TalkList";

const App = () => {
  return (
    <div className="page-content">
      <BrowserRouter>
        <Header />
        <div className="centerText">
          <p>invisible something</p>
        </div>
        <Routes>
          <Route path="/" element={<BoardList />} />
          <Route path="/TalkDetail" element={<TalkDetail />} />
          <Route path="/TalkList" element={<TalkList />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/password-recovery" element={<PasswordRecoveryPage />} />
          <Route path="/board" element={<BoardList />} />
          <Route path="/" element={<LoginPage />} />
        </Routes>
        <Footer />

      </BrowserRouter>
    </div>
  );
};

export default App;
