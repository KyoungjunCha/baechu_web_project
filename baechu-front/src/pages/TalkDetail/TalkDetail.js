import React, { useState, useEffect } from "react";
import socket from "../../server";
import MessageContainer from "../../components/MessageContainer/MessageContainer";
import InputField from "../../components/InputField/InputField";
import VoteField from "../../components/VoteField/VoteField";
import ChatRoomTitle from "../../components/ChatRoomTitle/ChatRoomTitle";
import { useParams } from "react-router-dom";
import "./TalkDetail.css";

const TalkDetail = ({ user }) => {
  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const { id } = useParams();
  const [voteData, setVoteData] = useState({
    agreeCount: 0,
    disagreeCount: 0
  });
  const [roomData, setRoomData] = useState({});

  useEffect(
    () => {
      socket.on("message", messageListener);
      socket.on("vote", voteListener);

      socket.emit("getRoomInfo", id, response => {
        if (response.ok) {
          setRoomData(response.data.room); // 서버로부터 받은 방 정보를 상태에 저장
        } else {
          console.error("Failed to fetch room info", response.error);
        }
      });

      socket.emit("joinRoom", id, async res => {
        console.log("Join Room Response:", id);

        if (res && res.ok) {
          console.log("Successfully joined", res);
          await getChatHistory();
          await getVoteCounts();
        } else {
          console.log("Failed to join", res);
        }
      });

      const getChatHistory = async () => {
        try {
          const chatHistoryResponse = await new Promise(resolve => {
            socket.emit("getChatHistory", id, response => {
              resolve(response);
            });
          });

          if (chatHistoryResponse.ok) {
            setMessageList(chatHistoryResponse.data);
          }
        } catch (error) {
          console.error("Error getting chat history:", error);
        }
      };

      const getVoteCounts = async () => {
        try {
          const voteCountsResponse = await new Promise(resolve => {
            socket.emit("getVoteCounts", id, response => {
              resolve(response);
            });
          });
          if (voteCountsResponse.ok) {
            setVoteData(voteCountsResponse.data);
          }
        } catch (error) {
          console.error("Error getting vote counts:", error);
        }
      };
      return () => {
        socket.off("message", messageListener);
        socket.off("vote", voteListener);
      };
    },
    [id]
  );

  const sendMessage = event => {
    event.preventDefault();
    socket.emit("sendMessage", { message, room: id }, res => {
      if (!res.ok) {
        console.log("Error sending message", res.error);
      }
      setMessage("");
    });

    // setMessageList(prevState => prevState.concat({ user, chat: message }));
  };

  const messageListener = res => {
    // console.log("message", res);
    setMessageList(prevState => prevState.concat(res));
  };

  const voteListener = res => {
    setVoteData(res);
  };

  const sendVote = voteType => {
    socket.emit("sendVote", { vote: voteType, room: id }, res => {
      if (!res.ok) {
        console.log("Error sending vote", res.error);
      }
    });
  };

  return (
    <div className="containerWrap">
      <div className="VoteFields">
        <VoteField
          voteData={voteData}
          sendVote={sendVote}
          roomData={roomData}
        />
      </div>
      <div className="TalkDetail">
        <ChatRoomTitle roomData={roomData} />
        <div className="TalkDetailContainer">
          {/* {console.log("테스트", user)} */}
          {messageList.length > 0
            ? <MessageContainer messageList={messageList} user={user} />
            : null}
        </div>
        <div>
          <InputField
            message={message}
            setMessage={setMessage}
            sendMessage={sendMessage}
          />
        </div>
      </div>
    </div>
  );
};

export default TalkDetail;
