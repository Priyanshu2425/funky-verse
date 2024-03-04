import { Link } from "react-router-dom"
import BackButton from "/back-btn.png"
import ClothingBanner from "/clothingbanner.jpg"
import "../../assets/login.css"


export default function Login(){
    return (
        <>
            <div id="form-banner">
                <img src={ClothingBanner}/>
            </div>
            <div id="login-page">
                <span id="back-btn">
                    <Link className="link-component"  to="/"><img style={{width: "15px"}} src={BackButton}/></Link>
                </span>
                <br/><br/><br/>
                <p className="inter-thin" id="form-title">Login in to your account</p>
                <form className="inter-thin" id="login-form">
                    <input type="email" placeholder="Email"/>
                    <input type="password" placeholder="Password"/>
                    <br/> 
                    <button>Submit</button>
                </form>
            </div>
        </>
    )
}