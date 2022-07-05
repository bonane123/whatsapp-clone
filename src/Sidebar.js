import { Avatar, IconButton } from "@mui/material";
import { MdDonutLarge } from "react-icons/md";
import { BsFillChatLeftTextFill } from "react-icons/bs";
import { FiMoreVertical } from "react-icons/fi";
import { AiOutlineSearch } from "react-icons/ai";
import React from "react";
import "./Sidebar.css";

function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <Avatar />
        <div className="sidebar__headerRight">
          <IconButton>
            <MdDonutLarge />
          </IconButton>
          <IconButton>
            <BsFillChatLeftTextFill />
          </IconButton>
          <IconButton>
            <FiMoreVertical />
          </IconButton>
        </div>
      </div>
      <div className="sidebar__search">
        <div className="sidebar__searchContainer">
          <AiOutlineSearch />
          <input type="text" placeholder="Search or start new chat" />
        </div>
      </div>
      <div className="sidebar__chats"></div>
    </div>
  );
}

export default Sidebar;
