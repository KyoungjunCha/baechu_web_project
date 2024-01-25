// App.js
import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import BoardList from "./pages/BoardList/BoardList";
import TalkDetail from "./pages/TalkDetail/TalkDetail";
import TalkPost from "./pages/TalkPost/TalkPost";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import "./index.css";
import TalkList from "./pages/TalkList/TalkList";
import TestPage from "./testpages/TestPage";
import TestSignupPage from "./testpages/TestSignupPage"


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
        <Route path="/TalkDetail" element={<TalkDetail />} />
        <Route path="/TalkList" element = {<TalkList/>}/>
        <Route path="/TalkPost" element = {<TalkPost/>}/>
        <Route path="/users" element = {<TestPage/>}/>
        <Route path="/signup" element = {<TestSignupPage/>}/>
      </Routes>
      <Footer/>
      </BrowserRouter>
    </div>
  );
};

export default App;
