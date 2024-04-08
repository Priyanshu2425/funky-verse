import { useState, useEffect } from 'react'
import ContactUs from '/contactus.jpg.jpg'
import '../../assets/contact.css'
import Loading from '../template/Loading';
import InstagramLogo from "/instagram.png"

export default function Contact(){

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
            <div id="contact">
                <div style={{padding: '1%'}}>
                    <h1 className='inter-thin'> Contact Us </h1>
                    <br/><br/>
                    <h4 className='inter-thin'>
                        Hello there! Welcome to our online store! We're here to make your shopping experience as smooth and enjoyable as possible. Whether you need assistance with finding the perfect product, navigating our website, or any other questions you may have, don't hesitate to reach out. Our team is dedicated to helping you every step of the way. Happy shopping!"
                    </h4>
                    <br/><br/>
                    <img src={ContactUs}/>  
                    <br/><br/>
                    <h3 className='inter-thin'>Email: funkyverse3@gmail.com</h3>

                    <h3 className='inter-thin'>
                    Instagram: <a href="https://www.instagram.com/the_funkyverse/" style={{textDecoration: 'none', color: 'black', cursor: 'black'}}>    
                        the_funkyverse
						</a></h3>
                </div>
            </div>
        </>
    )
}