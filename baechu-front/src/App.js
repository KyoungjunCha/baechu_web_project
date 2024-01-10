// App.js
import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "./index.css";

const App = () => {
  return (
    <div>
      <Header />
      <div className="centerText">
        <p>invisible something</p>
      </div>
      <Footer />
    </div>
  );
};

export default App;
