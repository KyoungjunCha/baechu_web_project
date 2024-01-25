import React, { useState } from 'react';
import axios from 'axios';
// import TestSignupComponent from '../testcomponents/TestSignupComponent';

function TestSignupPage() {
    // formData 상태값 초기화
    const [formData, setFormData] = useState({
        user_id: 1,
        userNickName: '',
        email: '',
        password: '',
        province: '',
        city: '',
        birthday: 0,
    });

    // input 값 변경 시 호출되는 함수
    const handleChange = (e) => {
        const { name, value } = e.target;
        // 기존 formData 복사 후 변경된 값 적용
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // 폼 제출 시 호출되는 함수
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Axios를 사용하여 서버로 데이터 전송
            const response = await axios.post('http://localhost:5000/signup', formData);

            // 서버로부터의 응답 처리
            console.log('서버 응답:', response.data);
        } catch (error) {
            console.error('에러 발생:', error);
        }
    };

    return (
        <div>
            <h1>회원가입 양식</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    닉네임:
                    <input type="text" name="userNickName" value={formData.userNickName} onChange={handleChange} />
                </label>
                <br />
                <label>
                    이메일:
                    <input type="email" name="email" value={formData.email} onChange={handleChange} />
                </label>
                <br />
                <label>
                    비밀번호:
                    <input type="password" name="password" value={formData.password} onChange={handleChange} />
                </label>
                <br />
                <label>
                    도:
                    <input type="text" name="province" value={formData.province} onChange={handleChange} />
                </label>
                <br />
                <label>
                    시:
                    <input type="text" name="city" value={formData.city} onChange={handleChange} />
                </label>
                <br />
                <label>
                    생일:
                    <input type="date" name="birthday" value={formData.birthday} onChange={handleChange} />
                </label>
                <br />
                <button type="submit">회원가입</button>
            </form>
            
            {/* TestSignupComponent 컴포넌트에 formData 전달 */}
            {/* <TestSignupComponent {...formData} /> */}
        </div>
    );
}

export default TestSignupPage;
