import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import CartItem from "./CartItem.jsx"
import Loading from '../template/Loading.jsx'
import '../../assets/cart.css'

export default function Cart(){

    const [cart, setCart] = useState([]);
    const navigate = useNavigate();
    async function paymentPortal(){
        navigate('/cartcheckout');
    }

    useEffect(()=>{

        async function getCart(){
            let response = await fetch("https://funkyverse-backend.netlify.app/.netlify/functions/api/user/cart/items",{
                method: 'GET',
                headers: {
                    "auth": localStorage.getItem('auth_token')
                }
            })

            let data = await response.json();
            console.log(data);
            setCart(data.cart.map((item,index)=>{
                return <Link  key={index} className='link-component' to={`http://localhost:5173/product?id=${item.product}`}><CartItem product={item} updateCart={getCart}/></Link>
                
            }));
        }

        getCart();
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
            <div id="cart">
                <div className='inter-thin' style={{'width': '90%', 'margin': '0 auto', 'display': 'flex', 'justifyContent': 'space-between'}}> 
                    <h2>Shopping Cart ({cart.length})</h2>
                    {cart.length >= 1 && <button id="checkout-btn" onClick={paymentPortal}>Checkout</button>}
                </div>
                {cart.length === 0 
                    ?
                <div id="empty-cart" className='inter-thin'> 
                    <p> Uh-oh! Your cart is feeling a bit light at the moment.</p>
                    <p>Time to spice up your wardrobe! 🛍️</p> 
                    
                    <Link className="link-component" to="/shop">
                        <button className='cart-shop-button'> Continue Shopping </button>
                    </Link>
                </div>
                
                :
                <div>{cart} </div>
                }
            </div>
        </>
    )
}