import { useState, useEffect } from "react";

const Messages = ({ socket, friend }) => {
  const [messagesRecieved, setMessagesReceived] = useState([]);
  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessagesReceived((state) => [
        ...state,
        {
          message: data.message,
          createdTime: data.createdTime,
          friend: data.friend,
          sender: data.sender,
        },
      ]);
    });
    return () => socket.off("receive_message");
  }, [socket]);

  return (
    <div className="messagesColumn">
      {messagesRecieved.map((msg, i) => {
        if (msg.sender === friend) {
          return (
            <div className="message" key={i}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span className="msgMeta">{msg.sender || "You"}</span>
                <span className="msgMeta">{msg.createdTime}</span>
              </div>
              <p className="msgText">{msg.message}</p>
              <br />
            </div>
          );
        } else if (msg.sender === undefined) {
          return (
            <div className="message" key={i}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span className="msgMeta">You</span>
                <span className="msgMeta">{msg.createdTime}</span>
              </div>
              <p className="msgText">{msg.message}</p>
              <br />
            </div>
          );
        }
      })}
    </div>
  );
};

export default Messages;
