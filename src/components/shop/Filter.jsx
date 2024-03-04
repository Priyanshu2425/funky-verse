export default function Filter(){
    const [priceFilter, setPriceFilter] = useState("");
    const [typeFilter, setTypeFilter] = useState("");


    //  function applyFilters(event){
    //     let filter = event.target.id;
    //     if(filter === "clear"){
    //         setPriceFilter("");
    //         setTypeFilter("");
    //     }else{
    //         if(filter === 'low' || filter === 'high'){
    //             setPriceFilter(filter)
    //         }else{
    //             setTypeFilter(filter)
    //         }
    //     }       

    // }


    
    // let show = false;
    // function showSortMenu(){
    //     if(show_filter){
    //         let filtermenu = document.getElementById("filter-by-menu");
    //         filtermenu.style.display = 'none';
    //         show_filter = false;
    //     }

    //     let sortmenu = document.getElementById("sort-by-menu");
    //     if(show){
    //         sortmenu.style.display = 'none';
    //         show = false;
    //     }else{
    //         sortmenu.style.display = 'block';
    //         show = true;
    //     }
    // }

    // let show_filter = false;
    // function showFilterMenu(){
    //     let filtermenu = document.getElementById("filter-by-menu");
    //     if(show){
    //         let sortmenu = document.getElementById("sort-by-menu");
    //         sortmenu.style.display = 'none';
    //         show = false;
    //     }
    //     if(show_filter){
    //         filtermenu.style.display = 'none';
    //         show_filter = false;
    //     }else{
    //         filtermenu.style.display = 'block';
    //         show_filter = true;
    //     }
    }


    return (
        <>
            <h1> Filter</h1>
        </>
    )
}