import React, { useState } from 'react';

const PasswordChange = ({ password, setpassword }) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [passwordMatchError, setPasswordMatchError] = useState(false);
  const [verificationResult, setVerificationResult] = useState('');

  const handlePasswordChange = () => {
    // 비밀번호 확인
    if (password !== currentPassword) {
      setPasswordMatchError(true);
      return;
    }

    // 새로운 비밀번호 확인
    if (newPassword !== confirmNewPassword) {
      setPasswordMatchError(true);
      return;
    }

    // 여기서 비밀번호 변경 로직을 구현하면 됩니다.
    // 비밀번호 변경 로직을 구현한 후에는 서버에 새로운 비밀번호를 저장하도록 요청을 보내야 합니다.

    // 비밀번호 변경이 성공했을 경우, 상태를 초기화하거나 다른 작업을 수행할 수 있습니다.
    setpassword(newPassword); // 새로운 비밀번호로 업데이트
    setCurrentPassword('');
    setNewPassword('');
    setConfirmNewPassword('');
    setPasswordMatchError(false);
    setVerificationResult('비밀번호 변경이 완료되었습니다.');
  };

  const handleVerification = () => {
    // 비밀번호 확인
    if (password !== currentPassword) {
      setVerificationResult('기존 비밀번호가 일치하지 않습니다.');
    } else {
      setVerificationResult('기존 비밀번호 확인이 완료되었습니다.');
    }
  };

  return (
    <div className='passwordChang'>
      {/* 비밀번호 확인 부분 */}
      <div className='pwCheck'>
        <h2 className='pwChangetitle'>*비밀번호 확인</h2>
        <input
          type='password'
          className='pwChangeInput'
          placeholder='기존 비밀번호를 입력하세요'
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
        />
        <button className='pwbutton' onClick={handleVerification}>확인</button>
        {verificationResult && <p>{verificationResult}</p>}
      </div>

      {/* 변경할 비밀번호 부분 */}
      <div className='pwChange'>
        <h2 className='pwChangetitle'>*변경할 비밀번호</h2>
        <input
          type='password'
          className='pwChangeInput'
          placeholder='새로운 비밀번호를 입력하세요'
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <input
          type='password'
          className='pwChangeInput'
          placeholder='새로운 비밀번호를 다시 입력하세요'
          value={confirmNewPassword}
          onChange={(e) => setConfirmNewPassword(e.target.value)}
        />
      </div>

      {passwordMatchError && (
        <p style={{ color: 'red' }}>비밀번호가 일치하지 않습니다.</p>
      )}

      <button className='pwChangebutton' onClick={handlePasswordChange}>비밀번호 변경</button>
    </div>
  );
};

export default PasswordChange;
