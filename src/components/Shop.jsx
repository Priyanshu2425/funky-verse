import {useState, useEffect} from 'react'
import ProductCard from './ProductCard';
import Data from '../assets/tshirt'
import '../assets/shop.css'

export default function Shop(){
    const [products, setProducts] = useState([]);
    const [priceFilter, setPriceFilter] = useState("");
    const [typeFilter, setTypeFilter] = useState("");

    function closeMenu(){
        let openUpMenu = document.getElementById('openup-menu');
        openUpMenu.style.display = 'none';
        let body = document.getElementsByTagName('body');
        body[0].style.overflow = "scroll";
    }

    let show = false;
    function showSortMenu(){
        if(show_filter){
            let filtermenu = document.getElementById("filter-by-menu");
            filtermenu.style.display = 'none';
            show_filter = false;
        }

        let sortmenu = document.getElementById("sort-by-menu");
        if(show){
            sortmenu.style.display = 'none';
            show = false;
        }else{
            sortmenu.style.display = 'block';
            show = true;
        }
    }

    let show_filter = false;
    function showFilterMenu(){
        let filtermenu = document.getElementById("filter-by-menu");
        if(show){
            let sortmenu = document.getElementById("sort-by-menu");
            sortmenu.style.display = 'none';
            show = false;
        }
        if(show_filter){
            filtermenu.style.display = 'none';
            show_filter = false;
        }else{
            filtermenu.style.display = 'block';
            show_filter = true;
        }
    }

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    function applyFilters(event){
        let filter = event.target.id;
        if(filter === "clear"){
            setPriceFilter("");
            setTypeFilter("");
        }else{
            if(filter === 'low' || filter === 'high'){
                setPriceFilter(filter)
            }else{
                setTypeFilter(filter)
            }
        }       
        
    }

    useEffect(()=>{
        if(priceFilter != ""){
            if(priceFilter === "low"){
                Data.sort((a, b)=>{
                    return a.price - b.price;
                })
            }else{
                Data.sort((a,b)=>{
                    return b.price - a.price;
                })
            }
        }else{
            shuffleArray(Data);
        }

        let data = Data;
        if(typeFilter != ""){
            console.log(typeFilter);
            data = Data.filter((item)=>{
                return item.type === typeFilter;
            })
        }

        
        setProducts(data.map((item)=>{
            return <ProductCard key={item.key} product={item}/>
        }))
    
        
        closeMenu()
    }, [priceFilter, typeFilter])

    return (
        <>
            
            <div className="shop">
                <div id="shop-title"> Shop All</div>
                <div id="shop-filters"> 
                    <div id="sort-by" onClick={showSortMenu} >
                        Sort By Filter
                        <div id="sort-by-menu" className="small-menu">
                            <div onClick={applyFilters} id='low'>Price: Low to High</div>
                            <div onClick={applyFilters} id='high'>Price: High to Low</div>
                        </div>
                    </div>
                    
                    <div onClick={showFilterMenu}>
                        Filter By
                        <div id="filter-by-menu" className="small-menu">
                            <div onClick={applyFilters} id='summer'>T-shirts</div>
                            <div onClick={applyFilters} id='winter'>Sweatshirt & Hoodies</div>
                        </div>
                    </div>

                    <div id="clear" onClick={applyFilters}>
                        Clear Filters
                    </div>
                </div>
                <div id="shop-content">
                    {products}
                </div>
            </div>
        </>
    )
}