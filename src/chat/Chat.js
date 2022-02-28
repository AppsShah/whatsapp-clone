import { Avatar,IconButton } from '@material-ui/core'
import SearchOutlined from '@material-ui/icons/SearchOutlined'
import MoreVert from '@material-ui/icons/MoreVert'
import AttachFile from '@material-ui/icons/AttachFile'
import React,{useEffect,useState} from 'react'
import { useParams } from 'react-router-dom'
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon'
import './chat.css'
import db,{firebaseApp} from '../firebase'
import firebase from 'firebase'
import GetAppRoundedIcon from '@material-ui/icons/GetAppRounded';
// import queryString from 'query-string'
function Chat(props) {
    const [input,setinput]=useState('')
    const [state, setstate] = useState('')
    const [roomName,setRoomName]=useState("")
    const {roomId}=useParams();
    const [message,setmessage]=useState([])
    // let fileurl;
    const [dataurl,setdataurl]=useState(null)
    useEffect(()=>{
        // console.log(roomId)
        if(roomId){
            db.collection('rooms').doc(roomId).onSnapshot(snapshot=>{
                setRoomName(snapshot.data().name)
            })

            setstate(Math.floor(Math.random()*100))

            db.collection('rooms').doc(roomId).collection("messages").orderBy('timestamp',"asc").onSnapshot((snapshot)=>{
                setmessage(snapshot.docs.map(doc=>doc.data()))
            })  
        
        }
    } ,[roomId])
   
    function sendMessage(event){
        event.preventDefault()
        // console.log(input)
        db.collection('rooms').doc(roomId).collection('messages').add({
            message:input,
            name:props.username,
            url:"",
            timestamp:firebase.firestore.FieldValue.serverTimestamp()
        })
        setinput('')
    }
   async function onfilechange (e){
       e.preventDefault()
        const file=e.target.files[0]
        const storageRef=firebaseApp.storage().ref()
        const fileRef=storageRef.child(file.name)
        await fileRef.put(file)
        setdataurl(await fileRef.getDownloadURL()) 
    //    console.log(data._delegate.metadata.name)
    //    console.log(queryString.parse(fileurl))
    }
    function deleteroom(e){
        e.preventDefault()
        console.log(e.target.value)
    }
        useEffect(()=>{
                // if(roomId)
                // {
                //     db.collection('rooms').doc(roomId).collection("messages").orderBy('timestamp',"asc").onSnapshot((snapshot)=>{
                //         setmessage(snapshot.docs.map(doc=>doc.data()))
                //     })  
                // }
                if(dataurl!=null)
                {
                        db.collection('rooms').doc(roomId).collection('messages').add({
                            message:"",
                            name:props.username,
                            url:dataurl,
                            timestamp:firebase.firestore.FieldValue.serverTimestamp()
                        })
                        // toogle=true
                        // setdataurl('')
                }
                // console.log(dataurl)
        },[dataurl])
    return (
        <div className="chat"> 
            <div className="chat_header">
               <Avatar src={`https://avatars.dicebear.com/api/human/${state}.svg`}/>
               <div className="chat_headerInfo">
                <h3>{roomName}</h3>
                <p>{new Date(
                    message[message.length-1]?.timestamp?.toDate()
                ).toUTCString()}</p>
                </div>
                <div className="chat_headerRight">
            <IconButton>
                <SearchOutlined />
           </IconButton>
           <form onSubmit={(e)=>e.preventDefault()}>
                <IconButton type="submit">
           <input id="upload" type="file" accept="image/jpeg,image/gif,image/png,application/pdf,image/x-eps" onChange={onfilechange} style={{display:"none"}}/>
           <label for="upload">
               <AttachFile />
           </label>
           </IconButton>
           </form>
           <IconButton onClick={deleteroom}>
                <MoreVert/>
           </IconButton>

               </div>
            </div>
            <div className="chat_body">
            {
                message.map((msg)=>(
                    <div className={`chat_messagebody ${msg.name=== props.username && 'chat_reciever'}`}>
                    <span className="chat_name">{msg.name}</span>
                    {
                    
                      msg.url!==""&&
                        <iframe scrolling="no" src={msg.url}frameborder="0"></iframe>
                    }
                    {

                      msg.url!==""&&
                      <a href={msg.url}
                      onClick={(e)=>{
                          e.preventDefault()
                          alert("please download on next page")
                      }}>
                         <IconButton download>
                          <GetAppRoundedIcon />
                      </IconButton> 
                      </a>
                    }
                    <p>{msg.message}</p>
                <span className="chat_timestamp">{
                    new Date(msg.timestamp?.toDate()).toUTCString()
                }</span>
                    </div>
                ))
            }
            </div>
            <div className="chat_footer">
                <InsertEmoticonIcon />
                <form>
                    <input value={input} onChange={(e)=>{setinput(e.target.value)}}
                    type="text" placeholder="Type here" />
                    <button type="submit" onClick={sendMessage}>Send</button>
                </form>
            </div>
        </div>
    )
}

export default Chat
