import React, { useState } from 'react';
import imageIcon from '../../images/imgy.png';
import noImageIcon from '../../images/imgn.png';
import './BestList.css';

const BestList = () => {
  const dummyData = [
    { 
      id: 1, 
      category: '스포츠', 
      hasImage: true, 
      title: '수원 헬스장 여기다니세요 !', 
      author: '배추도사', 
      views: 10, 
      date: '2024-01-08' 
    },
    { 
      id: 2, 
      category: '음식', 
      hasImage: false, 
      title: '망포맛집 발견 ㅎㅎㅎ', 
      author: '배추좋아', 
      views: 5, 
      date: '2024-01-07' 
    },


    // 더미 데이터
  ];

    // 페이지네이션
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 3; // 한 페이지에 표시되는 게시물 수
  
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = dummyData.slice(indexOfFirstPost, indexOfLastPost);
  
    const totalPages = Math.ceil(dummyData.length / postsPerPage);
  
    const paginate = (pageNumber) => {
      if (pageNumber >= 1 && pageNumber <= totalPages) {
        setCurrentPage(pageNumber);
      }
    };
  
    return (
      <div className="best-list-container">
        <h1>Best</h1>
        <div className="table-container">
          <table className="best-table">
            <thead>
              <tr>
                <th>종류</th>
                <th>이미지 여부</th>
                <th>게시글 제목</th>
                <th>작성자</th>
                <th>조회수</th>
                <th>날짜</th>
              </tr>
            </thead>
            <tbody>
              {currentPosts.map(post => (
                <tr key={post.id}>
                  <td>{post.category}</td>
                  <td>{post.hasImage ? <img src={imageIcon} alt="이미지 첨부됨" className="best-icon" /> : <img src={noImageIcon} alt="이미지 첨부 안됨" className="best-icon" />}</td>
                  <td>{post.title}</td>
                  <td>{post.author}</td>
                  <td>{post.views}</td>
                  <td>{post.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
  
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
  
  export default BestList;