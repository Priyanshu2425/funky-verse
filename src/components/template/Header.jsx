import { useRef } from 'react'
import { Link } from 'react-router-dom'
import MenuIcon from '/menus.png'
import ProfileIcon from '/profile-user.png'
import CloseButton from '/close-button.png'

import "../../assets/header.css"

export default function Header(){
    const mobileMenuBox = useRef();
    function openMenu() {
        mobileMenuBox.current.style.display = "flex";
    }

    function closeMenu(){
        mobileMenuBox.current.style.display = "none";
    }

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

                                <Link className="link-component"  to="/login">
                                    <p id="login">Login</p>
                                </Link>

                                <Link className="link-component"  to="/register">
                                    <p id="signup">Register</p>
                                </Link>
                            </div>


                        </div>
                    </nav>
                </div>

                <div id="mobile-menu">

                    <img id="mobile-menu-btn" onClick={openMenu} src={MenuIcon}/>

                    <div id="mobile-logo" className='inter-exp'>
                        <Link className="link-component"  to="/">FUNKYVERSE</Link>
                    </div>


                    <Link id="mobile-login-btn" className="link-component" onClick={closeMenu} to="/login">
                        <img src={ProfileIcon}/>
                    </Link>
                    
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

                    <Link className="link-component" onClick={closeMenu} to="/login">
                        <p id="login">Login</p>
                    </Link>

                    <Link className="link-component" onClick={closeMenu} to="/register">
                        <p id="signup">Register</p>
                    </Link>
                

                </div>

            </div>
        </>
    )
}