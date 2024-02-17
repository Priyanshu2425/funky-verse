import {Link} from 'react-router-dom'
import Logo from '/logo.PNG'
import InstagramLogo from '/instagram.png'
import "../assets/footer.css"

export default function Footer(){
    return (   
        <>             
            <footer>
                <div></div>
                <div id="footer-logo"><img id='footer-logo-img' src={Logo}/></div>
                <div id="footer-links" className="right-justify"> 
                    <h3>Quick Links</h3>
                    <Link className="link-component" to="/"><p>Home</p></Link>
                    <Link className="link-component" to="/shop"><p>Shop</p></Link>
                </div>
                <div id="socials" className='right-justify'>
                    <h3>Socials</h3>
                    <a href='https://www.instagram.com/funky_verse3/'><img src={InstagramLogo}/> the_funkyverse </a>
                    <br></br>
                    <a href="mailto:funkyverse3@gmail.com">thefunkyverse@gmail.com</a>
                </div>
                <div></div>
            </footer>
        </>
    )
}