import { useState, useEffect } from 'react'
import { Link, useNavigate } from "react-router-dom"
import BackButton from "/back-btn.png"
import ClothingBanner from "/clothingbanner.jpg"
import "../../assets/login.css"
import { useSetRecoilState } from 'recoil'
import { username } from '../../atoms'
import CircularProgress from '@mui/material/CircularProgress';

const url = import.meta.env.VITE_BACKEND_URL;
export default function Login(){
    const navigate = useNavigate();
    const setUsername = useSetRecoilState(username);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('');

    const changeEmail = (event)=>setEmail(event.target.value);
    const changePassword = (event)=>setPassword(event.target.value);

    const [loggingIn, setLoggingIn] = useState(false);
    async function handleLogin(event){
        event.preventDefault();
        setLoggingIn(true);
        if(!email || !password){
            setMessage("Invalid email/password");
            setMessageType("error-btn");
            return;
        }

        let response = await fetch(`${url}/user/login`, {
            method: 'POST',
            headers: {
                'email': email,
                'password': password
            },
            cors: 'no-cors'
        })

        let data = await response.json();
        if(response.status === 200){
            setMessage(data.message);
            setMessageType('success-btn');
            localStorage.setItem("auth_token", data.auth);
            setUsername(data.username);
            setTimeout(()=>{
                setMessage('');
                setMessageType('');
                navigate('/');
            }, 1500);
        }else{
            setMessage(data.message);
            setMessageType('error-btn');
            setTimeout(()=>{
                setMessage('');
                setMessageType('');
            }, 1500);
        }
        setLoggingIn(false);
    }

    return (
        <>
            <div id="form-banner">
                <img src={ClothingBanner}/>
            </div>
            <div id="login-page">
                <span id="back-btn">
                    <Link className="link-component"  to="/"><img style={{width: "15px"}} src={BackButton}/></Link>
                </span>
                <div id="message">
                    {message && <div className={`message inter-regular ${messageType}`}> {message} </div> }
                </div>
                <br/><br/><br/>
                <p className="inter-thin" id="form-title">Login in to your account</p>
                <form className="inter-thin" id="login-form" onSubmit={handleLogin}>
                    <input type="email" placeholder="Email" onChange={changeEmail}/>
                    <input type="password" placeholder="Password" onChange={changePassword}/>
                    <br/> 
                    {loggingIn ? 
                     <button className='submit-btn' style={{padding: "6px"}}><CircularProgress color='inherit' size={20}/></button>
                     : <button className="submit-btn">Submit</button>}
                </form>
                <br/><br/>
                <Link to='/register'>New here? Register</Link>
            </div>
        </>
    )
}