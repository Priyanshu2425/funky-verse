import { useState, useCallback, useRef } from 'react'
import { Link, useLocation, useNavigate} from "react-router-dom"
import '../../assets/product-desc.css'
import { useEffect } from "react";
import Collection from './Collection';
import CircularProgress from '@mui/material/CircularProgress';
import { IoIosArrowForward } from "react-icons/io";
import Loading from '../template/Loading';

export default function ProductDesc(props){
    const navigate = useNavigate();
    const [product, setProduct] = useState();
    const [quantity, setQuantity] = useState(1);
    const [addingToCart, setAddingToCart] = useState(false);
    const [buyingNow, setBuyingNow] = useState(false);

    const [selectedSize, setSelectedSize] = useState('');
    const [message, setMessage] = useState('');

    const handleSizeChange = (value) => {
        setSelectedSize(value);
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

    function showDescription(event){
        let div = document.getElementById("product-desc-box-id");
        if(div.classList.indexOf('product-desc-box') >= 0){
            div.classList.remove('product-desc-box');
            div.classList.add('product-desc-box-height-300');
        }else{
            div.classList.remove('product-desc-box-height-300');
            div.classList.add('product-desc-box');
        }

    }

    function closeDescription(){
        let div = document.getElementById("product-desc-box-id");
        
    }

    const location = useLocation();


    const searchParams = new URLSearchParams(location.search);
    const productId = searchParams.get("id");

    const getProduct = useCallback(async()=>{
        let response = await fetch(`https://funkyverse-backend.netlify.app/.netlify/functions/api/products/item/${productId}`,{
            method: 'GET',
            headers: {
                'auth': localStorage.getItem('auth_token')
            }
        })
        let data = await response.json();
        setProduct(data.product[0]);
    }, [productId]);

    const mainImage = useRef();

    function changeImg(event){
        const src = event.target.src;
        mainImage.current.src = src;
    }

    const [addMessage, setAddMessage] = useState("");
    async function addToCart(event){
        if(!selectedSize){
            setMessage('Please select a size');
            setTimeout(()=>{
                setMessage('');
            }, 1500);
            return;
        }
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
            body: JSON.stringify(data)
        })

        let responseData = await response.json();

        setAddMessage("Added to Cart");
        setTimeout(()=>{
            setAddMessage("");
        }, 2000);
        setAddingToCart(false);
    }

    async function buynow(){
        setBuyingNow(true);
        if(!localStorage.getItem('auth_token')) navigate('/login');
        let transactionDetails = {
            "amount": quantity*product.discountPrice,
            "productId": product._id,
            "size": selectedSize,
            "quantity": quantity
        }

        async function buyNowReq(){
            let response = await fetch("https://funkyverse-backend.netlify.app/.netlify/functions/api/user/orders/payment/buynow", {
                "method": "POST",
                "headers": {
                    "auth": localStorage.getItem('auth_token'),
                    "Content-Type": "application/json"
                },
                "body": JSON.stringify(transactionDetails)
            })

            let data = await response.json();
            setTimeout(()=>{
                window.location.href = data.url;
            }, 2000);
        }
        buyNowReq();
        setBuyingNow(false);
    }

    useEffect(()=>{
        getProduct();
        window.scrollTo(0, 0);
        setTimeout(()=>{
            setLoading(false);
        }, 2000);
    }, [getProduct])
    const [loading, setLoading] = useState(true);

    if(loading) return (
        <>
            <Loading/>
        </>
    )
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
                            <br/>
                            <div> 
                                <span>Select Size</span>
                                <br/><br/>
                                <Link to='/sizechart' className='link-component'>
                                    <span style={{fontSize: "0.8rem", color: '#10b981', display: 'flex', 
                                    'alignItems': 'center', fontWeight: 'bold'}}>SIZE CHART <IoIosArrowForward/></span>
                                </Link>
                             </div>
                            <div className='size'>
                                <div
                                    className={`size-option ${selectedSize === 'S' ? 'selected' : ''}`}
                                    onClick={() => {
                                        handleSizeChange('S');
                                        document.getElementById('quantityBox').style.display = 'flex';
                                    }}
                                >
                                    S
                                </div>

                                <div
                                    className={`size-option ${selectedSize === 'M' ? 'selected' : ''}`}
                                    onClick={() => {
                                        handleSizeChange('M');
                                        document.getElementById('quantityBox').style.display = 'flex';
                                    }}
                                >
                                    M
                                </div>

                                <div
                                    className={`size-option ${selectedSize === 'L' ? 'selected' : ''}`}
                                    onClick={() =>{ 
                                        handleSizeChange('L');
                                        document.getElementById('quantityBox').style.display = 'flex';
                                    }}
                                >
                                    L
                                </div>

                                <div
                                    className={`size-option ${selectedSize === 'XL' ? 'selected' : ''}`}
                                    onClick={() => {
                                        handleSizeChange('XL');
                                        document.getElementById('quantityBox').style.display = 'flex';
                                    }}
                                >
                                    XL
                                </div>

                                <div
                                    className={`size-option ${selectedSize === 'XXL' ? 'selected' : ''}`}
                                    onClick={() => {
                                        handleSizeChange('XXL');
                                        document.getElementById('quantityBox').style.display = 'flex';
                                    }}
                                >
                                    XXL
                                </div>

                            </div>
                            <div className='quantity' id='quantityBox' style={{display: 'none'}}>
                                <div className="quantity-btns" onClick={decreaseQuantity} style={{padding: '0 20px', fontSize: '1.5rem'}}> - </div>
                                <div style={{display:'flex', width: '20px', flexDirection: 'column', justifyContent: 'center' , fontSize: '1.5rem'}}> {quantity} </div>
                                <div className="quantity-btns" onClick={increaseQuantity} style={{padding: '0 20px', fontSize: '1.5rem'}}> + </div>
                            </div>
                            {message ? <div style={{color: '#dc2626'}}>{message}</div>: <div></div>}
                            <div className='checkout-btns'>
                                {!addingToCart
                                 ? localStorage.getItem('auth_token') ? <button onClick={addToCart}>Add to Cart</button>
                                 : <Link to='/login'><button onClick={addToCart}>Add to Cart</button></Link>
                                 : <button ><CircularProgress color='inherit' size={14}/></button>
                                }
                                {addMessage}
                                {/* {buyingNow
                                 ? <button ><CircularProgress color='inherit' size={14}/></button>
                                 : <button onClick={buynow}>Buy Now</button>} */}
                                
                            </div>
                        </div>
                        <div>
                            
                            <p>Fabric: {product.fabric}</p>
                            <p>Fit: {product.fit}</p>
                            <p>Length: {product.length}</p>
                            <p>Neck: {product.neck}</p>
                            <p>Pattern: {product.pattern}</p>
                            <p>Pattern Type: {product.patternType}</p>
                            {/* <p>Price: {product.price}</p> */}
                            <p>Sleeve Length: {product.sleeveLength}</p>
                            {/* <p>Sleeve Styling: {product.sleeveStyling}</p> */}
                            <p>Wash Care: {product.washCare}</p>
                            {/* <p>Weave Type: {product.weaveType}</p> */}
                            
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