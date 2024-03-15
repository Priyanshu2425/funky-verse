import { useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import MenuIcon from '/menus.png'
import CloseButton from '/close-button.png'

import "../../assets/header.css"

import { useRecoilState } from 'recoil'
import { username } from '../../atoms'
import { useEffect, useCallback } from "react";
import { nullable } from 'zod'

export default function Header(){
    const navigate = useNavigate();
    const [userLoggedIn, setUserLoggedIn] = useRecoilState(username);

    const mobileMenuBox = useRef();
    function openMenu() {
        mobileMenuBox.current.style.display = "flex";
    }

    function closeMenu(){
        mobileMenuBox.current.style.display = "none";
    } 

    function logoutUser(){
        localStorage.removeItem('auth_token');
        setUserLoggedIn('');
        closeMenu();
        navigate('/');
    }

    
    const [_username, setUsername] = useRecoilState(username);
    const loginWithToken = useCallback(async (token)=>{
        let response = await fetch('https://funkyverse-backend.netlify.app/.netlify/functions/api/user/login', {
        method: 'POST',
        headers: {
            'auth': token
        },
        credentials: 'include',
        mode: 'cors'
        });
        
        let data = await response.json();
        setUsername(data.username.split(" ")[0]);

    
    }, [_username]);
  
    useEffect(()=>{
        const token = localStorage.getItem('auth_token');
        if(token) loginWithToken(token);
        console.log()
    }, [])

    return (
        <>
            <div id="header">
                <div id="desktop-menu">
                    <div id="logo">
                        <Link className="link-component"  to="/"><div className='inter-exp'>FUNKYVERSE</div></Link>
                    </div>

                    <nav className='inter-thin'>
                        {/* <p onClick={closeMenu} id="home">Home</p> */}

                        <div>
                            
                            <div id="header-links">

                                <Link className="link-component"  to="/shop">
                                    <p id="shop">Shop</p>
                                </Link>

                                <Link className="link-component"  to="/about">
                                    <p id="shop">About Us</p>
                                </Link>

                                <Link className="link-component"  to="/faq">
                                    <p id="faq">FAQ</p>
                                </Link>

                                <Link className="link-component"  to="/contact">
                                    <p id="signup">Contact US</p>
                                </Link>
                                {
                                    userLoggedIn ?
                                    <>
                                        <Link className="link-component"  to="/cart">
                                        <div id="profile-cart">                                        
                                            
                                            <svg width="18px" height="18px" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg">
                                            
                                                <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                                                    <g id="Icon-Set-Filled" transform="translate(-518.000000, -725.000000)" fill="#000000">
                                                        <path d="M528,751 C529.104,751 530,751.896 530,753 C530,754.104 529.104,755 528,755 C526.896,755 526,754.104 526,753 C526,751.896 526.896,751 528,751 L528,751 Z M524,753 C524,755.209 525.791,757 528,757 C530.209,757 532,755.209 532,753 C532,750.791 530.209,749 528,749 C525.791,749 524,750.791 524,753 L524,753 Z M526,747 C524.896,747 524,746.104 524,745 C524,745 547,743 546.972,743.097 C547.482,741.2 549.979,730.223 550,730 C550.054,729.45 549.553,729 549,729 L524,729 L524,727 L525,727 C525.553,727 526,726.553 526,726 C526,725.448 525.553,725 525,725 L519,725 C518.447,725 518,725.448 518,726 C518,726.553 518.447,727 519,727 L522,727 L522,745 C522,747.209 523.791,749 526,749 L549,749 C549.031,749 549,748.009 549,747 L526,747 L526,747 Z M540,751 C541.104,751 542,751.896 542,753 C542,754.104 541.104,755 540,755 C538.896,755 538,754.104 538,753 C538,751.896 538.896,751 540,751 L540,751 Z M536,753 C536,755.209 537.791,757 540,757 C542.209,757 544,755.209 544,753 C544,750.791 542.209,749 540,749 C537.791,749 536,750.791 536,753 L536,753 Z" id="cart-2">

                                                        </path>
                                                    </g>
                                                </g>
                                            </svg>
                                            <p id="signup">Cart</p>
                                        </div>
                                        </Link>

                                        <Link className="link-component"  to="/profile">
                                            <div id="profile-cart">
                                                <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M16.5 7.063C16.5 10.258 14.57 13 12 13c-2.572 0-4.5-2.742-4.5-5.938C7.5 3.868 9.16 2 12 2s4.5 1.867 4.5 5.063zM4.102 20.142C4.487 20.6 6.145 22 12 22c5.855 0 7.512-1.4 7.898-1.857a.416.416 0 0 0 .09-.317C19.9 18.944 19.106 15 12 15s-7.9 3.944-7.989 4.826a.416.416 0 0 0 .091.317z" fill="#000000"/></svg>
                                                <p id="signup">
                                                    {userLoggedIn[0].toUpperCase()+userLoggedIn.slice(1)} 
                                                </p>
                                            </div>
                                        </Link>

                                        <Link className='link-component' onClick={logoutUser}>
                                            <div id="profile-cart">
                                                <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M17.2929 14.2929C16.9024 14.6834 16.9024 15.3166 17.2929 15.7071C17.6834 16.0976 18.3166 16.0976 18.7071 15.7071L21.6201 12.7941C21.6351 12.7791 21.6497 12.7637 21.6637 12.748C21.87 12.5648 22 12.2976 22 12C22 11.7024 21.87 11.4352 21.6637 11.252C21.6497 11.2363 21.6351 11.2209 21.6201 11.2059L18.7071 8.29289C18.3166 7.90237 17.6834 7.90237 17.2929 8.29289C16.9024 8.68342 16.9024 9.31658 17.2929 9.70711L18.5858 11H13C12.4477 11 12 11.4477 12 12C12 12.5523 12.4477 13 13 13H18.5858L17.2929 14.2929Z" fill="#323232"/>
                                                    <path d="M5 2C3.34315 2 2 3.34315 2 5V19C2 20.6569 3.34315 22 5 22H14.5C15.8807 22 17 20.8807 17 19.5V16.7326C16.8519 16.647 16.7125 16.5409 16.5858 16.4142C15.9314 15.7598 15.8253 14.7649 16.2674 14H13C11.8954 14 11 13.1046 11 12C11 10.8954 11.8954 10 13 10H16.2674C15.8253 9.23514 15.9314 8.24015 16.5858 7.58579C16.7125 7.4591 16.8519 7.35296 17 7.26738V4.5C17 3.11929 15.8807 2 14.5 2H5Z" fill="#323232"/>
                                                </svg>
                                                <p>Logout</p>
                                            </div>
                                        </Link>

                                    </>
                                    :<>
                                        <Link className="link-component"  to="/login">
                                            <p id="login">Login</p>
                                        </Link>

                                        <Link className="link-component"  to="/register">
                                            <p id="signup">Register</p>
                                        </Link>
                                    </>


                                }


                                
                            </div>


                        </div>
                    </nav>
                </div>

                <div id="mobile-menu">

                    <img id="mobile-menu-btn" onClick={openMenu} src={MenuIcon}/>

                    <div id="mobile-logo" className='inter-exp'>
                        <Link className="link-component"  to="/">FUNKYVERSE</Link>
                    </div>

                    {
                        localStorage.getItem('auth_token') && userLoggedIn
                        ? 
                        <Link id="mobile-login-btn" className="link-component" onClick={closeMenu} to="/cart">
                            <svg width="18px" height="18px" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg">
                            
                                <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                                    <g id="Icon-Set-Filled" transform="translate(-518.000000, -725.000000)" fill="#000000">
                                        <path d="M528,751 C529.104,751 530,751.896 530,753 C530,754.104 529.104,755 528,755 C526.896,755 526,754.104 526,753 C526,751.896 526.896,751 528,751 L528,751 Z M524,753 C524,755.209 525.791,757 528,757 C530.209,757 532,755.209 532,753 C532,750.791 530.209,749 528,749 C525.791,749 524,750.791 524,753 L524,753 Z M526,747 C524.896,747 524,746.104 524,745 C524,745 547,743 546.972,743.097 C547.482,741.2 549.979,730.223 550,730 C550.054,729.45 549.553,729 549,729 L524,729 L524,727 L525,727 C525.553,727 526,726.553 526,726 C526,725.448 525.553,725 525,725 L519,725 C518.447,725 518,725.448 518,726 C518,726.553 518.447,727 519,727 L522,727 L522,745 C522,747.209 523.791,749 526,749 L549,749 C549.031,749 549,748.009 549,747 L526,747 L526,747 Z M540,751 C541.104,751 542,751.896 542,753 C542,754.104 541.104,755 540,755 C538.896,755 538,754.104 538,753 C538,751.896 538.896,751 540,751 L540,751 Z M536,753 C536,755.209 537.791,757 540,757 C542.209,757 544,755.209 544,753 C544,750.791 542.209,749 540,749 C537.791,749 536,750.791 536,753 L536,753 Z" id="cart-2">

                                        </path>
                                    </g>
                                </g>
                            </svg>
                        </Link>
                        :
                        <Link id="mobile-login-btn" className="link-component" onClick={closeMenu} to="/login">
                            <svg width="18px" height="18px" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg">
                            
                                <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                                    <g id="Icon-Set-Filled" transform="translate(-518.000000, -725.000000)" fill="#000000">
                                        <path d="M528,751 C529.104,751 530,751.896 530,753 C530,754.104 529.104,755 528,755 C526.896,755 526,754.104 526,753 C526,751.896 526.896,751 528,751 L528,751 Z M524,753 C524,755.209 525.791,757 528,757 C530.209,757 532,755.209 532,753 C532,750.791 530.209,749 528,749 C525.791,749 524,750.791 524,753 L524,753 Z M526,747 C524.896,747 524,746.104 524,745 C524,745 547,743 546.972,743.097 C547.482,741.2 549.979,730.223 550,730 C550.054,729.45 549.553,729 549,729 L524,729 L524,727 L525,727 C525.553,727 526,726.553 526,726 C526,725.448 525.553,725 525,725 L519,725 C518.447,725 518,725.448 518,726 C518,726.553 518.447,727 519,727 L522,727 L522,745 C522,747.209 523.791,749 526,749 L549,749 C549.031,749 549,748.009 549,747 L526,747 L526,747 Z M540,751 C541.104,751 542,751.896 542,753 C542,754.104 541.104,755 540,755 C538.896,755 538,754.104 538,753 C538,751.896 538.896,751 540,751 L540,751 Z M536,753 C536,755.209 537.791,757 540,757 C542.209,757 544,755.209 544,753 C544,750.791 542.209,749 540,749 C537.791,749 536,750.791 536,753 L536,753 Z" id="cart-2">

                                        </path>
                                    </g>
                                </g>
                            </svg>
                        </Link>
                    }
                    
                </div>

                <div id="mobile-menu-box" className="inter-thin" ref={mobileMenuBox}>

                    <img style={{width: "30px"}} onClick={closeMenu} src={CloseButton}/>

                    <Link className="link-component" onClick={closeMenu} to="/shop">
                        <p id="shop">Shop</p>
                    </Link>

                    <Link className="link-component" onClick={closeMenu} to="/about">
                        <p id="shop">About Us</p>
                    </Link>

                    <Link className="link-component" onClick={closeMenu} to="/faq">
                        <p id="faq">FAQ</p>
                    </Link>

                    <Link className="link-component" onClick={closeMenu} to="/contact">
                        <p id="signup">Contact US</p>
                    </Link>

                    {
                    userLoggedIn?
                    <>
                        <Link className="link-component"  to="/cart" onClick={closeMenu}>
                        <div id="profile-cart">                                        
                            
                            <p id="signup">Cart</p>
                            <svg width="18px" height="18px" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg">
                            
                                <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                                    <g id="Icon-Set-Filled" transform="translate(-518.000000, -725.000000)" fill="#000000">
                                        <path d="M528,751 C529.104,751 530,751.896 530,753 C530,754.104 529.104,755 528,755 C526.896,755 526,754.104 526,753 C526,751.896 526.896,751 528,751 L528,751 Z M524,753 C524,755.209 525.791,757 528,757 C530.209,757 532,755.209 532,753 C532,750.791 530.209,749 528,749 C525.791,749 524,750.791 524,753 L524,753 Z M526,747 C524.896,747 524,746.104 524,745 C524,745 547,743 546.972,743.097 C547.482,741.2 549.979,730.223 550,730 C550.054,729.45 549.553,729 549,729 L524,729 L524,727 L525,727 C525.553,727 526,726.553 526,726 C526,725.448 525.553,725 525,725 L519,725 C518.447,725 518,725.448 518,726 C518,726.553 518.447,727 519,727 L522,727 L522,745 C522,747.209 523.791,749 526,749 L549,749 C549.031,749 549,748.009 549,747 L526,747 L526,747 Z M540,751 C541.104,751 542,751.896 542,753 C542,754.104 541.104,755 540,755 C538.896,755 538,754.104 538,753 C538,751.896 538.896,751 540,751 L540,751 Z M536,753 C536,755.209 537.791,757 540,757 C542.209,757 544,755.209 544,753 C544,750.791 542.209,749 540,749 C537.791,749 536,750.791 536,753 L536,753 Z" id="cart-2">

                                        </path>
                                    </g>
                                </g>
                            </svg>
                        </div>
                        </Link>

                        <Link className="link-component"  to="/profile" onClick={closeMenu}>
                            <div id="profile-cart">
                                <p id="signup">
                                    {userLoggedIn[0].toUpperCase()+userLoggedIn.slice(1)} 
                                </p>
                                <div id="profile-cart">
                                    <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M16.5 7.063C16.5 10.258 14.57 13 12 13c-2.572 0-4.5-2.742-4.5-5.938C7.5 3.868 9.16 2 12 2s4.5 1.867 4.5 5.063zM4.102 20.142C4.487 20.6 6.145 22 12 22c5.855 0 7.512-1.4 7.898-1.857a.416.416 0 0 0 .09-.317C19.9 18.944 19.106 15 12 15s-7.9 3.944-7.989 4.826a.416.416 0 0 0 .091.317z" fill="#000000"/></svg>
                                </div>
                            </div>
                        </Link>

                        <Link className='link-component' onClick={logoutUser}>
                            <div id="profile-cart">
                                <p>Logout</p>
                                <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M17.2929 14.2929C16.9024 14.6834 16.9024 15.3166 17.2929 15.7071C17.6834 16.0976 18.3166 16.0976 18.7071 15.7071L21.6201 12.7941C21.6351 12.7791 21.6497 12.7637 21.6637 12.748C21.87 12.5648 22 12.2976 22 12C22 11.7024 21.87 11.4352 21.6637 11.252C21.6497 11.2363 21.6351 11.2209 21.6201 11.2059L18.7071 8.29289C18.3166 7.90237 17.6834 7.90237 17.2929 8.29289C16.9024 8.68342 16.9024 9.31658 17.2929 9.70711L18.5858 11H13C12.4477 11 12 11.4477 12 12C12 12.5523 12.4477 13 13 13H18.5858L17.2929 14.2929Z" fill="#323232"/>
                                    <path d="M5 2C3.34315 2 2 3.34315 2 5V19C2 20.6569 3.34315 22 5 22H14.5C15.8807 22 17 20.8807 17 19.5V16.7326C16.8519 16.647 16.7125 16.5409 16.5858 16.4142C15.9314 15.7598 15.8253 14.7649 16.2674 14H13C11.8954 14 11 13.1046 11 12C11 10.8954 11.8954 10 13 10H16.2674C15.8253 9.23514 15.9314 8.24015 16.5858 7.58579C16.7125 7.4591 16.8519 7.35296 17 7.26738V4.5C17 3.11929 15.8807 2 14.5 2H5Z" fill="#323232"/>
                                </svg>
                            </div>
                        </Link>

                    </>
                    :<>
                        <Link className="link-component"  to="/login" onClick={closeMenu}>
                            <p id="login">Login</p>
                        </Link>

                        <Link className="link-component"  to="/register" onClick={closeMenu}>
                            <p id="signup">Register</p>
                        </Link>
                    </>


                }


                </div>

            </div>
        </>
    )
}