import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import TalkDetail from "./pages/TalkDetail/TalkDetail";
import BoardList from "./components/BoardList/BoardList";
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
import PostDetail from "./pages/PostDetail/PostDetail";
import "./index.css";
import Chat from "./components/Chat/Chat";
import BestList from "./components/BestList/BestList";

const App = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  return (
    <Router>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Header onSelectCategory={handleCategoryChange} />

        <div style={{ display: 'flex', flexGrow: 1, justifyContent: 'space-between', padding: '20px' }}>
          <div style={{ flex: '1', marginRight: '20px' }}>
            <Routes>
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
              <Route path="/pagelogin" element={<PageLogin />} />
              <Route path="/chat" element={<Chat />} />
              <Route path="/" element={<BestList />} />
              <Route path="/post/:postId" element={<PostDetail />} />
            </Routes>
          </div>

          {/* <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
            <PageLogin />
            <Chat />
          </div> */}
        </div>
        {/* <Footer /> */}
      </div>
    </Router>
  );
};

export default App;
