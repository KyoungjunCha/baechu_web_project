import React, { useState } from 'react';
import axios from 'axios';
import imageIcon from '../images/imgy.png';
import youTubeIcon from '../images/free-icon-youtube.png';
import postIcon from '../images/free-icon-bullet-point.png';
import DropdownMenu from '../components/DropdownMenu ';
import '../components/PostWrite/PostWrite.css';

import dummyData from '../dummy/CityDummy.js';
import categoryOptions from '../dummy/Category.js'

export default function PostWrite() {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedLocation, setSelectedLocation] = useState({
    province: dummyData[0]?.province || null,
    city: dummyData[0]?.city || null,
  });
  const [board_title, setboard_title] = useState('');
  const [newPostContent, setNewPostContent] = useState('');

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handleLocationChange = ({ selectedProvince, selectedCity }) => {
    setSelectedLocation({ province: selectedProvince, city: selectedCity });
  };

  const handleWritePost = async () => {
    try {
      // API 호출을 위한 데이터 준비
      // const postData = {
      //   user_id: '1',
      //   category: selectedCategory,
      //   title: title.trim(),  // 공백만 있는 경우를 방지하기 위해 trim 사용
      //   content: newPostContent,
      //   province: selectedLocation.province,
      //   city: selectedLocation.city,
      //   board_img: '000', // 임시 데이터, 실제로는 이미지 업로드를 구현해야 합니다.
      // };
  
      const postData = {
        user_id: '1',
        category: '음식',
        board_title: '음식',
        board_detail: '음식 내용',
        province: '서울특별시',
        city: '서울특별시',
        board_img: '000'
      };
  
      // 제목이 비어있는지 확인
      if (!postData.title) {
        throw new Error('제목은 비워 둘 수 없습니다.');
      }
      // Axios를 사용하여 서버로 데이터 전송
      const response = await axios.post('http://localhost:3000/postWrite', postData);
      console.log(response.data);  // 성공 시 서버 응답 데이터 출력
    } catch (error) {
      console.error('Error writing post:', error.response); // 에러 더 자세히 출력

      // 실패 시 에러 처리 로직 추가
    }
  };

  return (
    <div className="postWrite">
      <div className='postType'>
        <div className='postWriteCategory'>
          <label>카테고리:</label>
          <select
            value={selectedCategory}
            onChange={(e) => handleCategoryChange(e.target.value)}
          >
            <option value=''>선택하세요</option>
            {categoryOptions.map((category) => (
              <option key={category.id} value={category.category}>
                {category.category}
              </option>
            ))}
          </select>
        </div>
        <DropdownMenu data={dummyData} onSelect={handleLocationChange} />
      </div>
      <input
        className='postWriteTitle'
        placeholder='게시물 제목을 입력해주세요'
        value={board_title}
        onChange={(e) => setboard_title(e.target.value)}
      />
      {/* <div className='linkImg'>
        <img src={imageIcon} alt='이미지' className="board-img" onClick={{}} />
        <img src={youTubeIcon} alt='유튜브' className="board-img" onClick={{}} />
        <button className='url' onClick={{}}>url</button>
        <img src={postIcon} alt='글' className="board-img" onClick={{}} />
      </div> */}
      <textarea
        className='postDetail'
        value={newPostContent}
        onChange={(e) => setNewPostContent(e.target.value)}
        placeholder="글을 작성하세요..."
      ></textarea>
      <div className='board'></div>
      <div className='buttonStyle'>
        {/* 뒤로 가기 버튼 */}
        <button className='postWritebutton'>뒤로가기</button>
        {/* 작성하기 버튼 */}
        <button className='postWritebutton' onClick={handleWritePost}>
          작성하기
        </button>
      </div>
    </div>
  );
}
