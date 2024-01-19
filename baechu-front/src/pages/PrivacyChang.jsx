import React, { useState } from 'react';
import imageIcon from '../images/imgy.png';
import '../css/PrivacyChang.css';

import PasswordChange from '../components/PasswordChange';
import ProfileImage from '../components/ProfileImage';
import NickNameSection from '../components/NickNameSection';
import DropdownMenu from '../components/DropdownMenu ';

import dummyData from '../dummy/CityDummy.js';

const AddressChange = () => {
  const [selectedLocation, setSelectedLocation] = useState({
    province: dummyData[0]?.province || null,
    city: dummyData[0]?.city || null,
  });

  const handleLocationChange = ({ selectedProvince, selectedCity }) => {
    setSelectedLocation({ province: selectedProvince, city: selectedCity });
  };

  return (
    <div className='address'>
      {/* 주소 변경 로직을 구현할 부분 */}
      <h2 className='title'>*주소 변경</h2>
      <DropdownMenu data={dummyData} onSelect={handleLocationChange} />
      <button className='addessbutton'>주소 변경</button>
    </div>
  );
};

export default function PrivacyChang() {
  const [profilePicture, setProfilePicture] = useState(imageIcon);
  const [nick, setNick] = useState('');
  const [showPasswordChange, setShowPasswordChange] = useState(true); // true로 초기화
  const [showAddressChange, setShowAddressChange] = useState(false);

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const newImage = URL.createObjectURL(file);
      setProfilePicture(newImage);
    }
  };

  const openFileInput = () => {
    document.getElementById('fileInput').click();
  };

  const handleNickChange = () => {
    console.log('새로운 닉네임:', nick);
  };

  const handlePasswordChange = () => {
    setShowPasswordChange(true);
    setShowAddressChange(false);
  };

  const handleAddressChange = () => {
    setShowPasswordChange(false);
    setShowAddressChange(true);
  };

  return (
    <div className='privacyChang'>
      <div className='topPart'>
        <ProfileImage profilePicture={profilePicture} openFileInput={openFileInput} handleFileChange={handleFileChange} />
        <NickNameSection nick={nick} setNick={setNick} handleNickChange={handleNickChange} />
      </div>
      <div className='lowerPart'>
        <div className='navigationButton'>
          <button className='button' onClick={handlePasswordChange}>비밀번호 변경</button>
          <button className='button' onClick={handleAddressChange}>주소 변경</button>
        </div>
        {showPasswordChange && <PasswordChange />}
        {showAddressChange && <AddressChange />}
      </div>
    </div>
  );
}
