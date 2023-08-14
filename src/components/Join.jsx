import React, { useState } from "react";
import "./Join.css";
import logo from "../images/logo.png";
import { Link } from "react-router-dom";

let user;

const Join = () => {
  const sendUser = () => {
    user = document.getElementById("joinInput").value;
    document.getElementById("joinInput").value = "";
  };

  const [name, setName] = useState("");

  return (
    <div className="joinpage">
      <div className="joincontainer">
        <img src={logo} alt="logo" />
        <h1>Chat App</h1>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name..."
          type="text"
          id="joinInput"
        />

        <Link to={"/chat"} onClick={(e) => (!name ? e.preventDefault() : null)}>
          <button className="joinbtn" onClick={sendUser}>
            Join
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Join;
export { user };
