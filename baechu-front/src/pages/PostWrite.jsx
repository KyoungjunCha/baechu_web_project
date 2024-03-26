import React, { useState } from 'react';
import axios from 'axios';
import YTSearch from 'youtube-api-search';
import Modal from 'react-modal';

import imageIcon from '../images/imgy.png';
import youTubeIcon from '../images/free-icon-youtube.png';
import postIcon from '../images/free-icon-bullet-point.png';
import DropdownMenu from '../components/DropdownMenu ';
import '../components/PostWrite/PostWrite.css';

import dummyData from '../dummy/CityDummy.js';
import categoryOptions from '../dummy/Category.js';

import YoutubeApi from '../api.json';

// 모달을 사용할 때 모달이 아닌 부분으로 역할하는 요소를 명시적으로 지정
Modal.setAppElement('#root');

export default function PostWrite() {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedLocation, setSelectedLocation] = useState({
    province: dummyData[0]?.province || null,
    city: dummyData[0]?.city || null,
  });
  const [board_title, setBoardTitle] = useState('');
  const [newPostContent, setNewPostContent] = useState('');
  const [imgFile, setImgFile] = useState(null);
  const [documentFile, setDocumentFile] = useState(null);
  const [imgFileName, setImgFileName] = useState(''); // 이미지 파일 이름 상태 추가
  const [documentFileName, setDocumentFileName] = useState(''); // 문서 파일 이름 상태 추가
  const [searchTerm, setSearchTerm] = useState('');
  const [videos, setVideos] = useState([]);
  const [selectedVideoTitle, setSelectedVideoTitle] = useState(''); // 선택한 동영상 제목 상태
  const [selectedVideoThumbnail, setSelectedVideoThumbnail] = useState(''); // 선택한 동영상 썸네일 상태
  const [selectedVideoURL, setSelectedVideoURL] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false); // 모달 열림 여부 상태
  const [urlModalIsOpen, setUrlModalIsOpen] = useState(false); // 모달 열림 여부 상태
  const [urlInput, setUrlInput] = useState(''); // URL 입력 상태
  const [urlSave, setUrlSave] = useState(''); // URL 입력 상태

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handleLocationChange = ({ selectedProvince, selectedCity }) => {
    setSelectedLocation({ province: selectedProvince, city: selectedCity });
  };

  const handleImageUpload = (event) => {
      const file = event.target.files[0];
      const fileName = encodeURIComponent(file.name); // 파일 이름을 URL 인코딩
      setImgFile(file);
      setImgFileName(fileName); // 인코딩된 파일 이름 저장
  };
    
  const handleDocumentUpload = (event) => {
      const file = event.target.files[0];
      const fileName = encodeURIComponent(file.name); // 파일 이름을 URL 인코딩
      setDocumentFile(file);
      setDocumentFileName(fileName); // 인코딩된 파일 이름 저장
  };

  const handleSearch = async () => {
    // YouTube Data API 키 설정
    const API_KEY = YoutubeApi.youtube_api;
    
    // YouTube API 검색 요청
    YTSearch({ key: API_KEY, term: searchTerm }, (data) => {
      // 검색 결과 설정
      setVideos(data);
    });
  };

  // 동영상 선택 시 처리 함수
  const handleVideoSelection = (selectedVideo) => {
    // 선택한 동영상 정보 출력
    console.log('Selected video:', selectedVideo);
    
    // 동영상의 ID 추출
    const videoId = selectedVideo.id.videoId;
    // 동영상의 URL 생성
    const videoURL = `https://www.youtube.com/watch?v=${videoId}`;
  
    // 선택한 동영상 정보를 상태에 저장
    setSelectedVideoTitle(selectedVideo.snippet.title);
    setSelectedVideoThumbnail(selectedVideo.snippet.thumbnails.default.url);
    setSelectedVideoURL(videoURL);
    console.log(videoURL);
  
    // 모달 닫기
    setModalIsOpen(false);
  };

  const handleModalCloss = () => {
    setModalIsOpen(false);
  };

  // URL 입력 핸들러
  const handleUrlInputChange = (e) => {
    setUrlInput(e.target.value);
  };

  // URL 입력 후 확인 핸들러
  const handleUrlSubmit = () => {
    // 입력된 URL을 사용하여 처리하거나 상태에 저장
    console.log('Entered URL:', urlInput);
    setUrlSave(urlInput);

    // 모달 닫기
    setUrlModalIsOpen(false);
  };

  const handleWritePost = async () => {
    console.log('실행중');
    try {
      const formData = new FormData();
      formData.append('image', imgFile); // 이미지 파일 추가
      formData.append('file', documentFile); // 문서 파일 추가
      formData.append('user_id', '1');
      formData.append('board_title', board_title);
      formData.append('board_detail', newPostContent);
      formData.append('province', selectedLocation.province);
      formData.append('city', selectedLocation.city);
      formData.append('category', selectedCategory);
  
      // 선택한 동영상의 URL을 formData에 추가
      formData.append('youtub_url', selectedVideoURL);
      // 입력받은 URL도 formData에 추가
      formData.append('web_url', urlSave);
  
      // FormData에 값이 들어있는지 확인하고 출력
      const formDataValues = formData.entries();
      for (const [key, value] of formDataValues) {
        console.log(`Key: ${key}, Value: ${value}`);
      }
  
      const response = await axios.post('http://localhost:3000/postWrite', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log(response.data); // 성공 시 서버 응답 데이터 출력
    } catch (error) {
      console.error('Error writing post:', error.response);
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
        onChange={(e) => setBoardTitle(e.target.value)}
      />
      <div className='linkImg'>
        <div className='imgLink'>
          <label htmlFor="imageUpload">
            <img src={imageIcon} alt="이미지 업로드" className="board-img" />
          </label>
          <input
            id="imageUpload"
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={handleImageUpload}
          />
        </div>

        <div className='youTubeLink'>
          {/* 이미지 클릭시 모달 열림 */}
          <img
            src={youTubeIcon}
            alt='유튜브'
            className="board-img"
            onClick={() => setModalIsOpen(true)} // 모달 열기
          />
          {/* 모달 창 */}
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={() => setModalIsOpen(false)} // 모달 닫기
          >
            <div>
              {/* 유튜브 검색 입력란 */}
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="유튜브에서 동영상을 검색하세요"
              />
              {/* 검색 버튼 */}
              <button onClick={handleSearch}>검색</button>
              
              {/* 검색된 동영상 목록 표시 */}
              <div>
                {videos.map(video => (
                  <div key={video.etag}>
                    <img src={video.snippet.thumbnails.default.url} alt={video.snippet.title} />
                    <p>{video.snippet.title}</p>
                    {/* 동영상 선택 시 해당 동영상을 처리하는 함수 호출 */}
                    <button onClick={() => handleVideoSelection(video)}>선택</button>
                  </div>
                ))}
                <button className='youtubClossButton' onClick={handleModalCloss}>뒤로가기</button>
              </div>
            </div>
          </Modal>

          {/* 선택한 동영상 정보 표시 */}
          {selectedVideoTitle && (
            <div>
              <h2>선택한 동영상</h2>
              <p>제목: {selectedVideoTitle}</p>
              <img src={selectedVideoThumbnail} alt={selectedVideoTitle} />
            </div>
          )}
        </div>

        <div className='urlLink'>
          {/* URL 입력 모달 */}
          <Modal
            isOpen={urlModalIsOpen}
            onRequestClose={() => setUrlModalIsOpen(false)}
            style={{
              overlay: {
                backgroundColor: 'rgba(0, 0, 0, 0.5)'
              },
              content: {
                width: '50%',
                height: '10%',
                margin: 'auto'
              }
            }}
          >
            <div>
              {/* URL 입력란 */}
              <input
                type="text"
                value={urlInput}
                onChange={handleUrlInputChange}
                placeholder="URL을 입력하세요"
              />
              {/* 확인 버튼 */}
              <button onClick={handleUrlSubmit}>확인</button>
            </div>
          </Modal>
          {/* URL 입력 버튼 */}
          <div className='urlLink'>
            <button className='url' onClick={() => setUrlModalIsOpen(true)}>URL</button>
          </div>
        </div>
        <div className='documentLink'>
          <label htmlFor="documentUpload">
            <img src={postIcon} alt='파일 업로드' className="board-img" />
          </label>
          <input
            id="documentUpload"
            type="file"
            accept="document/*"
            style={{ display: 'none' }}
            onChange={handleDocumentUpload}
          />
        </div>
      </div>
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
