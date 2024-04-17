import { useState, useEffect, useRef} from 'react'
import { useNavigate } from 'react-router-dom'
import CartItem from './CartItem';
import '../../assets/cartcheckout.css'
import { CircularProgress } from '@mui/material';
import Loading from '../template/Loading';
import FinalCartItem from '../shop/FinalCartItem'

export default function CartCheckout(){
    const navigate = useNavigate();
    //display
    const [currentCart, setCurrentCart] = useState("");
    const [userProfile, setUserProfile] = useState("");
    const [originalCartTotal, setOriginalCartTotal] = useState("");
    const [cartTotal, setCartTotal] = useState("");

    //to be sent in body
    const [mobile, setMobile] = useState("");
    const [address, setAddress] = useState("");
    const [couponCode, setCouponCode] = useState("");
    const [couponMessage, setCouponMessage] = useState("");
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
        setAddress(event.target.value);
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
        let response = await fetch("https://funkyverse-backend.netlify.app/.netlify/functions/api/user/profile", {
            method: 'GET',
            headers: {
                'auth': localStorage.getItem('auth_token')
            }
        })

        let data = await response.json();
        setUserProfile(data.data);
    }

    async function getCart(){
        let response = await fetch("https://funkyverse-backend.netlify.app/.netlify/functions/api/user/cart/items",{
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
        let response = await fetch('https://funkyverse-backend.netlify.app/.netlify/functions/api/user/cart/cart-total', {
            method: 'GET',
            headers: {
                'auth': localStorage.getItem('auth_token')
            }
        })

        let data = await response.json();
        setCartTotal(data.cartTotal);
        setOriginalCartTotal(data.cartTotal);
    }

    // async function verifyCouponCode(){
    //     // Implement this
    // }

    async function onlinePayment(){
        setPayingOnline(true);
        if(!mobile || !address){
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
            'address': address,
            'coupon': couponCode
        }

        let response = await fetch('https://funkyverse-backend.netlify.app/.netlify/functions/api/user/orders/payment/online', {
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
        if(!mobile || !address){
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
            'address': address,
            'coupon': couponCode
        }

        let response = await fetch('https://funkyverse-backend.netlify.app/.netlify/functions/api/user/orders/payment/cash',{
            method: 'POST',
            headers: {
                'auth': localStorage.getItem('auth_token'),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userInfo)
        })

        let data = await response.json();
        if(response.status === 200){
            navigate('/profile');
        }
        setPayingOffline(false);
    }
    
    useEffect(()=>{
        getCart();
        getUserData();
        getCartTotal();
        window.scrollTo(0, 0);
        setTimeout(()=>{
            setLoading(false);
        }, 2000);
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
                        <input type='text' placeholder='Deliver to another address?' value={address} onChange={changeDeliveryAddress}/>
                    

                        <div>
                            Delivering to: {address}
                        </div>
                    </div>
                        
                    <div id="divs">
                        {couponMessage ? <div style={{fontSize:'0.7rem', color: '#10B981'}}><b>COUPON APPLIED</b></div> : <div></div>}
                        <input type="text" placeholder='Have a coupon code?' value={couponCode} onChange={changeCouponCode}/>
                        <button id="checkout-button-cart-checkout"> APPLY </button>
                    </div>
                </div>

                <div id="cart-info">
                    {currentCart}
                    <div>
                        {message ? <div style={{color: "#dc2626", margin: '0 5%', fontWeight:'500'}}> {message} </div>: <div></div>}
                    </div>
                    <div id="final-price-checkout" className='inter-thin'>
                        <h2>TOTAL : ₹{cartTotal}</h2> 
                        {
                            payingOnline ? 
                            <CircularProgress color="inherit" size={20}/>
                            :<button id="checkout-button-cart-checkout" onClick={onlinePayment}>PAY ONLINE</button>
                        }
                    </div>
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