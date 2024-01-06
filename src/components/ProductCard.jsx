import '../assets/product-card.css'
import FreeDelivery from '/delivery.png'
import Trends from '/trending.png'
import Money from '/money.png'
import tshirt from '/tshirt_abstract.png'

export default function ProductCard(props){
    function closeProduct(event){
        document.getElementById(event.target.id).style.display = "none";
        document.getElementsByTagName("body")[0].style.overflow = "scroll";

    }

    function showProduct(){
        let currentProduct = document.getElementById(`product-description-${props.product.key}`)
        currentProduct.style.display = "block";
        currentProduct.style.top = (window.scrollY + 25) + "px";
        document.getElementsByTagName("body")[0].style.overflow = "hidden";
    }

    return (
        <>
            <div className="card">
                <div id='card-img-div'>
                    <img id='card-img' src={props.product.address}/>
                </div>
                <div id='pricing'>
                    <div id="product-name">{props.product.name}</div>
                    <div>  Rs. {props.product.price} <span id="discount">Rs. {props.product.discount}</span> <button onClick={showProduct} id="btn">Buy Now</button></div>
                </div>

                <div id={`product-description-${props.product.key}`}  className="product-description">
                    <div id="desc-wrap">
                        <div id="desc-left">
                            <img id = 'product-big-picture' src={props.product.address}/>
                        </div>
                        <div id="desc-right">
                            <div id={`product-description-${props.product.key}`} class="big-close-bttn" onClick={closeProduct}>X</div>
                            <p id="big-name"> {props.product.name} </p>
                            <div id="price-desc">
                                <p id="big-price"> Rs. {props.product.price} </p>
                                <p id="big-discount"> Rs. {props.product.discount} </p>

                            </div>
                            <button> Buy Now </button>
                            <table id="big-table">
                                <tr>
                                    <td>
                                        <img src={FreeDelivery}/>
                                    </td>

                                    <td>
                                        <img src={Trends}/>
                                    </td>

                                    <td>
                                        <img src={Money}/>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Free Delivery
                                    </td>

                                    <td>
                                        Latest Trends
                                    </td>

                                    <td>
                                        Secure Payments
                                    </td>
                                </tr>
                            </table>
                            <div id="desc-big">
                                <p><span id="product-desc">Product Description</span></p>
                                <p><span>Fabric:</span> 60% Cotton 40% Polyester</p> 
                                <p><span>Fit Type:</span> Oversized Fit </p> 
                                <p><span>Pattern:</span> Utility Pockets</p> 
                                <p id="care-instructions"><span>Care Instructions:</span> Wash dark colours separately. Machine wash, 
                                gentle cycle. Do not bleach. Tumble dry low. Iron on lowest setting. 
                                Do not scrub or iron on print directly.</p> 
                            </div>
                        </div>
                    </div>
                    

                </div>
            </div>
            
        </>
    )
}