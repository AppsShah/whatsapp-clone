import { Button } from '@material-ui/core'
import React from 'react'
import './login.css'
import Logo from './whatsapp.png'
import {auth, provider} from "../firebase"
import {actionTypes} from "../reducer"
import { useStateValue } from "../StateProvider"
function Login() {
const [user,dispatch]=useStateValue();
    function signIn(){
        auth.signInWithPopup(provider).then((result)=>{
            dispatch({
                type:actionTypes.SET_USER,
                user:result.user,
            })    
        })
        .catch((error)=>alert(error.message))
     }
    return (
    <>
    <div className="login">
        <div className="login_container">
                <img src={Logo} alt=""
                />
                <div className="login_text">
                <h1>Sign in to Whatsapp-clone</h1>
                </div>
                <div>
                <Button style={{marginTop:"50px",
                textTransform:"inherit  !important",
                backgroundColor:"#0a8d48",
                color:"white"}} onClick={signIn}>Sign In With Google</Button>
                </div>
            </div>
    </div>
    </>
    )
}

export default Login
