import {useEffect, useState} from 'react'
import ProductCard from './ProductCard.jsx';

import '../../assets/collection.css'

export default function Collection(props){

    const [products, setProducts] = useState([]);

    
    useEffect(()=>{
        
        async function getProducts(){
            let response = await fetch(" https://funkyverse-backend.netlify.app/.netlify/functions/api/products", {
                method: "GET"
            });

            let data = await response.json();
            let selected = [];
            let toSelect = 3;
            while(toSelect){
                let i = Math.floor(Math.random()*data.products.length);
                selected.push(i);
                toSelect--;
            }

            setProducts(data.products.filter((item, index)=>{
                if(selected.indexOf(index) >= 0) return item;
            }).map((item)=>{
                return <ProductCard key={item._id} product={item}/>
            }) )
        }

        getProducts();

        // setProducts(data.map((item)=>{
        //     return <ProductCard key={item.key} product={item}/>
        // }))

        window.scrollTo(0, 0);
    }, [])

    return (
        <>
            <div id="collection">
                <p id="collection-title" className='inter-thin'>{props.collection}</p>
                
                <div id="product-showcase">
                    {products}
                </div>
                
            </div>
                
        </>
    )
}