// App.js
import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "./index.css";

import {BrowserRouter, Route, Routes} from "react-router-dom";
import BoardList from "./components/BoardList";
import PrivacyChang from "./pages/PrivacyChang";
import PostWrite from "./pages/PostWrite";
import MyPostList from "./pages/MyPostList";
import MyCommentList from "./pages/MyCommentList";
import CommentAlarm from "./pages/CommentAlarm";
import BookMarkList from "./pages/BookMarkList";


const App = () => {
  return (
    <div>
      <BrowserRouter>
      <Header/>
      <div className="centerText">
        <p>invisible something</p>
      </div>
      <Routes>
          {/* <Route path="/" element = {<Home/>}/> */}
          <Route path="/" element = {<BoardList/>}/>
          <Route path="/privacyChang" element = {<PrivacyChang/>}/>
          <Route path="/myPostList" element = {<MyPostList/>}/>
          <Route path="/myCommentList" element = {<MyCommentList/>}/>
          <Route path="/commentAlarm" element = {<CommentAlarm/>}/>
          <Route path="/bookMarkList" element = {<BookMarkList/>}/>
          <Route path="/postWrite" element = {<PostWrite/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
