import {useEffect, useState} from 'react'
import ProductCard from './ProductCard';
import '../assets/collection.css'
import Data from '../assets/tshirt.js'
import '../assets/product-card.css'
export default function Collection(props){

    const [products, setProducts] = useState([]);

    let data;
    if(props.collection === 'Tshirts'){
        data = Data.filter((product)=>{
            return product.type === 'summer'
        })
    }else if(props.collection === 'Hoodies & Sweatshirt'){
        data = Data.filter((product) =>{
            return product.type === 'winter'
        })
    }else{
        data = Data.filter((product) =>{
            return product.type === 'anime'
        })
    }
    
    useEffect(()=>{
        setProducts(data.map((item)=>{
            return <ProductCard key={item.key} product={item}/>
        }))
    }, [])

    return (
        <>
            <section> 
                <div id="collection">
                    <p id="collection-title">{props.collection}</p>
                    
                    <div id="product-showcase">
                        {products}
                    </div>
                    
                </div>
                
            </section>
        </>
    )
}