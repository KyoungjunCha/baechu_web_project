import React, { useState, useEffect } from 'react';
import BestListItem from './BestListItem';
import './BestList.css';
import axios from 'axios';

const BestList = () => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 3;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5001/bestlist');
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchData();
  }, []);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(posts.length / postsPerPage);

  const paginate = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const increaseViews = async (id) => {
    try { 
      await axios.put(`http://localhost:5001/bestlist/${id}/views/increase`);
      // 조회수가 증가되었으므로 다시 데이터를 불러옴
      const response = await axios.get('http://localhost:5001/bestlist');
      setPosts(response.data);
    } catch (error) {
      console.error('Error increasing views:', error);
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
              <th>지역</th>
              <th>추천수</th>
              <th>조회수</th>
              <th>날짜</th>
            </tr>
          </thead>
          <tbody>
            {currentPosts.map(post => (
              <BestListItem
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
