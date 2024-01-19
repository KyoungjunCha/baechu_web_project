import React, { useState } from "react";
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
          <a href="/">Baechu Logo</a>
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
          <li onClick={() => handleCategoryClick("미용")}>미용</li>
          <li onClick={() => handleCategoryClick("음식")}>음식</li>
          <li onClick={() => handleCategoryClick("관광")}>관광</li>
          <li onClick={() => handleCategoryClick("카페")}>카페</li>
          <li onClick={() => handleCategoryClick("스포츠")}>스포츠</li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
