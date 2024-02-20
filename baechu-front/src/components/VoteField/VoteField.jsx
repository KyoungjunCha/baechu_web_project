// import React, { useState, useEffect } from 'react';
// import './VoteField.css';

// function VoteField({ voteData, sendVote, roomData }) {
//     // voteData 상태는 외부에서 props로 전달받습니다. 이 예제에서는 이 상태를 직접 수정하지 않고, 부모 컴포넌트에서 관리합니다.

//     // 투표 비율을 계산하는 로직
//     const calculatePercentages = (data) => {
//         const totalVotes = data.agreeCount + data.disagreeCount;
//         const agreePercentage = totalVotes ? (data.agreeCount / totalVotes) * 100 : 0;
//         const disagreePercentage = totalVotes ? (data.disagreeCount / totalVotes) * 100 : 0;
//         return { agreePercentage, disagreePercentage };
//     };

//     // 투표 비율 계산을 위한 상태
//     const [percentages, setPercentages] = useState(calculatePercentages(voteData));

//     useEffect(() => {
//         // voteData가 변경될 때마다 투표 비율을 다시 계산
//         setPercentages(calculatePercentages(voteData));
//     }, [voteData]);

//     const handleAgree = () => {
//         sendVote('agree');
//     };

//     const handleDisagree = () => {
//         sendVote('disagree');
//     };

//     return (
//         <div className="vote-field">
//             <div className='vote'>
//                 <h3>{roomData.votetitle}</h3>
//                 <div className="vote-options">
//                     <button className="agree-button" onClick={handleAgree}>Agree</button>
//                     <button className="disagree-button" onClick={handleDisagree}>Disagree</button>
//                 </div>
//                 <div>{roomData.description}</div>
//                 <div>{roomData.price}원</div>
//             </div>
//             <div className='graph'>
//                 <h3>{roomData.votetitle}</h3>
//                 <div>Agree: {voteData.agreeCount}</div>
//                 <div style={{ width: `${percentages.agreePercentage}%`, background: 'green', height: '20px', marginBottom: '4px' }} />
//                 <div>Disagree: {voteData.disagreeCount}</div>
//                 <div style={{ width: `${percentages.disagreePercentage}%`, background: 'red', height: '20px' }} />
//             </div>
//         </div>
//     );
// }

// export default VoteField;


// import React, { useState, useEffect } from 'react';
// import './VoteField.css';
// import socket from '../../server'; // socket 서버 경로가 맞는지 확인 필요

// function VoteField({ initialVoteData, sendVote, roomData }) {
//     // 초기 투표 데이터를 상태로 관리, agreeCount와 disagreeCount에 기본값 제공
//     const [voteData, setVoteData] = useState(initialVoteData || { agreeCount: 0, disagreeCount: 0 });

//     // 투표 비율 계산
//     const totalVotes = voteData.agreeCount + voteData.disagreeCount;
//     const agreePercentage = totalVotes ? (voteData.agreeCount / totalVotes) * 100 : 0;
//     const disagreePercentage = totalVotes ? (voteData.disagreeCount / totalVotes) * 100 : 0;

//     useEffect(() => {
//         // 서버로부터 투표 업데이트 수신
//         socket.on("updateVote", newVoteData => {
//             console.log("Received vote update:", newVoteData);
//             setVoteData(newVoteData);
//         });

//         // 컴포넌트 언마운트 시 이벤트 리스너 제거
//         return () => {
//             socket.off("updateVote");
//         };
//     }, []);

//     const handleAgree = () => {
//         sendVote('agree');
//     };

//     const handleDisagree = () => {
//         sendVote('disagree');
//     };

//     return (
//         <div className="vote-field">
//             {/* UI 구성 */}
//             <h3>{roomData?.votetitle}</h3>
//             <div className="vote-options">
//                 <button onClick={handleAgree}>Agree</button>
//                 <button onClick={handleDisagree}>Disagree</button>
//             </div>
//             <div>Agree Percentage: {agreePercentage}%</div>
//             {voteData.agreeCount}
//             <div>Disagree Percentage: {disagreePercentage}%</div>
//         </div>
//     );
// }

// export default VoteField;


import React, { useState, useEffect } from 'react';
import './VoteField.css';

function VoteField({ voteData, sendVote, roomData }) {
    // voteData 상태는 외부에서 props로 전달받습니다. 이 예제에서는 이 상태를 직접 수정하지 않고, 부모 컴포넌트에서 관리합니다.

    // 투표 비율을 계산하는 로직
    const calculatePercentages = (data) => {
        const totalVotes = data.agreeCount + data.disagreeCount;
        const agreePercentage = totalVotes ? (data.agreeCount / totalVotes) * 100 : 0;
        const disagreePercentage = totalVotes ? (data.disagreeCount / totalVotes) * 100 : 0;
        return { agreePercentage, disagreePercentage };
    };

    // 투표 비율 계산을 위한 상태
    const [percentages, setPercentages] = useState(calculatePercentages(voteData));

    useEffect(() => {
        // voteData가 변경될 때마다 투표 비율을 다시 계산
        setPercentages(calculatePercentages(voteData));
    }, [voteData]);

    const handleAgree = () => {
        sendVote('agree');
    };

    const handleDisagree = () => {
        sendVote('disagree');
    };

    return (
        <div className="vote-field">
            <div className='vote'>
                <h3>{roomData.votetitle}</h3>
                <div className="vote-options">
                    <button className="agree-button" onClick={handleAgree}>Agree</button>
                    <button className="disagree-button" onClick={handleDisagree}>Disagree</button>
                </div>
                <div>{roomData.description}</div>
                <div>{roomData.price}원</div>
            </div>
            <div className='graph'>
                <h3>{roomData.votetitle}</h3>
                <div>Agree: {voteData.agreeCount}</div>
                <div style={{ width: `${percentages.agreePercentage}%`, background: 'green', height: '20px', marginBottom: '4px' }} />
                <div>Disagree: {voteData.disagreeCount}</div>
                <div style={{ width: `${percentages.disagreePercentage}%`, background: 'red', height: '20px' }} />
            </div>
        </div>
    );
}

export default VoteField;
