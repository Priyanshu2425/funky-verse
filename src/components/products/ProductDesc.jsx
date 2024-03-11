import { useState, useCallback, useRef } from 'react'
import { useLocation } from "react-router-dom"
import '../../assets/product-desc.css'
import { useEffect } from "react";
import Collection from './Collection';
import CircularProgress from '@mui/material/CircularProgress';


export default function ProductDesc(props){
    const [product, setProduct] = useState();
    const [quantity, setQuantity] = useState(1);
    const [addingToCart, setAddingToCart] = useState(false);
    const [buyingNow, setBuyingNow] = useState(false);

    const [selectedSize, setSelectedSize] = useState('S');

    const handleSizeChange = (value) => {
        setSelectedSize(value);
        console.log(selectedSize);
    };

    function increaseQuantity(){
        let newQuantity = quantity + 1
        setQuantity(newQuantity);
    }

    function decreaseQuantity(){
        let newQuantity = quantity - 1;
        if(newQuantity < 1) setQuantity(1);
        else setQuantity(newQuantity);
    }
    const location = useLocation();


    const searchParams = new URLSearchParams(location.search);
    const productId = searchParams.get("id");

    const getProduct = useCallback(async()=>{
        let response = await fetch(`https://funkyverse-backend.netlify.app/.netlify/functions/api/products/item/${productId}`,{
            method: 'GET',
            headers: {
                'auth': localStorage.getItem('auth_token')
            },
            credentials:'include',
            mode: "cors"
        })
        let data = await response.json();
        setProduct(data.product[0]);
    }, [productId]);

    const mainImage = useRef();

    function changeImg(event){
        const src = event.target.src;
        console.log(src);
        mainImage.current.src = src;
    }

    async function addToCart(event){
        setAddingToCart(true);
        let data = {
            'product': product._id,
            'productName': product.productName,
            'size': selectedSize,
            'quantity': quantity,
            'imageLink1': product.imageLink1,
            'price': product.discountPrice,
            'total_price': product.discountPrice * quantity
        }

        let response = await fetch("https://funkyverse-backend.netlify.app/.netlify/functions/api/user/cart/add-to-cart/",{
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'auth': localStorage.getItem('auth_token')
            },
            body: JSON.stringify(data),
            credentials: 'include',
            mode: "cors"
        })

        let responseData = await response.json();
        console.log(responseData);
        setAddingToCart(false);
    }

    useEffect(()=>{
        getProduct();
        window.scrollTo(0, 0);
        console.log('ran');
    }, [getProduct])
    
    return (
        <>
            { product ?
                <div>
                <div className="product-desc">
                    <div className='img-showcase'>
                        <img src={product.imageLink1} ref={mainImage}/>
                        <div className='img-showcase-extra'>
                            {product.images.map((img, index)=>{
                                return <img className="optionImgs" src={img} key={index}/>
                            })}
                        </div>
                        <div className='img-showcase-options'>
                            <img onClick={changeImg} src={product.imageLink1}/>
                            {product.images.map((img, index)=>{
                                return <img onClick={changeImg} className="optionImgs" src={img} key={index}/>
                            })}
                        </div>
                    </div>
                    <div className='info-showcase inter-thin'>
                        <div>
                            <p className='info-showcase-branding'>FUNKYVERSE</p>
                            <h1 className='inter-regular'>{product.productName[0].toUpperCase() + product.productName.slice(1)}</h1>
                            <p style={{fontWeight: 300, fontSize: '1.5rem'}}>
                                ₹{product.discountPrice}.00
                                <span style={{fontSize: '0.8rem', textDecoration: 'line-through', marginLeft: '10px'}}> ₹{product.price}.00 </span>
                            </p>
                            
                            <div className='size'>
                                <div
                                    className={`size-option ${selectedSize === 'S' ? 'selected' : ''}`}
                                    onClick={() => handleSizeChange('S')}
                                >
                                    S
                                </div>

                                <div
                                    className={`size-option ${selectedSize === 'M' ? 'selected' : ''}`}
                                    onClick={() => handleSizeChange('M')}
                                >
                                    M
                                </div>

                                <div
                                    className={`size-option ${selectedSize === 'L' ? 'selected' : ''}`}
                                    onClick={() => handleSizeChange('L')}
                                >
                                    L
                                </div>

                                <div
                                    className={`size-option ${selectedSize === 'XL' ? 'selected' : ''}`}
                                    onClick={() => handleSizeChange('XL')}
                                >
                                    XL
                                </div>

                                <div
                                    className={`size-option ${selectedSize === 'XXL' ? 'selected' : ''}`}
                                    onClick={() => handleSizeChange('XXL')}
                                >
                                    XXL
                                </div>

                            </div>
                            <div className='quantity'>
                                <div className="quantity-btns" onClick={decreaseQuantity} style={{padding: '0 20px', fontSize: '1.5rem'}}> - </div>
                                <div style={{display:'flex', width: '20px', flexDirection: 'column', justifyContent: 'center' , fontSize: '1.5rem'}}> {quantity} </div>
                                <div className="quantity-btns" onClick={increaseQuantity} style={{padding: '0 20px', fontSize: '1.5rem'}}> + </div>
                            </div>
                            
                            <div className='checkout-btns'>
                                {!addingToCart
                                 ? <button onClick={addToCart}>Add to Cart</button>
                                 : <button><CircularProgress size={20} color="inherit"/></button>
                                }
                                {buyingNow
                                 ? <button><CircularProgress size={20} color="inherit"/></button>
                                 : <button>Buy Now</button>}
                                
                            </div>
                        </div>
                        <div>
                            <p>Fabric: {product.fabric}</p>
                            <p>Fit: {product.fit}</p>
                            <p>Length: {product.length}</p>
                            <p>Neck: {product.neck}</p>
                            <p>Pattern: {product.pattern}</p>
                            <p>Pattern Type: {product.patternType}</p>
                            <p>Price: {product.price}</p>
                            <p>Sleeve Length: {product.sleeveLength}</p>
                            <p>Sleeve Styling: {product.sleeveStyling}</p>
                            <p>Wash Care: {product.washCare}</p>
                            <p>Weave Type: {product.weaveType}</p>
                            <br/>
                            <p> {product.description} </p>
                        </div>
                    </div>
                </div> 
                                <Collection color="white" collection="FEATURED"/>
                                <Collection color="#F5F6FB" collection="LATEST DROPS"/>
                </div>:
                
                <div></div>
            }
        </>
    )
}