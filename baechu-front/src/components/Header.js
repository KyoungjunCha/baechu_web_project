import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const Header = ({ onSelectCategory, onSearch }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate(); // useNavigate로 변경

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    onSelectCategory(category);
  };

  const handleSearch = () => {
    // 검색어를 백엔드에 전송하여 검색 결과를 가져오는 함수 호출
    onSearch(searchTerm);
    // 검색 버튼을 눌렀을 때 '/search' 경로로 이동
    navigate('/search');
  };

  return (
    <div className="header">
      <div className="top-line">
        <div className="logo">
          <Link to="/">Baechu Logo</Link>
        </div>
        <div className="search-bar">
          <input
            type="text"
            placeholder="검색어를 입력하세요"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="button" onClick={handleSearch}>
            <FontAwesomeIcon icon={faSearch} aria-label="search icon" />
          </button>
        </div>
      </div>
      <div className="navigation-bar">
        <ul>
          <li>
            <Link to="/list" onClick={() => handleCategoryClick("미용")}>미용</Link>
          </li>
          <li>
            <Link to="/list" onClick={() => handleCategoryClick("음식")}>음식</Link>
          </li>
          <li>
            <Link to="/list" onClick={() => handleCategoryClick("관광")}>관광</Link>
          </li>
          <li>
            <Link to="/list" onClick={() => handleCategoryClick("카페")}>카페</Link>
          </li>
          <li>
            <Link to="/list" onClick={() => handleCategoryClick("스포츠")}>스포츠</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
