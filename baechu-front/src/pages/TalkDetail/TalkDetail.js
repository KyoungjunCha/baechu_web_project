// import React, { useState, useEffect } from "react";
// import socket from "../../server";
// import MessageContainer from "../../components/MessageContainer/MessageContainer";
// import InputField from "../../components/InputField/InputField";
// import VoteField from "../../components/VoteField/VoteField";
// import ChatRoomTitle from "../../components/ChatRoomTitle/ChatRoomTitle";
// import { useParams } from "react-router-dom";
// import "./TalkDetail.css";

// const TalkDetail = ({ user }) => {
//   const [message, setMessage] = useState("");
//   const [messageList, setMessageList] = useState([]);
//   const { id } = useParams();
//   const [voteData, setVoteData] = useState({
//     agreeCount: 0,
//     disagreeCount: 0
//   });
//   const [roomData, setRoomData] = useState({});

//   useEffect(() => {
//     socket.on("message", messageListener);
//     socket.on("vote", voteListener);

//     socket.emit("getRoomInfo", id, response => {
//       if (response.ok) {
//         setRoomData(response.data.room); // 서버로부터 받은 방 정보를 상태에 저장
//         console.log("나오나?", response.data.room);
//       } else {
//         console.error("Failed to fetch room info", response.error);
//       }
//     });

//     socket.emit("joinRoom", id, async res => {
//       console.log("Join Room Response:", id);

//       if (res && res.ok) {
//         console.log("Successfully joined", res);
//         await getChatHistory();
//         await getVoteCounts();
//         // await getUpdateRoomInfo();
//       } else {
//         console.log("Failed to join", res);
//       }
//     });

//     const getChatHistory = async () => {
//       try {
//         const chatHistoryResponse = await new Promise(resolve => {
//           socket.emit("getChatHistory", id, response => {
//             resolve(response);
//           });
//         });

//         if (chatHistoryResponse.ok) {
//           setMessageList(chatHistoryResponse.data);
//         }
//       } catch (error) {
//         console.error("Error getting chat history:", error);
//       }
//     };

//     const getVoteCounts = async () => {
//       try {
//         const voteCountsResponse = await new Promise(resolve => {
//           socket.emit("getVoteCounts", id, response => {
//             resolve(response);
//           });
//         });
//         if (voteCountsResponse.ok) {
//           setVoteData(voteCountsResponse.data);
//         }
//       } catch (error) {
//         console.error("Error getting vote counts:", error);
//       }
//     };

//     socket.on("updateVote", newVoteData => {
//       console.log("Received vote update:", newVoteData);
//       setVoteData(newVoteData);
//     });

//     socket.on("updateRoomInfo", updatedRoomInfo => {
//       console.log("인원 업데이트:", updatedRoomInfo);
//       // roomData 내의 userCount만 업데이트
//       setRoomData(prevRoomData => ({
//         ...prevRoomData,
//         userCount: updatedRoomInfo.userCount
//       }));
//     });

//     return () => {
//       socket.off("message", messageListener);
//       socket.off("vote", voteListener);
//     };
//   }, []);

//   const sendMessage = event => {
//     event.preventDefault();
//     socket.emit("sendMessage", { message, room: id }, res => {
//       if (!res.ok) {
//         console.log("Error sending message", res.error);
//       }
//       setMessage("");
//     });

//     // setMessageList(prevState => prevState.concat({ user, chat: message }));
//   };

//   const messageListener = res => {
//     // console.log("message", res);
//     setMessageList(prevState => prevState.concat(res));
//   };

//   const voteListener = res => {
//     setVoteData(res);
//   };

//   const sendVote = voteType => {
//     socket.emit("sendVote", { vote: voteType, room: id }, res => {
//       if (!res.ok) {
//         console.log("Error sending vote", res.error);
//       }
//     });
//   };

//   return (
//     <div className="containerWrap">
//       <div className="VoteFields">
//         <VoteField
//           voteData={voteData}
//           sendVote={sendVote}
//           roomData={roomData}
//         />
//       </div>
//       <div className="TalkDetail">
//         <ChatRoomTitle roomData={roomData} />
//         <div className="TalkDetailContainer">
//           {/* {console.log("테스트", user)} */}
//           {messageList.length > 0
//             ? <MessageContainer messageList={messageList} user={user} />
//             : null}
//         </div>
//         <div>
//           <InputField
//             message={message}
//             setMessage={setMessage}
//             sendMessage={sendMessage}
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TalkDetail;
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
      // 실시간 업데이트를 위한 리스너
      socket.on("message", newMessage =>
        setMessageList(prev => [...prev, newMessage])
      );
      socket.on("updateVote", newVoteData =>
        setVoteData(prev => ({ ...prev, ...newVoteData }))
      );
      socket.on("updateRoomInfo", updatedRoomInfo =>
        setRoomData(prev => ({ ...prev, ...updatedRoomInfo }))
      );

      // 방 정보 초기 로딩
      socket.emit("getRoomInfo", id, response => {
        if (response.ok) {
          setRoomData(response.data.room);
        } else {
          console.error("Failed to fetch room info", response.error);
        }
      });

      // 투표 정보 초기 로딩
      socket.emit("getVoteCounts", id, response => {
        if (response.ok) {
          setVoteData(response.data);
        } else {
          console.error("Failed to fetch vote counts:", response.error);
        }
      });

      // 채팅 기록 초기 로딩
      const getChatHistory = async () => {
        socket.emit("getChatHistory", id, response => {
          if (response.ok) {
            setMessageList(response.data);
          }
        });
      };

      // 방에 입장
      socket.emit("joinRoom", id, async res => {
        if (res && res.ok) {
          await getChatHistory();
        } else {
          console.log("Failed to join", res);
        }
      });

      return () => {
        socket.off("message");
        socket.off("updateVote");
        socket.off("updateRoomInfo");
      };
    },
    [id]
  );

  // 24.02.17 구 리스너
  //  방 정보 업데이트 핸들러
  // const updateRoomInfoListener = updatedRoomInfo => {
  //   setRoomData(prevRoomData => ({
  //     ...prevRoomData,
  //     ...updatedRoomInfo
  //   }));
  // };

  // // 메시지 리스너
  // const messageListener = newMessage => {
  //   setMessageList(prev => [...prev, newMessage]);
  // };

  // // 투표 업데이트 리스너
  // const voteUpdateListener = newVoteData => {
  //   setVoteData(prevVoteData => ({
  //     ...prevVoteData,
  //     ...newVoteData
  //   }));
  // };

  // 메시지 전송 핸들러
  const sendMessage = event => {
    event.preventDefault();
    if (message.trim()) {
      socket.emit("sendMessage", { message, room: id }, res => {
        if (!res.ok) {
          console.log("Error sending message", res.error);
        }
        setMessage("");
      });
    }
  };

  // 투표 전송 핸들러
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
          {messageList.length > 0 &&
            <MessageContainer messageList={messageList} user={user} />}
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
