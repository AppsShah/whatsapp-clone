import { Avatar } from '@material-ui/core'
import React,{useState,useEffect} from 'react'
// import useParams from 'react'
import { Link } from 'react-router-dom';
import './sidebarChat.css'
import db from '../firebase'
function SidebarChat(prop) {
    const [lastmsg,setlastmsg]=useState([])
    const [random, setstate] = useState('');
    // const {roomid}=useParams()
    useEffect(() => {
    setstate(Math.floor(Math.random()*100))
    }, [])

    useEffect(()=>{
      if(prop.id)
      {
          db.collection('rooms').doc(prop.id).collection('messages').orderBy("timestamp","desc").onSnapshot(snapshot=>{
            setlastmsg(snapshot.docs.map(doc=>doc.data()))
          })
      }
    },[])
    // const createChat = ()=>{}
        return(
            <Link to={`/rooms/${prop.id}`}>
             <div className="sidebarChat">
               <Avatar src={`https://avatars.dicebear.com/api/human/${random}.svg`}/>
               <div className="sidebarChat_info">
                   <h2>{prop.name}</h2>
                   <p>{lastmsg[0]?.message}</p>
               </div>
               </div>
            </Link>
        )

}

export default SidebarChat
