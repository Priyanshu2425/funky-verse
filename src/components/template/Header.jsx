import {Link} from 'react-router-dom'
import Logo from '/funkyverse.png'
import MenuIcon from '/menus.png'
import ProfileIcon from '/profile-user.png'
 
import "../../assets/header.css"

export default function Header(){

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

                    <img src={MenuIcon}/>

                    <div id="mobile-logo" className='inter-exp'>
                        <Link className="link-component"  to="/">FUNKYVERSE</Link>
                    </div>


                    
                    <img src={ProfileIcon}/>
                    
                </div>

            </div>
        </>
    )
}