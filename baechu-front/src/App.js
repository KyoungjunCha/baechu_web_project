import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import BoardList from './components/BoardList/BoardList';
import PageLogin from './components/PageLogin/PageLogin';
import Chat from './components/Chat/Chat';
import BestList from './components/BestList/BestList';

const App = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  return (
    <Router>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        {/* 헤더를 맨 위에 위치 */}
        <Header onSelectCategory={handleCategoryChange} />

        {/* 컨텐츠를 헤더 아래에 위치! */}
        <div style={{ display: 'flex', flexGrow: 1, justifyContent: 'space-between' }}>

          <div style={{ flex: '1', marginRight: '20px' }}>
            <Routes>
              <Route path="/list" element={<BoardList selectedCategory={selectedCategory} />} />
              <Route path="/login" element={<PageLogin />} />
              <Route path="/chat" element={<Chat />} />
              <Route path="/" element={<BestList />} />
            </Routes>
          </div>

          {/* 오른쪽 PageLogin, Chat */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
            <PageLogin />
            <Chat />
          </div>
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
