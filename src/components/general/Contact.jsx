import ContactUs from '/contactus.jpg.jpg'
import '../../assets/contact.css'
export default function Contact(){
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
                    <h3 className='inter-thin'>Email: thefunkyverse@gmail.com</h3>

                    <h3 className='inter-thin'>Instagram: the_funkyverse</h3>
                </div>
            </div>
        </>
    )
}