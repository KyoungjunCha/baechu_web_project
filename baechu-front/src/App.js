// App.js
import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import BoardList from "./components/BoardList";
import "./index.css";
import MyPostList from "./pages/MyPostList";

const App = () => {
  return (
    <div>
      <Header />
      <div className="centerText">
        <p>invisible something</p>
      </div>
      <MyPostList/>
      {/* <BoardList /> */}
      <Footer />
    </div>
  );
};

export default App;
