import { Link } from "react-router-dom"
import '../../assets/adbanner.css'
import '../../assets/adbannerleft.css'

export default function AdBanner(){
    return (
        <>
            <div className="ad-banner">
                <div className='adbanner-left' id='left-img'>
                </div>
                <div className='adbanner-right' id='right-text'>
                    <h1 className='inter-thin'> COMFORTABLE CLOTHING.</h1>
                    <p className='inter-thin'>Say goodbye to size mismatches, with FunkyVerse Clothing, 
                    what you order is precisely what fits.</p>
                    <Link className="link-component" to="/shop">
                        <button className='shop-banner-button'> SHOP ALL </button>
                    </Link>
                </div>
            </div>
        </>
    )
}