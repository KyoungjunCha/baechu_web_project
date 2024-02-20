import React from "react";
import "./MessageContainer.css";
import { Container } from "@mui/system";

const MessageContainer = ({ messageList, user }) => {
  return (
    <div>
      {messageList.map((message, index) => {
        // console.log("메시지:", message);
        return (
          <Container key={message._id} className="message-container">
            {/* {console.log("테스트2", user)} */}
            {message.user.name === "system"
              ? <div className="system-message-container">
                  <p className="system-message">
                    {message.chat}
                  </p>
                </div>
              : message.user.name === user.name
                ? <div className="my-message-container">
                    <div className="my-message">
                      {message.chat}
                    </div>
                  </div>
                : <div className="your-message-container">
                    <img
                      src="/profile.jpeg"
                      className="profile-image"
                      style={
                        (index === 0
                          ? { visibility: "visible" }
                          : messageList[index - 1].user.name === user.name) ||
                        messageList[index - 1].user.name === "system"
                          ? { visibility: "visible" }
                          : { visibility: "hidden" }
                      }
                    />
                    <div className="your-message-with-name">
                      <span className="message-user-name">
                        {message.user.name}
                      </span>
                      <div className="your-message">
                        {message.chat}
                      </div>
                    </div>
                  </div>}
          </Container>
        );
      })}
    </div>
  );
};

export default MessageContainer;
