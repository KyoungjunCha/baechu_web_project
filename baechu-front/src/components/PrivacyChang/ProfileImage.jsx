import React from 'react'

const ProfileImage = ({ profilePicture, openFileInput, handleFileChange }) => {
    return (
        <div className='myImg'>
        <img
            src={profilePicture}
            alt='프로필 이미지'
            className="profileImg"
            onClick={openFileInput}
        />
        <button className='profileImgButton' onClick={openFileInput}>프로필 사진변경</button>
        <input
            type="file"
            id="fileInput"
            style={{ display: 'none' }}
            onChange={handleFileChange}
        />
        </div>
    );
};

export default ProfileImage;
