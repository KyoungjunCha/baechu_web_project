import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const Header = ({ onSelectCategory }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    onSelectCategory(category);
  };

  return (
    <div className="header">
      <div className="top-line">
        <div className="logo">
          <Link to="/">Baechu Logo</Link>
        </div>
        <div className="search-bar">
          <input type="text" placeholder="검색어를 입력하세요" />
          <button type="button">
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
