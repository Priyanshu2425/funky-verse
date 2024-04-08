import { useState, useEffect } from 'react'
import DeliveryPolicy from '../policies/DeliveryPolicy'
import Return from '../policies/Return'
import Terms from '../policies/Terms'
import Loading from '../template/Loading';
export default function Faq(){
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
            <div id="Faq">
                <DeliveryPolicy/>
                <Return/>
                <Terms/>
            </div>
        </>
    )
}