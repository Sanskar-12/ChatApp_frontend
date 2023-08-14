import React, { useEffect, useState } from "react";
import { user } from "./Join";
import socketIO from "socket.io-client";
import "./Chat.css";
import sendlogo from "../images/send.png";
import toast from "react-hot-toast";
import Message from "./Message";
import ReactScrollToBottom from "react-scroll-to-bottom";
import cross from "../images/crosslogo.png";

const ENDPOINT = `https://chat-app-q59v.onrender.com/`;

let socket;

const Chat = () => {
  const [id, setId] = useState("");
  const [messages, setMessages] = useState([]);
  const [inputmessage, setInputMessage] = useState("");

  const send = () => {
    const message = document.getElementById("chatInput").value;
    socket.emit("message", { message, id });
    document.getElementById("chatInput").value = "";
    setInputMessage("");
  };

  useEffect(() => {
    socket = socketIO(ENDPOINT, { transports: ["websocket"] });
    socket.on("connect", () => {
      setId(socket.id);
    });

    socket.emit("joined", { user });

    socket.on("welcome", ({ user, message }) => {
      toast.success(`${user}:${message}`);
    });

    socket.on("userJoined", ({ user, message }) => {
      toast.success(`${user}:${message}`);
    });

    socket.on("leave", ({ user, message }) => {
      toast.success(`${user}:${message}`);
    });

    return () => {
      socket.emit("disconect");
      socket.off();
    };
  }, []);

  useEffect(() => {
    socket.on("sendMessage", ({ user, message, id }) => {
      setMessages([...messages, { user, message, id }]);
    });
    return () => {
      socket.off();
    };
  }, [messages]);

  return (
    <div className="chatPage">
      <div className="chatContainer">
        <div className="header">
          <h2>Chat App</h2>
          <a href="/">
            <img src={cross} alt="cancel" />
          </a>
        </div>
        <ReactScrollToBottom className="chatBox">
          {messages.map((item, i) => (
            <Message
              key={i}
              user={item.id === id ? "" : item.user}
              message={item.message}
              classs={item.id === id ? "right" : "left"}
            />
          ))}
        </ReactScrollToBottom>
        <div className="inputBox">
          <input
            type="text"
            id="chatInput"
            placeholder="Enter Message..."
            value={inputmessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyUp={(e)=>e.key==='Enter' ? send() : null}
          />
          <button className="chatBtn" onClick={send} disabled={!inputmessage}>
            <img src={sendlogo} alt="send" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
