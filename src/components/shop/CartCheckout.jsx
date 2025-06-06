import { useState, useEffect, useRef} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import CartItem from './CartItem';
import '../../assets/cartcheckout.css'
import { CircularProgress } from '@mui/material';
import Loading from '../template/Loading';
import FinalCartItem from '../shop/FinalCartItem'


const url = import.meta.env.VITE_BACKEND_URL;
export default function CartCheckout(){
    const navigate = useNavigate();
    const searchParams = new URLSearchParams(location.search);
    const productId = searchParams.get("productId");
    const productSize = searchParams.get("size");
    const productQuantity = searchParams.get("quantity");

    //display
    const [currentCart, setCurrentCart] = useState("");
    const [userProfile, setUserProfile] = useState("");
    const [originalCartTotal, setOriginalCartTotal] = useState("");
    const [cartTotal, setCartTotal] = useState("");

    //to be sent in body
    const [mobile, setMobile] = useState("");
    const [couponCode, setCouponCode] = useState("");
    const [couponMessage, setCouponMessage] = useState("");
    const [address, setAddress] = useState({
        addressLine: "",
        landmark: "",
        city: "",
        state: "",
        postal: "",
    });
    const [finalAddress, setFinalAddress] = useState("");

    useEffect(()=>{
        const { addressLine, landmark, city, state, postal } = address;
        setFinalAddress(`${addressLine} ${landmark} ${city} ${state} ${postal}`);
    }, [address])

    useEffect(()=>{
        if(couponCode === "FV10"){
            setCartTotal(originalCartTotal - (originalCartTotal * .10));
            setCouponMessage('COUPON APPLIED');
        }else if(couponCode === "NAM15"){
            setCartTotal(originalCartTotal - (originalCartTotal * .15));
            setCouponMessage('COUPON APPLIED');
        }else{
            setCartTotal(originalCartTotal);
        }
    }, [couponCode, originalCartTotal]);

    const [payingOnline, setPayingOnline] = useState(false);
    const [payingOffline, setPayingOffline] = useState(false);

    const [message, setMessage] = useState("");
    function changeCouponCode(event){
        setCouponCode(event.target.value);
    }

    function changeDeliveryAddressWithCheckbox(event){
        if(event.target.checked){
            setAddress(event.target.value);
        }
    }

    function changeDeliveryAddress(event){
        let val = event.target.value;
        let key = event.target.id

        let obj = { ...address }
        obj[key] = val;

        setAddress(obj);
        console.log(obj);
        const radios = document.getElementsByClassName('radios');
        for (let i = 0; i < radios.length; i++) {
            if(radios[i].checked)
                radios[i].checked = false;
        }
    }

    const checkbox = useRef();
    function changeMobileWithCheckbox(event){
        if(event.target.checked)
            setMobile(event.target.value);
    }

    function changeMobile(event){
        setMobile(event.target.value);
        checkbox.current.checked = false;
    }

    async function getUserData(){
        let response = await fetch(`${url}/user/profile`, {
            method: 'GET',
            headers: {
                'auth': localStorage.getItem('auth_token')
            }
        })

        let data = await response.json();
        setUserProfile(data.data);
    }

    async function getCart(){
        let response = await fetch(`${url}/user/cart/items`,{
            method: 'GET',
            headers: {
                "auth": localStorage.getItem('auth_token')
            }
        })

        let data = await response.json();
        setCurrentCart(data.cart.map((item,index)=>{
            return <FinalCartItem key={index} product={item} updateCart={getCart}/>
            
        }));
    }

    async function getCartTotal(){
        let response = await fetch(`${url}/user/cart/cart-total`, {
            method: 'GET',
            headers: {
                'auth': localStorage.getItem('auth_token')
            }
        })

        let data = await response.json();
        setCartTotal(data.cartTotal);
        setOriginalCartTotal(data.cartTotal);
    }

    async function onlinePayment(){
        setPayingOnline(true);
        if(!mobile || !(finalAddress.length > 10)){
            setMessage("Please fill in all the details");
            setTimeout(()=>{
                setMessage("");
            }, 5000);
            setPayingOnline(false);
            return;
        }

        if(mobile.length != 10){
            setMessage("Please enter a valid number.");
            setTimeout(()=>{
                setMessage("");
            }, 5000);
            setPayingOnline(false);
            return;
        }

        let userInfo = {
            'mobile': mobile,
            'address': finalAddress,
            'coupon': couponCode
        }

        if(product){
            userInfo = {
                ...userInfo,
                product: {
                    product: product._id,
                    productName: product.productName,
                    size: productSize,
                    quantity: productQuantity,
                    imageLink1: product.imageLink1,
                    price: originalCartTotal,
                    total_price: originalCartTotal 
                }
            }
        }

        let response = await fetch(`${url}/user/orders/payment/online`, {
            method: 'POST',
            headers: {
                'auth': localStorage.getItem('auth_token'),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userInfo)
        });

        let data = await response.json();
        if(data.url) {
            setPayingOnline(false);
            window.location = data.url;
        }else{
            setPayingOnline(false);
        }
    }

    async function offlinePayment(){
        setPayingOffline(true);
        if(!mobile ||  !(finalAddress.length > 10)){
            setMessage("Please fill in all the details");
            setTimeout(()=>{
                setMessage("");
            }, 5000);
            setPayingOffline(false);
            return;
        }

        if(mobile.length != 10){
            setMessage("Please enter a valid number.");
            setTimeout(()=>{
                setMessage("");
            }, 5000);
            setPayingOffline(false);
            return;
        }

        
        let userInfo = {
            'mobile': mobile,
            'address': finalAddress,
            'coupon': couponCode,
        }

        if(product){
            userInfo = {
                ...userInfo,
                product: {
                    product: product._id,
                    productName: product.productName,
                    size: productSize,
                    quantity: productQuantity,
                    imageLink1: product.imageLink1,
                    price: cartTotal,
                    total_price: cartTotal 
                }
            }
        }

        let response = await fetch(`${url}/user/orders/payment/cash`,{
            method: 'POST',
            headers: {
                'auth': localStorage.getItem('auth_token'),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userInfo)
        })

        let data = await response.json();

        if(response.status === 200){
            if(!localStorage.getItem('auth_token')) navigate('/track-order');
            navigate('/profile');
        }
        setPayingOffline(false);
    }

    const [product, setProduct] = useState('');

    const getProduct = async()=>{
        let response = await fetch(`${url}/products/item/${productId}`,{
            method: 'GET',
            headers: {
                'auth': localStorage.getItem('auth_token')
            }
        })
        let data = await response.json();
        setProduct(data.product[0]);
        setCartTotal(data.product[0].discountPrice * productQuantity);
        setOriginalCartTotal(data.product[0].discountPrice * productQuantity);
        
    }
    

    useEffect(()=>{        
        if(localStorage.getItem('auth_token')){
            
            getUserData();
            if(!productId){
                getCart();
                getCartTotal();
            }else{
                getProduct();
            }
            setLoading(false);
        }else{
            getProduct();
            setLoading(false);
        }

        window.scrollTo(0, 0);
        
    }, [])

    const [loading, setLoading] = useState(true);


    if(loading) return (
        <>
            <Loading/>
        </>
    )
    
    return (
        <>  
            <div id="cart-checkout" className='inter-thin'>
                <div id="user-info">
                    <div id="divs">
                        <div>
                            <p style={{fontSize: "1.2rem"}}>Mobile Number</p>
                            { userProfile && 
                            <div style={{display: "flex", gap:"5px"}}>
                                <input type="checkbox" name="mobile" value={userProfile.mobile} onChange={changeMobileWithCheckbox}
                                    ref={checkbox} 
                                />
                                <span>{userProfile.mobile}</span>
                            </div>}
                        </div>
                        <p>or</p>
                        <input type='Number' min="1000000000"  placeholder='Another number?' onChange={changeMobile} value={mobile}
                            
                        />
                        <div>
                            <p>We'll be calling you on: {mobile} </p>
                        </div>
                    </div>

                    <div id="divs">
                        <p style={{fontSize: "1.2rem"}}>Where to Deliver you order?</p>
                        { userProfile && userProfile.address.map((addr, index)=>{
                            if(addr) return <div key={index}>
                                <input type='radio' name='address' key={index}
                                    value={addr} onChange={changeDeliveryAddressWithCheckbox} 
                                    className='radios'
                                />
                                <span> {addr} </span>
                                <br/>
                                </div>
                            else return <span key={index}></span>
                        })}

                        <p> or </p>
                        <i style={{fontSize: "0.8rem", color: "grey"}}> Recipient name, House number, Street name, Locality (or area), Town/city, State, PIN code</i>
                        <input type='text' placeholder='Address' id="addressLine" onChange={changeDeliveryAddress}/>
                        <input type='text' placeholder='Landmark' id="landmark"  onChange={changeDeliveryAddress}/>
                        <input type='text' placeholder='City' id="city"  onChange={changeDeliveryAddress}/>
                        <input type='text' placeholder='State' id="state" onChange={changeDeliveryAddress}/>
                        <input type='text' placeholder='Postal Code' id="postal"  onChange={changeDeliveryAddress}/>

                        <div>
                            Delivering to: {finalAddress}
                        </div>
                    </div>
                        
                    {/* <div id="divs">
                        {couponMessage ? <div style={{fontSize:'0.7rem', color: '#10B981'}}><b>COUPON APPLIED</b></div> : <div></div>}
                        <input type="text" placeholder='Have a coupon code?' value={couponCode} onChange={changeCouponCode}/>
                        <button id="checkout-button-cart-checkout"> APPLY </button>
                    </div> */}
                </div>

                <div id="cart-info">
                    {productId ? <FinalCartItem product={product} pSize={productSize} pQuantity={productQuantity}/> : currentCart}
                    <div>
                        {message ? <div style={{color: "#dc2626", margin: '0 5%', fontWeight:'500'}}> {message} </div>: <div></div>}
                    </div>
                    {/*<div id="final-price-checkout" className='inter-thin'>
                        <h2>TOTAL : ₹{cartTotal}</h2> 
                        {
                            payingOnline ? 
                            <CircularProgress color="inherit" size={20}/>
                            :<button id="checkout-button-cart-checkout" onClick={onlinePayment}>PAY ONLINE</button>
                        }
                    </div> */}
                    <hr/>
                    <div>
                        <div id="final-price-checkout" className='inter-thin'>
                        <h2>TOTAL : ₹{originalCartTotal + 60}</h2> 
                        
                        <div>
                        {
                            payingOffline?
                            <CircularProgress color="inherit" size={20}/>
                            :
                            <button id="checkout-button-cart-checkout" onClick={offlinePayment}>PAY CASH ON DELIVERY</button>
                        }
                        <br/><br/>
                        <p>+₹60 for cash on delivery</p>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
 
            
        </>
    )
}