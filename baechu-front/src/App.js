import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import BoardList from "./pages/BoardList/BoardList";
import PasswordRecoveryPage from "./pages/PasswordRecoveryPage/PasswordRecoveryPage";
import SignUpPage from "./pages/SignUpPage/SignUpPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import TalkList from "./pages/TalkList/TalkList";
import TalkDetail from "./pages/TalkDetail/TalkDetail";
import PostDetail from "./pages/PostDetail/PostDetail";
import "./index.css";

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
          <Route path="/login" element={<LoginPage />} />
          <Route path="/post/:postId" element={<PostDetail />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
};

export default App;
