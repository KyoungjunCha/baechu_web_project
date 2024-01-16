// App.js
import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import BoardList from "./pages/BoardList";
import TalkDetail from "./pages/TalkDetail";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import "./index.css";

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
        {/* <Route path="/" element = {<Home/>}/> */}
      </Routes>
      <Footer/>
      </BrowserRouter>
    </div>
  );
};

export default App;
