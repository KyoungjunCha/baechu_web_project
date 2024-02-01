import React, { useState, useEffect } from 'react';
import axios from 'axios';
import imageIcon from '../images/imgy.png';
import noImageIcon from '../images/imgn.png';
import bookMarkIcon from '../images/bookmark.png';
import '../components/BookMarkList/BookMarkList.css';

const pageSize = 5;

export default function BookMarkList() {
  const [currentPage, setCurrentPage] = useState(1);
  const [bookMarks, setBookMarks] = useState([]);

  useEffect(() => {
    const getBookMarks = async () => {
      try {
        const userId = '2';
  
        const response = await axios.get('http://localhost:3000/bookMarkList', {
          params: { userId },
        });
        console.log(response.data.data);
        
        setBookMarks(response.data.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };
  
    getBookMarks();
  }, []);  

  const handleDelete = async (bookMarkId,userId ) => {
    console.log(bookMarkId);
  
    try {
      await axios.delete('http://localhost:3000/bookMarkList', {
        data: { bookmarkId: bookMarkId },
      });
  
       // 삭제 후의 데이터를 다시 불러와서 세로고침
      const response = await axios.get('http://localhost:3000/bookMarkList', {
        params: { userId: userId },
      });

      setBookMarks(response.data.data);
    } catch (error) {
      console.error('북마크 삭제 중 오류 발생:', error);
    }
  };
  

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const totalItemsCount = Array.isArray(bookMarks) ? bookMarks.length : 0;
  const totalPages = Math.ceil(totalItemsCount / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, totalItemsCount);
  const currentPageData = Array.isArray(bookMarks) ? bookMarks.slice(startIndex, endIndex) : [];

  return (
    <div className='bookMark'>
      <div className='bookMarkHeader'>
        <div className='bookMarkTotalfont'>북마크</div>
      </div>
      {currentPageData.map((bookMark) => (
        <div key={bookMark.bookmark_id} className='bookMarkList'>
          {bookMark.board_img === '001' ? (
            <img src={imageIcon} alt='이미지 첨부됨' className='myPostImg' />
          ) : (
            <img src={noImageIcon} alt='이미지 첨부 안됨' className='myPostImg' />
          )}
          <div style={{ marginLeft: '20px' }}>
            <div className='bookMarkTitle'>글제목: {bookMark.board_title}</div>
            <div className='bookMarkDetail'>{bookMark.board_detail}</div>
          </div>
          <img
            src={bookMarkIcon}
            alt='북마크'
            className='bookMarkImg'
            onClick={() => handleDelete(bookMark.bookmark_id, bookMark.user_id)}
          />
        </div>
      ))}
      <div style={{ marginBottom: '10px' }} className='pagination'>
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
