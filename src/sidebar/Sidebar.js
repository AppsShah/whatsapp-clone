import React,{useState,useEffect} from 'react'
import './sidebar.css'
import {Avatar,IconButton} from "@material-ui/core"
import DonutLargeIcon from "@material-ui/icons/DonutLarge"
import ChatIcon from '@material-ui/icons/Chat'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import SearchOutlined from '@material-ui/icons/SearchOutlined'
import SidebarChat from './SidebarChat'
import './sidebarChat.css'
import db from "../firebase"
function createnewchat(){
  const roomName=prompt("Create New Chat")
  if(roomName){
    // //do something
    db.collection('rooms').add({
      name: roomName,
    })
  }
}
function Sidebar(props) {
  const [rooms, setrooms] = useState([])
// let name="";
useEffect(() => {
  const unsubscribe=db.collection("rooms").onSnapshot((snapshot)=>
  setrooms(
    snapshot.docs.map(doc=>({
      id:doc.id,
      data:doc.data(),
    }))
  )
)
    return()=>{
      unsubscribe()
    }
},[])
  return (
    <>
     <div className="sidebar">
       <div className="sidebar_header">
         <Avatar src={props.imgurl}></Avatar>
         <div className="side_headerRight">
           <IconButton>
           <DonutLargeIcon fontSize="small"/>
           </IconButton>
           <IconButton onClick={createnewchat}>
            <ChatIcon fontSize="small"
            />
           </IconButton>
           <IconButton>
           <MoreVertIcon fontSize="small"/>
           </IconButton>
         </div>
       </div>
       <div className="sidebar_search">
         <div className="sidebar_searchContainer">
         <SearchOutlined />
         <input placeholder="search Chat" type="text" />
         </div>
       </div>
       <div>
         </div>
       <div className="sidebar_chats">
          {/* <div className="sidebarChat" onClick={createnewchat}>
            <h2>Add New Chat</h2>
          </div> */}
            {
                 rooms.map(room=>(
                  <SidebarChat key={room.id} id={room.id} name={room.data.name}></SidebarChat>
                ))
            }
       </div>
     </div>
    </>
  );
}

export default Sidebar;
