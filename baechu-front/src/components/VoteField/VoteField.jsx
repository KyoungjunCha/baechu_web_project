import React, { useState, useEffect } from 'react';
import './VoteField.css';

function VoteField({ voteData, sendVote, roomData }) {
    const [agreePercentage, setAgreePercentage] = useState(0);
    const [disagreePercentage, setDisagreePercentage] = useState(0);

    useEffect(() => {
        const totalVotes = voteData.agreeCount + voteData.disagreeCount;
        const agreePercentage = totalVotes ? (voteData.agreeCount / totalVotes) * 100 : 0;
        const disagreePercentage = totalVotes ? (voteData.disagreeCount / totalVotes) * 100 : 0;

        setAgreePercentage(agreePercentage);
        setDisagreePercentage(disagreePercentage);
    }, [voteData]);

    const handleAgree = () => {
        // Agree 버튼 클릭 시 서버에 투표 정보 전송
        sendVote('agree');
    };

    const handleDisagree = () => {
        // Disagree 버튼 클릭 시 서버에 투표 정보 전송
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
                <div>
                    {roomData.description}
                </div>
                <div>
                    {roomData.price}원
                </div>
            </div>
            <div className='graph'>
                <h3>{roomData.votetitle}</h3>
                <div>
                    Agree: {voteData.agreeCount}
                    <div style={{ width: `${agreePercentage}%`, background: 'green', height: '20px', marginBottom: '4px' }} />
                </div>
                <div>
                    Disagree: {voteData.disagreeCount}
                    <div style={{ width: `${disagreePercentage}%`, background: 'red', height: '20px' }} />
                </div>
            </div>
        </div>
    );
}
export default VoteField;
