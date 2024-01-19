import React, { useState, useEffect } from 'react';
import imageIcon from '../../images/imgy.png';
import noImageIcon from '../../images/imgn.png';
import './BoardList.css';

const BoardList = ({ selectedCategory }) => {
  const [dummyData, setDummyData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentTab, setCurrentTab] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('');

  const postsPerPage = 3;
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;

  // 카테고리와 지역에 따라 필터링
  const filteredPosts = selectedLocation
    ? dummyData.filter(post => post.location === selectedLocation)
    : selectedCategory
    ? dummyData.filter(post => post.category === selectedCategory)
    : dummyData;

  // 베스트와 일반
  const bestPosts = filteredPosts.filter(post => post.recommended > 5);

  // 현재 보여줄 포스트 선택
  const currentPosts = currentTab === 'best'
    ? bestPosts.slice(indexOfFirstPost, indexOfLastPost)
    : filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  // 전체 페이지 수 계산
  const totalPages = currentTab === 'best'
    ? Math.ceil(bestPosts.length / postsPerPage)
    : Math.ceil(filteredPosts.length / postsPerPage);

  // 페이지 변경 함수
  const paginate = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  // 탭 변경 함수
  const changeTab = (tab) => {
    setCurrentTab(tab);
    setCurrentPage(1); // 탭 변경 시 페이지 초기화
  };

  // 글쓰기 버튼 클릭 동작
  const handleWriteClick = () => {
    console.log(`Selected category: ${selectedCategory}, Selected location: ${selectedLocation}`);
    // 글쓰기 동작 추가
  };

  // 더미 데이터 설정
  useEffect(() => {
    setDummyData([
      { id: 1, category: '음식', hasImage: true, title: '뼈해장국', author: '배추좋아', location: '서울', recommended: 100, views: 5, date: '2024-01-11' },
      { id: 2, category: '음식', hasImage: false, title: '국밥집 추천드려요', author: '배추좋아', location: '경기도', recommended: 8, views: 5, date: '2024-01-07' },
      { id: 3, category: '스포츠', hasImage: true, title: '수원 헬스장 여기다니세요!', author: '배추도사', location: '서울', recommended: 10, views: 10, date: '2024-01-08' },
      { id: 4, category: '음식', hasImage: true, title: '분식집 추천', author: '배추좋아', location: '강원도', recommended: 2, views: 5, date: '2024-01-07' },
      { id: 5, category: '음식', hasImage: false, title: '망포맛집 발견 ㅎㅎㅎ', author: '배추좋아', location: '경기도', recommended: 3, views: 5, date: '2024-01-07' },
    ]);
  }, []); // 빈 배열을 넣어 한 번만 실행되도록 설정

  return (
    <div>
      {/* 카테고리 및 지역 선택 */}
      <div className="category-container">
        {/* 수정: 카테고리 드롭다운 제거 */}
        {/* <select
          id="category"
          value={selectedCategory}
          onChange={(e) => setSelectedLocation('')}
          className="category-select"
        >
          <option value="" disabled>
            -- 카테고리 선택 --
          </option>
          {['미용', '음식', '관광', '카페', '스포츠'].map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select> */}
        
        {/* 추가: 지역 선택 드롭다운 */}
        <select
          id="location"
          value={selectedLocation}
          onChange={(e) => setSelectedLocation(e.target.value)}
          className="category-select"
        >
          <option value="" disabled>
            -- 지역 선택 --
          </option>
          <option value="">전체</option> {/* 추가: 전체 옵션 */}
          {['서울', '경기도', '강원도'].map((location) => (
            <option key={location} value={location}>
              {location}
            </option>
          ))}
        </select>
        
        {/* 추가: 글쓰기 버튼 */}
        <button onClick={handleWriteClick} className="write-button">
          글쓰기
        </button>
      </div>

      {/* 탭 버튼 */}
      <div className="tab-buttons">
        <button onClick={() => changeTab('all')} className={`tab-button ${currentTab === 'all' ? 'active' : ''}`}>
          전체
        </button>
        <button onClick={() => changeTab('best')} className={`tab-button ${currentTab === 'best' ? 'active' : ''}`}>
          베스트
        </button>
      </div>

      {/* 게시물 목록 표시 */}
      <table className="board-table">
        <thead>
          <tr>
            <th>종류</th>
            <th>이미지 여부</th>
            <th>게시글 제목</th>
            <th>작성자</th>
            <th>지역</th>
            <th>추천수</th>
            <th>조회수</th>
            <th>날짜</th>
          </tr>
        </thead>
        <tbody>
          {currentPosts.map(post => (
            <tr key={post.id}>
              <td>{post.category}</td>
              <td>{post.hasImage ? <img src={imageIcon} alt="이미지 첨부됨" className="board-icon" /> : <img src={noImageIcon} alt="이미지 첨부 안됨" className="board-icon" />}</td>
              <td>{post.title}</td>
              <td>{post.author}</td>
              <td>{post.location}</td> {/* location 필드를 가정하여 추가 */}
              <td>{post.recommended}</td>
              <td>{post.views}</td>
              <td>{post.date}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="pagination">
        <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
          이전
        </button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button key={i + 1} onClick={() => paginate(i + 1)} className={currentPage === i + 1 ? 'active' : ''}>
            {i + 1}
          </button>
        ))}
        <button onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages}>
          다음
        </button>
      </div>
    </div>
  );
};

export default BoardList;  
