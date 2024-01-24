import React, { useEffect, useState } from 'react'
import axios from 'axios';
import TestComponent from '../testcomponents/TestComponent';


function TestPage() {
    const [userData, setUserData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/users'); // 백엔드 API 엔드포인트에 맞게 수정
                setUserData(response.data);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <h2>User Table</h2>
            <table>
                <thead>
                    <tr>
                        <th>User ID</th>
                        <th>Nickname</th>
                        <th>Email</th>
                        <th>Province</th>
                        <th>City</th>
                        <th>Birthday</th>
                    </tr>
                </thead>
                <tbody>
                    {userData.map((user) => (
                        <TestComponent
                            key={user.user_id}
                            user_id ={user.user_id}
                            userNickName={user.userNickName}
                            email={user.email}
                            province={user.province}
                            city={user.city}
                            birthday={user.birthday}
                        />
                    ))}
                </tbody>
            </table>
        </div >
    )
}

export default TestPage