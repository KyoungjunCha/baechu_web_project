import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import BoardList from "./components/BoardList";
import "./index.css";
import SignUpPage from "./pages/SignUpPage";

const App = () => {
  return (
    <div>
      <Header />
      <SignUpPage />
      {/* <BoardList /> */}
      <Footer />
    </div>
  );
};

export default App;
