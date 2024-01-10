import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
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
          <li>미용</li>
          <li>음식</li>
          <li>관광</li>
          <li>카페</li>
          <li>스포츠</li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
