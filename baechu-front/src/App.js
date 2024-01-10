// App.js
import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import BoadrList from "./components/BoardList";
import "./index.css";

const App = () => {
  return (
    <div>
      <Header />
      <div className="centerText">
        <p>invisible something</p>
      </div>
      <BoadrList/>
      <Footer />
    </div>
  );
};

export default App;
