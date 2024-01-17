// App.js
import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import BoardList from "./components/BoardList";
import "./index.css";
import PostWrite from "./pages/PostWrite";
import MyCommentList from "./pages/MyCommentList";

const App = () => {
  return (
    <div>
      <Header />
      <div className="centerText">
        <p>invisible something</p>
      </div>
      {/* <PostWrite/> */}
      <MyCommentList/>
      {/* <BoardList /> */}
      <Footer />
    </div>
  );
};

export default App;
