import { useState } from 'react'
import '../../assets/cart.css'

export default function CartItem(props){


    return (
        <>
            <div className="inter-thin cart-item">
                <div>
                    <div> <img className="cart-item-img" src={props.product.imageLink1}/> </div>
                    <div className="cart-item-info">
                        <div className='cart-item-productName font-weight-300'> {props.product.productName} </div>
                        <div className='cart-item-discountPrice font-weight-300'> ₹{ props.product.discountPrice || props.product.price }</div>
                        <div className='cart-item-size'> Size: {props.product.size || props.pSize}</div>
                        <div className='cart-item-quantity'> 
                            Quantity: <span></span> {props.product.quantity || props.pQuantity} <span></span> </div>
                        </div>
                        
                        
                </div>
                {/* <div className='font-weight-300'>
                    <div>₹{props.product.total_price}</div>
                </div> */}
            </div>

        </>
    )
}