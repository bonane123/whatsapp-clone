import { db } from "./firebase";
import { collection, getDocs } from "firebase/firestore";
import { Avatar, IconButton } from "@mui/material";
import { MdDonutLarge } from "react-icons/md";
import { BsFillChatLeftTextFill } from "react-icons/bs";
import { FiMoreVertical } from "react-icons/fi";
import { AiOutlineSearch } from "react-icons/ai";
import React, { useEffect, useState } from "react";
import "./Sidebar.css";
import SidebarChat from "./SidebarChat";
import { useStateValue } from "./StateProvider";

function Sidebar() {
  const colRef = collection(db, "rooms");
  const getData = getDocs(colRef);
  const [rooms, setRooms] = useState([]);
  const [{ user }, dispatch] = useStateValue();
  useEffect(() => {
    getData.then((snapshot) => {
      setRooms(
        // @ts-ignore
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
  }, [rooms]);

  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <Avatar src={user?.photoURL} />
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
          <AiOutlineSearch className="search__icon" />
          <input type="text" placeholder="Search or start new chat" />
        </div>
      </div>
      <div className="sidebar__chats">
        <SidebarChat addNewChat />
        {rooms.map((room) => (
          <SidebarChat key={room.id} id={room.id} name={room.data.name} />
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
