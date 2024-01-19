import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import BoardList from "./components/BoardList";
import PageLogin from "./components/PageLogin";
import "./index.css";
import Chat from "./components/Chat";
import BestList from "./components/BestList";

const App = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  return (
    <Router>
      <div>
        <Header onSelectCategory={handleCategoryChange} />
        <Routes>
          <Route path="/list" element={<BoardList selectedCategory={selectedCategory} />} />
          <Route path="/login" element={<PageLogin />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/" element={<BestList />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
