import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import TalkDetail from "./pages/TalkDetail/TalkDetail";
import BoardList from "./pages/BoardList/BoardList";
import PasswordRecoveryPage from "./pages/PasswordRecoveryPage/PasswordRecoveryPage";
import SignUpPage from "./pages/SignUpPage/SignUpPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import TalkList from "./pages/TalkList/TalkList";
import "./index.css";
import PrivacyChang from "./pages/PrivacyChang";
import PostWrite from "./pages/PostWrite";
import MyCommentList from "./pages/MyCommentList";
import MyPostList from "./pages/MyPostList";
import CommentAlarm from "./pages/CommentAlarm";
import BookMarkList from "./pages/BookMarkList";

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
          <Route path="/Login" element={<LoginPage />} />
          <Route path="/privacyChang" element={<PrivacyChang />} />
          <Route path="/myPostList" element={<MyPostList />} />
          <Route path="/myCommentList" element={<MyCommentList />} />
          <Route path="/commentAlarm" element={<CommentAlarm />} />
          <Route path="/bookMarkList" element={<BookMarkList />} />
          <Route path="/postWrite" element={<PostWrite />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
};

export default App;
