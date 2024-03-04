import { useState } from "react"
import { LazyLoadImage } from "react-lazy-load-image-component"
import "../../assets/product-card.css"

export default function ProductCard(props){

    const [imageLoaded, setImageLoaded] = useState(false);

    function handleImageLoad(){
        setImageLoaded(true);
    }

    return (
        <>
            <div className="card">

                {!imageLoaded && <div className="card-img-fallback"></div>}

                <img
                    className='card-img'
                    src={props.product.imageLink1}
                    alt={props.product.productName}
                    onLoad={handleImageLoad}
                    style={{ "display": imageLoaded ? 'block' : 'none' }}
                />

                <div className='info'>
                    <div className="product-name inter-regular">{props.product.productName}</div>
                    <div className="discount-price inter-thin"> Rs. {props.product.discountPrice} </div>
                    <div className="product-price inter-thin"> Rs. {props.product.price} </div>
                </div>

                {props.product.tags ? <div className="tags bestseller">
                    Bestseller
                </div> : <div></div>}
            </div>
            
        </>
    )
}