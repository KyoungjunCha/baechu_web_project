import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import BoardList from "./components/BoardList";
import PasswordRecoveryPage from "./pages/PasswordRecoveryPage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import "./index.css";

const App = () => {
  return (
    <Router>
      <div className="page-content">
        <Header />
        <Routes>
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/password-recovery" element={<PasswordRecoveryPage />} />
          <Route path="/board" element={<BoardList />} />
          <Route path="/" element={<LoginPage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
