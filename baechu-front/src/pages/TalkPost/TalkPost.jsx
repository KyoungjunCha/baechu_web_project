import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate 가져오기
import socket from '../../server'; // socket 인스턴스 가져오기
import './TalkPost.css';

function TalkPost() {
  const [category, setCategory] = useState('');
  const [roomName, setRoomName] = useState('');
  // const [image, setImage] = useState(null); // 이미지 업로드를 위한 state
  const [description, setDescription] = useState('');
  const [voteTitle, setVoteTitle] = useState('');
  const [price, setPrice] = useState('');
  const navigate = useNavigate();

  const handleImageChange = (event) => {
    // 이미지 업로드를 처리하는 함수
    // const selectedImage = event.target.files[0];
    // setImage(selectedImage);
  };

  const handleCreateRoom = () => {
    if (roomName.trim() !== '') {
      // 이미지는 선택적이므로, 선택된 경우에만 데이터에 추가
      const data = {
        roomName,
        category, // 추가: category 값을 전달
        description,
        voteTitle,
        price,
      };
      console.log("선택 데이터 확인 : ", data);
      // 이미지가 선택된 경우에만 추가
      // if (image) {
      //   data.image = image;
      // }

      socket.emit('createRoom', data, (res) => {
        console.log('Create Room Response:', res);
        if (res.ok) {
          // 방이 성공적으로 생성되었을 때 /listroom으로 이동
          navigate('/TalkList');
        } else {
          // 방 생성에 실패한 경우에 대한 처리
          console.log('Failed to create room:', res.error);
        }
      });
    }
  };

  const handleCancel = () => {
    // 취소 버튼 클릭 시 이동할 경로 설정 (예: 홈 페이지)
    navigate('/');
  };

  return (
    <div className="talk-post-container">
      <div className='TalkPost-Select'>
        <label>카테고리</label>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="select">선택하세요</option>
          <option value="food">음식</option>
          <option value="cafe">카페</option>
          <option value="travel">여행</option>
        </select>
      </div>
      <div>
        <label>채팅방 이름</label>
        <input type="text" value={roomName} onChange={(e) => setRoomName(e.target.value)} />
      </div>
      <div>
        <label>투표사진</label>
        <input type="file" onChange={handleImageChange} />
      </div>
      <div>
        <label>투표주제</label>
        <input type="text" value={voteTitle} onChange={(e) => setVoteTitle(e.target.value)} />
      </div>
      <div>
        <label>설명</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
      </div>
      <div>
        <label>가격:</label>
        <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} />
      </div>
      <div className="buttons">
        <button onClick={handleCreateRoom}>글작성</button>
        <button onClick={handleCancel}>취소</button>
      </div>
    </div>
  );
}
export default TalkPost;