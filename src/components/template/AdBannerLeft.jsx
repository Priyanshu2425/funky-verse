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
                    <button className='shop-banner-button'> SHOP ALL </button>
                </div>
            </div>
        </>
    )
}