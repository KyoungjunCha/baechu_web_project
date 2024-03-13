import React, { useState } from "react";
import axios from 'axios'; // axios 임포트 추가
import "./Search.css";
import SearchListItem from "./SearchListItem";

const Search = ({ onSearch, results, renderItem }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [posts, setPosts] = useState(results); 

  const postsPerPage = 10; // 10으로 설정
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(posts.length / postsPerPage);

  // 조회수 증가 함수
  const increaseViews = async (id) => {
    try {
      await axios.put(`http://localhost:5001/search/${id}/views/increase`);
      // 조회수가 증가되었으므로 해당 게시물만 업데이트
      const updatedPosts = posts.map(post => {
        if (post.id === id) {
          return { ...post, views: post.views + 1 };
        }
        return post;
      });
      setPosts(updatedPosts);
    } catch (error) {
      console.error('Error increasing views:', error);
    }
  };

  const paginate = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const renderPagination = () => {
    return (
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
    );
  };

  return (
    <div className="search-list-container">
      <div className="table-container2">
        <table className="search-table">
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
              <SearchListItem
                key={post.id}
                category={post.category}
                hasImage={post.hasImage}
                title={post.title}
                author={post.author}
                province={post.province}
                likes={post.likes}
                views={post.views}
                date={post.date}
                increaseViews={() => increaseViews(post.id)} // 조회수 증가 함수
              />
            ))}
          </tbody>
        </table>
      </div>
      {renderPagination()}
    </div>
  );
};

export default Search;
