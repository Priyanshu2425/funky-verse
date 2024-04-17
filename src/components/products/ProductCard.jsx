import { useEffect, useState } from "react"
import { Link } from 'react-router-dom'
import { LazyLoadImage } from "react-lazy-load-image-component"
import "../../assets/product-card.css"
import { Blurhash } from 'react-blurhash'

export default function ProductCard(props){

    const [imageLoaded, setImageLoaded] = useState(false);    

    return (
        <>
                <div className="card" >
            <Link className="link-component" to={`/product?id=${props.product._id}`}>

                    {!imageLoaded && <div className="card-img-fallback"></div>}
                    <img
                        className='card-img'
                        src={props.product.imageLink1}
                        alt={props.product.productName}
                        onLoad={()=>{setImageLoaded(true)}}
                        style={{ "display": imageLoaded ? 'block' : 'none' }}
                        id={`${props.product._id}#${props.product.productName}`}              
                    />
                    <div className='info'>
                        <div className="product-name inter-regular">{props.product.productName}</div>
                        <div className="discount-price inter-thin"> ₹ {props.product.discountPrice} </div>
                        <div className="product-price inter-thin"> ₹ {props.product.price} </div>
                    </div>

                    {props.product.tags ? <div className="tags bestseller">
                        Bestseller
                    </div> : <div></div>}
            </Link>
                </div>
        </>
    )
}