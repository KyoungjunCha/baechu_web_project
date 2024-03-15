<<<<<<< HEAD
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import BoardList from "./pages/BoardList/BoardList";
import PasswordRecoveryPage from "./pages/PasswordRecoveryPage/PasswordRecoveryPage";
import TermsAndConditionsPage from "./pages/SignUpPage/TermsAndConditionsPage";
import SignUpPage from "./pages/SignUpPage/SignUpPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import TalkList from "./pages/TalkList/TalkList";
import TalkDetail from "./pages/TalkDetail/TalkDetail";
import PostDetail from "./pages/PostDetail/PostDetail";
=======
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import TalkDetail from "./pages/TalkDetail/TalkDetail";
import BoardList from "./components/BoardList/BoardList";
import Recovery from "./components/Recovery/Recovery";
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
>>>>>>> 9a7a3270481a4706762c42b6c65baebef9a5ce1f
import "./index.css";
import Chat from "./components/Chat/Chat";
import BestList from "./components/BestList/BestList";
import Search from "./components/Search/Search"; // Search 컴포넌트를 불러옵니다
import axios from "axios";  // Import axios here

const App = () => {
<<<<<<< HEAD
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
          <Route path="/signup/terms" element={<TermsAndConditionsPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/password-recovery" element={<PasswordRecoveryPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/post/:postId" element={<PostDetail />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
=======
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchResults, setSearchResults] = useState([]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handleSearch = async (searchTerm) => {
    try {
      const response = await axios.get(`http://localhost:5001/search?query=${searchTerm}`);
      if (response.data.message) {
        // 검색 결과가 없을 때
        setSearchResults([]);
      } else {
        // 검색 결과가 있을 때
        setSearchResults(response.data);
      }
    } catch (error) {
      console.error("Error during search:", error);
    }
  };

  return (
    <Router>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Header onSelectCategory={handleCategoryChange} onSearch={handleSearch} />
        

        <div style={{ display: 'flex', flexGrow: 1, justifyContent: 'space-between', padding: '20px' }}>
          <div style={{ flex: '1', marginRight: '20px' }}>
            <Routes>
              <Route path="/TalkDetail" element={<TalkDetail />} />
              <Route path="/TalkList" element={<TalkList />} />
              <Route path="/signup" element={<SignUpPage />} />
              <Route path="/Recovery" element={<Recovery/>} />
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
              <Route path="/search" element={<Search results={searchResults} />} />
            </Routes>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
            <PageLogin />
            <Chat />
          </div>
        </div>
        <Footer />
      </div>
    </Router>
>>>>>>> 9a7a3270481a4706762c42b6c65baebef9a5ce1f
  );
};

export default App;
