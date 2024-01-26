import React, { useState, useEffect } from 'react';
import axios from 'axios';
import imageIcon from '../images/imgy.png';
import noImageIcon from '../images/imgn.png';
import trashIcon from '../images/trashcan-icon-white.png';
import '../components/MyPostList/MyPostList.css';
import dummyData from '../dummy/PostDummy'

const pageSize = 5; // 한 페이지당 아이템 수를 5로 변경

const MyPostList = () => {
  const [selectAllChecked, setSelectAllChecked] = useState(false);
  const [checkboxStates, setCheckboxStates] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getMyPosts = async () => {
      try {
        const userId = '2';

        const response = await axios.get('http://localhost:3000/myPostList', {
          params: { userId},
        });

        // console.log(response.data);

        setPosts(response.data.data);
        setCheckboxStates(response.data.data.reduce((acc, curr) => {
        acc[curr.board_id] = false;
        return acc;
      }, {}));
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    getMyPosts();
  }, []);

  const handleCheckboxChange = (id) => {
    setCheckboxStates((prevCheckboxStates) => ({
      ...prevCheckboxStates,
      [id]: !prevCheckboxStates[id],
    }));
  };

  const handleSelectAllChange = () => {
    setSelectAllChecked((prevSelectAllChecked) => {
      const newCheckboxStates = {};
      for (const key in checkboxStates) {
        newCheckboxStates[key] = !prevSelectAllChecked;
      }
      setCheckboxStates(newCheckboxStates);
      return !prevSelectAllChecked;
    });
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const totalItemsCount = Array.isArray(posts) ? posts.length : 0;
  const totalPages = Math.ceil(totalItemsCount / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, totalItemsCount);
  const currentPageData = Array.isArray(posts) ? posts.slice(startIndex, endIndex) : [];

  return (
    <div className='myPost'>
      <div className='myPostHeader'>
        <input
          type='checkbox'
          style={{width:'20px', height:'20px'}}
          checked={selectAllChecked}
          onChange={handleSelectAllChange}
        />
        <div className='myPostTotalfont'>전체선택</div>
        <img 
          style={{ width: '50px', height: '50px', display: 'flex', marginLeft: 'auto', color:'white'}} 
          src={trashIcon} alt='전체삭제'
          // onClick={{}}
        />
      </div>
      {currentPageData.map((post) => (
        <div key={post.board_id} className='myPostList'>
          <input
            type='checkbox'
            style={{ width: '30px', height: '30px' }}
            checked={checkboxStates[post.board_id]}
            onChange={() => handleCheckboxChange(post.board_id)}
          />
          {post.board_img === "001" ? (
            <img src={imageIcon} alt="이미지 첨부됨" className="myPostImg" />
          ) : (
            <img src={noImageIcon} alt="이미지 첨부 안됨" className="myPostImg" />
          )}
          <div style={{ marginLeft: '20px' }}>
            <div className='myPostTitle'>글제목: {post.board_title}</div>
            <div className='myPostDetail'>{post.board_detail}</div>
          </div>
        </div>
      ))}
      <div style={{marginBottom:'10px'}} className="pagination">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={currentPage === index + 1 ? 'active' : ''}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}


export default MyPostList;