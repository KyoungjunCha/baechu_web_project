import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './BoardList.css';
import BoardListItem from './BoardListItem';

const BoardList = ({ selectedCategory }) => {
  const [posts, setPosts] = useState([]); // 게시물 목록 상태 추가
  const [currentPage, setCurrentPage] = useState(1);
  const [currentTab, setCurrentTab] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('');
  const postsPerPage = 3;

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;

  // 카테고리와 지역에 따라 필터링
  const filteredPosts = selectedLocation
    ? posts.filter(post => post.province === selectedLocation && (selectedCategory ? post.category === selectedCategory : true))
    : selectedCategory
      ? posts.filter(post => post.category === selectedCategory)
      : posts;

  // 베스트와 일반
  const bestPosts = filteredPosts.filter(post => post.likes > 5);

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

  // 조회수 증가 함수
  const increaseViews = async (id) => {
    try {
      await axios.put(`http://localhost:5001/boardlist/${id}/views/increase`);
      // 조회수가 증가되었으므로 다시 데이터를 불러옴
      const response = await axios.get('http://localhost:5000/boardlist');
      setPosts(response.data); // 게시물 목록 업데이트
    } catch (error) {
      console.error('Error increasing views:', error);
    }
  };

  // 글쓰기 버튼 클릭 동작
  const handleWriteClick = () => {
    console.log(`Selected category: ${selectedCategory}, Selected location: ${selectedLocation}`);
    // 글쓰기 동작 추가
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/boardlist');
        setPosts(response.data); // 초기 데이터로 게시물 목록 설정
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="list-container">
      <div className="category-container">
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
            <BoardListItem
              key={post.id}
              category={post.category}
              hasImage={post.hasImage}
              title={post.title}
              author={post.author}
              province={post.province}
              likes={post.likes}
              views={post.views}
              date={post.date}
              increaseViews={() => increaseViews(post.id)} // 조회수 증가 함수를 전달
            />
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
