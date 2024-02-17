import {Link} from 'react-router-dom'
import Logo from '/funkyverse.png'
import MenuIcon from '/menu-icon.png'
import '../assets/header.css'

export default function Header(){

    function closeMenu(){
        let openUpMenu = document.getElementById('openup-menu');
        openUpMenu.style.display = 'none';
        let body = document.getElementsByTagName('body');
        body[0].style.overflow = "scroll";
    }

    function openMenu(){
        let openUpMenu = document.getElementById('openup-menu');
        openUpMenu.style.display = 'flex';
        let body = document.getElementsByTagName('body');
        body[0].style.overflow = "hidden";
    }

    return (
        <>
            <nav>
                <div id="logo"><img src={Logo}/></div>
                <Link className="link-component"  to="/"><p onClick={closeMenu} id="home">Home</p></Link>
                <Link className="link-component"  to="/shop"><p onClick={closeMenu} id="shop">Shop</p></Link>
                <div id="menu-icon" onClick={openMenu}><img id="menu-icon-img" src={MenuIcon}/></div>
            </nav>
            <div id='openup-menu'>
                <Link className="link-component" to="/">Home</Link>
                <Link className="link-component" to="/shop">Shop</Link>
                <br></br>
                <div id="closeBtn" onClick={closeMenu}> X </div>
                {/* <button></button> */}
            </div>            
        </>
    )
}