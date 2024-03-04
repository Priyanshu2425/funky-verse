import { Link } from "react-router-dom"
import '../../assets/adbanner.css'
import '../../assets/adbannerright.css'

export default function AdBanner(){
    return (
        <>
            <div className="ad-banner">
                <div className='adbanner-left' id="left-text">
                    <h1 className='inter-thin'>TRENDSETTING DESIGNS</h1>
                    <p className='inter-thin'> Keep your wardrobe updated with the latest styles that reflect your personality. </p>
                    <button className='shop-banner-button'>
                        <Link className="link-component" to="/shop">
                            SHOP LATEST
                        </Link>
                    </button>
                </div>
                <div className='adbanner-right' id="right-img">

                </div>
            </div>
        </>
    )
}