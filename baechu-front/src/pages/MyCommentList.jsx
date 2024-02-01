import React, { useState, useEffect } from 'react';
import axios from 'axios';
import imageIcon from '../images/imgy.png';
import noImageIcon from '../images/imgn.png';
import trashIcon from '../images/trashcan-icon-white.png';
import '../components/MyCommentList/MyCommentList.css';

const pageSize = 5;

export default function MyCommentList() {
  const [selectAllChecked, setSelectAllChecked] = useState(false);
  const [checkboxStates, setCheckboxStates] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const getMyComments = async () => {
      try {
        const userId = '2';

        const response = await axios.get('http://localhost:3000/myCommentList', {
          params: { userId, page: currentPage },
        });

        console.log(response.data);

        setComments(response.data.data);
        setCheckboxStates(response.data.data.reduce((acc, curr) => {
          acc[curr.comment_id] = false;
          return acc;
        }, {}));
      } catch (error) {
        console.error('댓글을 가져오는 도중 오류 발생:', error);
      }
    };

    getMyComments();
  }, [currentPage]);

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

  const handleDeleteSelected = () => {
    const commentIdsToDelete = comments.filter(comment => checkboxStates[comment.comment_id]).map(comment => comment.comment_id);
    const updatedComments = comments.filter(comment => !checkboxStates[comment.comment_id]);
  
    axios.delete('http://localhost:3000/myCommentList', {
      headers: {
        'Content-Type': 'application/json',
      },
      data: { commentIdsToDelete },
    })
      .then(response => {
        setComments(updatedComments);
      })
      .catch(error => {
        console.error('댓글 삭제 중 오류 발생:', error);
      });
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const totalItemsCount = Array.isArray(comments) ? comments.length : 0;
  const totalPages = Math.ceil(totalItemsCount / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, totalItemsCount);
  const currentPageData = Array.isArray(comments) ? comments.slice(startIndex, endIndex) : [];

  return (
    <div className='myComment'>
      <div className='myCommentHeader'>
        <input
          type='checkbox'
          style={{width:'20px', height:'20px'}}
          checked={selectAllChecked}
          onChange={handleSelectAllChange}
        />
        <div className='myCommentTotalfont'>전체선택</div>
        <img
          style={{ width: '50px', height: '50px', display: 'flex', marginLeft: 'auto', color: 'white' }}
          src={trashIcon} alt='전체삭제'
          onClick={handleDeleteSelected}
        />
      </div>
      {currentPageData.map((comment) => (
        <div key={comment.comment_id} className='myCommentList'>
          <input
            type='checkbox'
            className='myCommentCheckBox'
            checked={checkboxStates[comment.comment_id]}
            onChange={() => handleCheckboxChange(comment.comment_id)}
          />
          {comment.comment_img === "001" ?
            <img style={{ marginLeft: '20px' }} src={imageIcon} alt="이미지 첨부됨" className="myCommentIcon" /> :
            <img style={{ marginLeft: '20px' }} src={noImageIcon} alt="이미지 첨부 안됨" className="myCommentIcon" />
          }
          <div style={{ marginLeft: '20px' }}>
            <div className='myCommentTitle'>글제목: {comment.board_title}</div>
            <div className='myCommentCreatDate'>{comment.comment_date} 작성자:{comment.userNickName}</div>
          </div>
        </div>
      ))}
      <div style={{ marginBottom: '10px' }} className="pagination">
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
