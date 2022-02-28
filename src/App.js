import React from 'react';
import './App.css';
import Chat from './chat/Chat'
import Sidebar from './sidebar/Sidebar'
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom'
import Login from './Login/Login'
import { useStateValue } from './StateProvider';

// const obj={
//   name:"akshat",
//   dream:"dev",
//   object:{
//     name1:"akki",
//     name2:"devanshi"
//   }
// }
function App() {
  const [user]=useStateValue()
  // console.log(user)
  
  // const [user,setUser]=useState(null)
  if(user==null){
    return(<div className="app">
        <Login/>
    </div>)
  }
  else{
    return (
      <>
      <div className="app">
        <div className="app_body">
           <Router>
                    <Sidebar imgurl={user.user.photoURL}/>
             <Switch>
             <Route path="/rooms/:roomId">
                  {/* <Sidebar /> */}
                  <Chat username={user.user.displayName}/>
              </Route>
                  <Route path="/app">
                    {/* <Sidebar /> */}
                    <Chat />
                </Route>
               <Route path="/">
                    {/* <Sidebar /> */}
                    <Chat />
               </Route>
             </Switch>
           </Router>
        </div>
      </div>
      </>
  );
  }
}

export default App;
