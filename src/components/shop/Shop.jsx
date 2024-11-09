import {useState, useEffect, useCallback} from 'react'
import ProductCard from '../products/ProductCard';
import Loading from '../template/Loading';
import '../../assets/shop.css'


const url = import.meta.env.VITE_BACKEND_URL;
export default function Shop(){
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState([]);

    useEffect(()=>{
        async function getProducts(){
            let response = await fetch(`${url}/products`, {
                method: "GET"
            });

            let data = await response.json();

            setProducts(data.products.map((item)=>{
                setLoading(false)
                return <ProductCard key={item._id} product={item} />
            }));
        }   

        getProducts();
        // setProducts(data.map((item)=>{
        //     return <ProductCard key={item.key} product={item}/>
        // }))

        window.scrollTo(0, 0);
    }, [])

    if(loading) return (
        <>
            <Loading/>
        </>
    )
    return (
        <>
            <div className="shop">  
                <div id="shop-content">
                    {products}
                </div>
            </div>
        </>
    )
}