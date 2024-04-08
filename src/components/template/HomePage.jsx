import { useEffect, useState } from 'react'
import Banner from "./Banner"
import Collection from "../products/Collection"
import AdBannerRight from "./AdBannerRight"
import AdBannerLeft from "./AdBannerLeft"
import Loading from "./Loading";


export default function HomePage(){
    const [loading, setLoading] = useState(true);


    useEffect(()=>{
        setTimeout(()=>{
            setLoading(false);
        }, 2000);
    })

    if(loading) return (
        <>
            <Loading/>
        </>
    )

    return (
        <>  
            <Banner/>
            <Collection color="white" collection="TOP SELLERS"/>
            <AdBannerRight/>

            <Collection color="white" collection="FEATURED"/>
            {/* <TagLine/> */}
            <AdBannerLeft/>
            <Collection color="#F5F6FB" collection="LATEST DROPS"/>
        </>
    )
    
}