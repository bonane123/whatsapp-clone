import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./SidebarChat.css";
import { Avatar } from "@mui/material";
import { db } from "./firebase";
import { collection, addDoc } from "firebase/firestore";

function SidebarChat({ id, name, addNewChat }) {
  const colRef = collection(db, "rooms");
  const [seed, setSeed] = useState("");
  const createChat = () => {
    const roomName = prompt("please enter name for chat room");
    if (roomName) {
      // Do some clever database stuff
      addDoc(colRef, {
        name: roomName,
      });
    }
  };
  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, []);
  return !addNewChat ? (
    <Link to={`/rooms/${id}`}>
      <div className="sidebarChat">
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
        <div className="sidebarChat__info">
          <h2>{name}</h2>
          <p>Last message....</p>
        </div>
      </div>
    </Link>
  ) : (
    <div onClick={createChat} className="sidebarChat">
      <h2>Add New Chat</h2>
    </div>
  );
}

export default SidebarChat;
