import { useState } from 'react'
import { Link } from 'react-router-dom'
import '../../assets/cart.css'

export default function CartItem(props){
    async function removeFromCart(){

        let response = await fetch("https://funkyverse-backend.netlify.app/.netlify/functions/api/user/cart/remove",{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
                'auth': localStorage.getItem('auth_token')
            },
            body: JSON.stringify(props.product),
            cors: 'no-cors'
        })

        let data = await response.json();
        props.updateCart();
    }

    return (
        <>
            <div className="inter-thin cart-item">
                <div>
                    <Link className='link-component' to={`http://thefunkyverse.com/product?id=${props.product.product}`}>
                        <div> <img className="cart-item-img" src={props.product.imageLink1}/> </div>
                    </Link> 

                    <div className="cart-item-info">
                        <Link className='link-component' to={`http://thefunkyverse.com/product?id=${props.product.product}`}>
                            <div className='cart-item-productName font-weight-300'> {props.product.productName} </div>
                            <div className='cart-item-discountPrice font-weight-300'> ₹{props.product.price}</div>
                            <div className='cart-item-size'> Size: {props.product.size}</div>
                            <div className='cart-item-quantity'> 
                                Quantity: <span></span> {props.product.quantity} <span></span>
                            </div>
                        </Link>
                    </div>
                    <button onClick={removeFromCart} className='cart-item-remove'>Delete</button>
                </div>
                <div className='font-weight-300'>
                    <div>₹{props.product.total_price}</div>
                </div>
            </div>

        </>
    )
}