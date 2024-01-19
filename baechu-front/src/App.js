import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import TalkDetail from "./pages/TalkDetail/TalkDetail";
import BoardList from "./pages/BoardList/BoardList";
import PasswordRecoveryPage from "./pages/PasswordRecoveryPage/PasswordRecoveryPage";
import SignUpPage from "./pages/SignUpPage/SignUpPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import TalkList from "./pages/TalkList/TalkList";
import PrivacyChang from "./pages/PrivacyChang";
import PostWrite from "./pages/PostWrite";
import MyCommentList from "./pages/MyCommentList";
import MyPostList from "./pages/MyPostList";
import CommentAlarm from "./pages/CommentAlarm";
import BookMarkList from "./pages/BookMarkList";
import TalkPost from "./pages/TalkPost/TalkPost";
import PageLogin from "./components/PageLogin/PageLogin";
import "./index.css";
import Chat from "./components/Chat/Chat";
import BestList from "./components/BestList/BestList";

const App = () => {
  // state 추가
  const [selectedCategory, setSelectedCategory] = useState(null);

  // 카테고리 변경 핸들러 함수
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div className="page-content">
      <BrowserRouter>
        {/* Header에 선택된 카테고리 전달 */}
        <Header onSelectCategory={handleCategoryChange} />
        <div className="centerText">
          <p>invisible something</p>
        </div>
        <Routes>
          {/* 각 페이지에 대한 라우팅 */}
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
          <Route path="/TalkPost" element={<TalkPost />} />
          <Route path="/list" element={<BoardList selectedCategory={selectedCategory} />} />
          <Route path="/login" element={<PageLogin />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/" element={<BestList />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
};

export default App;
