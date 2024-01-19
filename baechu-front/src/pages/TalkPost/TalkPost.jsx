import React, { useState } from 'react';
import './TalkPost.css';

export default function TalkPost() {
  const [category, setCategory] = useState('');
  const [roomName, setRoomName] = useState('');
  const [image, setImage] = useState(null); // 이미지 업로드를 위한 state
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');

  const handleImageChange = (event) => {
    // 이미지 업로드를 처리하는 함수
    const selectedImage = event.target.files[0];
    setImage(selectedImage);
  };

  const handleSubmit = () => {
    // 폼 제출을 처리하는 함수
    // 여기에서 입력된 값들을 활용하여 채팅방을 생성하는 로직을 추가할 수 있습니다.
    console.log('Category:', category);
    console.log('Room Name:', roomName);
    console.log('Image:', image);
    console.log('Description:', description);
    console.log('Price:', price);
  };

  const handleCancel = () => {
    // 작성 취소를 처리하는 함수
    // 필요에 따라 리다이렉트 등을 추가할 수 있습니다.
    console.log('작성이 취소되었습니다.');
  };

  return (
    <div className="talk-post-container">
      <div>
        <label>카테고리</label>
        <input className = "TalkPost-input" type="text" value={category} onChange={(e) => setCategory(e.target.value)} />
      </div>
      <div>
        <label>채팅방 이름</label>
        <input className = "TalkPost-input" type="text" value={roomName} onChange={(e) => setRoomName(e.target.value)} />
      </div>
      <div>
        <label>투표사진</label>
        <input className = "TalkPost-input" type="file" onChange={handleImageChange} />
      </div>
      <div>
        <label>설명</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
      </div>
      <div>
        <label>가격:</label>
        <input className = "TalkPost-input" type="text" value={price} onChange={(e) => setPrice(e.target.value)} />
      </div>
      <div className="TalkPost-buttons">
        <button className="TalkPost-button" onClick={handleSubmit}>글작성</button>
        <button className="TalkPost-button" onClick={handleCancel}>취소</button>
      </div>
    </div>
  );
}
