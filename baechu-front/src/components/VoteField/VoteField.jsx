import React, { useState } from 'react';
import "./VoteField.css";

export default function VoteField() {
    const [voteData, setVoteData] = useState({
        title: '테스트 Vote',
        image: "../../images/imgg.png",
        agreeCount: 0,
        disagreeCount: 0,
    });

    const getTotalVotes = () => voteData.agreeCount + voteData.disagreeCount;

    const getAgreePercentage = () => {
        const totalVotes = getTotalVotes();
        return totalVotes === 0 ? 0 : Math.round((voteData.agreeCount / totalVotes) * 100);
    };

    const getDisagreePercentage = () => {
        const totalVotes = getTotalVotes();
        return totalVotes === 0 ? 0 : Math.round((voteData.disagreeCount / totalVotes) * 100);
    };

    const handleAgree = () => {
        setVoteData((prevData) => ({
            ...prevData,
            agreeCount: prevData.agreeCount + 1,
        }));
    };

    const handleDisagree = () => {
        setVoteData((prevData) => ({
            ...prevData,
            disagreeCount: prevData.disagreeCount + 1,
        }));
    };

    return (
        <div className="vote-field">
            <div className='vote'>
                <h3>{voteData.title}</h3>
                <img src={voteData.image} alt="Vote Image" />

                <div className="vote-options">
                    <button className="agree-button" onClick={handleAgree}>Agree</button>
                    <button className="disagree-button" onClick={handleDisagree}>Disagree</button>
                </div>
            </div>
            <div className='graph'>
                <h3>{voteData.title}</h3>
                <div>
                    Agree: {getAgreePercentage()}%
                    <div style={{ width: `${getAgreePercentage()}%`, background: 'green', height: '20px' }} />
                </div>
                <div>
                    Disagree: {getDisagreePercentage()}%
                    <div style={{ width: `${getDisagreePercentage()}%`, background: 'red', height: '20px' }} />
                </div>
            </div>
        </div>
    );
}
