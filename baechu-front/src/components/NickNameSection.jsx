import React from 'react'

const NickNameSection = ({ nick, setNick, handleNickChange }) => {
    return (
      <div className='nickName'>
        <h2>닉네임</h2>
        <input
          className='nick'
          placeholder='닉네임을 입력하세요'
          value={nick}
          onChange={(e) => setNick(e.target.value)}
        />
        <button className='nickButton' onClick={handleNickChange}>닉네임 변경</button>
      </div>
    );
};

export default NickNameSection;