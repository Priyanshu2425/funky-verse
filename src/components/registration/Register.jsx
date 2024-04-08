import { useState, useRef } from "react"
import { Link, useNavigate } from "react-router-dom"
import { z } from "zod"
import BackButton from "/back-btn.png"
import Reload from "/reload.png"
import VerifiedIcon from "/verified.png"
import ClothingBanner from "/clothingbanner.jpg"
import "../../assets/login.css"
import "../../assets/register.css"
import { CircularProgress } from "@mui/material"
import { username } from "../../atoms"
import { useSetRecoilState } from 'recoil'

export default function Register(){
    const navigate = useNavigate();
    const setUsername = useSetRecoilState(username);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [mobileNum, setMobileNum] = useState("");
    const [password, setPassword] = useState("");
    const [otp, setOtp] = useState("");
    const [otpVerified, setOTPVerified] = useState(false);
    
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState("");

    const changeName = (event)=> setName(event.target.value);
    const changeEmail = (event)=> setEmail(event.target.value);
    const changeMobileNum = (event)=> setMobileNum(event.target.value);
    const changePassword = (event)=> setPassword(event.target.value);
    const changeOTP = (event)=> setOtp(event.target.value);

    let verifyBtn = useRef();
    let getOTPbtn = useRef();
    let otpMessage = useRef();
    let btn2 = useRef();
    async function getOTP(){
        const emailSchema = z.string().email().min(7);
        try{
            emailSchema.parse(email);
            if(!name){
                throw new Error("Invalid Username");
            }
            if(!password){
                throw new Error('Invalid Password');
            }
            if(!mobileNum){
                throw new Error('Invalid Mobile Number');
            }
            getOTPbtn.current.style.display = "none";
            verifyBtn.current.style.display = "block";
            btn2.current.style.display = "flex";
            //https://funkyverse-backend.netlify.app/.netlify/functions/api/user/otp
            let response = await fetch("https://funkyverse-backend.netlify.app/.netlify/functions/api/user/otp",{
                method: "POST",
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({'email': email}),
                cors: 'no-cors'
            })
            
            let data = await response.json();
            console.log(data);
            otpMessage.current.innerHTML = "OTP Sent";
        }catch(error){
            if(error.name === "ZodError"){
                setMessage("Invalid Email");
                setMessageType("error-btn");
            }else{
                setMessage(error.message);
                setMessageType("error-btn");
            }
            setMessageType("error-btn");
            window.scrollTo(0, 0);
            setTimeout(()=>setMessage(""), 5000);
        }
    }

    const [verifyingOTP, setVerifyingOTP] = useState(false);
    function verifyOTP(){
        setVerifyingOTP(true);
        async function sendVerifyReq(){
            if(otp.length === 6 && !otpVerified){
                // https://funkyverse-backend.netlify.app/.netlify/functions/api/user/match/otp
                let response = await fetch("https://funkyverse-backend.netlify.app/.netlify/functions/api/user/match/otp", {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({"userOTP": otp}),
                    cors: 'no-cors'
                });
                
                if(response.status === 200){
                    setOTPVerified(true);
                    otpMessage.current.innerHTML = "Verified";
                }

            }
        }
        sendVerifyReq();
        setTimeout(()=>{
            setVerifyingOTP(false);
        }, 2000);
    }

    const [registrationOngoing, setRegistrationOngoing] = useState(false);
    function handleSubmit(event){ 
        setRegistrationOngoing(true); 
         
        event.preventDefault();

        async function register(){
            if(otpVerified){
                let userData = {
                    "Name": name,
                    "Email": email,
                    "Mobile Number": mobileNum,
                    "Password": password,
                    "OTP": otp
                }
                // https://funkyverse-backend.netlify.app/.netlify/functions/api/user/signup
                let response = await fetch("https://funkyverse-backend.netlify.app/.netlify/functions/api/user/signup", {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    }, 
                    body: JSON.stringify(userData),
                    cors: 'no-cors'
                })
                
                let message = await response.json();
                if(response.status === 200){
                    setMessage("Registration Successful.");
                    setMessageType("success-btn");
                    localStorage.setItem("auth_token", message.auth);
                    setUsername(message.username);
                    setTimeout(()=>{
                        setMessage('');
                        setMessageType('');
                        navigate('/');
                    }   , 1500);
                }else if(response.status === 400){
                    setMessage("User exists already. Please log in.");
                    setMessageType("error-btn");
                }else{
                    setMessage("Error signing up");
                    setMessageType("error-btn");
                }
                setTimeout(()=>{
                    setMessage('');
                }, 3000);
            }
        }

        register();
        setTimeout(()=>{
            setRegistrationOngoing(false);
        }, 2000);
    }

    return (
        <>  
            <div id="form-banner">
                <img src={ClothingBanner}/>
            </div>
            <div id="register-page">

                <span id="back-btn">
                    <Link className="link-component"  to="/"><img style={{width: "15px"}} src={BackButton}/></Link>
                </span>
                <br/>
                <div id="message">
                    {message && <div className={`message inter-thin ${messageType}`}> {message} </div> }
                </div>
                <br/>
                <p className="inter-thin" id="form-title">Register</p>
                <form className="inter-thin" id="login-form" onSubmit={handleSubmit}>
                    <input type="text" placeholder="Name" onChange={changeName}/>
                    <input type="email" placeholder="Email" onChange={changeEmail}/>
                    <input type="number" placeholder="Mobile No." onChange={changeMobileNum}/>
                    <input type="password" placeholder="Password" onChange={changePassword}/>
                    <input type="number" placeholder="Enter OTP" onChange={changeOTP}/>
                    <div id="otp-btn" >
                        <button  className="btn1 inter-thin submit-btn" onClick={getOTP} ref={getOTPbtn}>GET OTP</button>
                        <button  className="btn1 submit-btn" onClick={verifyOTP} ref={verifyBtn} style={{display: "none"}}>
                            VERIFY {verifyingOTP && <CircularProgress size={10} color="inherit"/>} </button> 
                        
                        <div id="btn2" ref={btn2}>
                            <button>
                                {otpVerified && 
                                    <img style={{width: "25px"}} src={VerifiedIcon}/>}
                            </button>
                        </div>
                        <div id="otp-message" ref={otpMessage}></div>
                    </div>
                    <br/> 
                    {registrationOngoing ?
                    <button className='submit-btn' style={{padding: "6px"}}><CircularProgress color='inherit' size={20}/></button>
                    :<button className="inter-regular submit-btn">Submit</button>}
                </form>
                <br/><br/>
                <Link to='/login'>Already a user? Login</Link>
            </div>
        </>
    )
}