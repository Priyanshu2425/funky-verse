import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import '../../assets/profile.css'
import { grey } from '@mui/material/colors';
import CircularProgress from '@mui/material/CircularProgress';
import Order from './Order';
import Loading from '../template/Loading';
import OrderPlacedIcon from '/orderplaced.png'

const url = import.meta.env.VITE_BACKEND_URL;
export default function Profile(){
    const [userProfile, setUserProfile] = useState('');
    const [address, setAddress] = useState('');
    const [addingAddress, setAddingAddress] = useState(false);

    const changeAddress = (event)=>setAddress(event.target.value);

    function addAddress(){
        setAddingAddress(true);

        async function addAddressReq(){
            let response = await fetch(`${url}/user/profile/add-address`,
            {
                method: "POST",
                headers: {
                    "auth": localStorage.getItem('auth_token'),
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({"address": address})
            })
            let data = await response.json();
        }
        
        addAddressReq();
        getUserData();
        setAddingAddress(false);
    }

    async function getUserData(){
        let response = await fetch(`${url}/user/profile`, {
            method: 'GET',
            headers:{
                'auth': localStorage.getItem('auth_token')
            }
        })

        let data = await response.json();
        setUserProfile(data.data);
    }
    
    useEffect(()=>{
        getUserData();
        setTimeout(()=>{
            setOrderPlacedScreen(false);
        }, 4000);
    }, [])
    const [orderPlacedScreen, setOrderPlacedScreen] = useState(true);

    
    if(!userProfile) return <Loading/>
    return (
        <>  
            {orderPlacedScreen ? 
                <div style={{position: 'absolute', height: '100%', width: '100%', 
                backgroundColor: 'white', top: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems:'center', gap: '50px', textAlign:'center', fontSize: '1.2rem'}}>
                    <div className='inter-thin'>ORDER PLACED</div>
                    <img style={{width: '150px'}} src={OrderPlacedIcon}/>
                    <div className='inter-thin'>THANK YOU FOR ORDERING</div>
                </div> : <div></div>}
            <div id="profile" className='inter-thin'>
                <div id="profile-info">
                    <p style={{fontSize: "1.2rem", fontWeight: 500}}>{userProfile.name}</p>
                    <p> Email: {userProfile.email}</p>
                    <p> Mobile: {userProfile.mobile}</p>
                    <p> Orders: {userProfile.orders.length}</p>
                </div>

                <div id="profile-addresses">
                    <p style={{fontSize: "1.2rem", fontWeight: 500}}>Addresses</p>
                    
                    { userProfile ? userProfile.address.map((item, index)=>{
                        return <p key={index}>{item}</p>
                    }): <p></p>}
                    <div id="profile-add-address">
                        <i style={{fontSize: "0.8rem", color: grey}}> Recipient name, House number, Street name, Locality (or area), Town/city, State, PIN code</i>
                        
                        <input style={{padding: '10px 5px'}} type='text' onChange={changeAddress} placeholder='Enter Address'/>
                        {
                            addingAddress ?
                            <button style={{backgroundColor: "black", color: "white", height: "39px"}}><CircularProgress size={20} color="inherit"/></button>
                            :
                            <button id="add-address-button" onClick={addAddress}>Add address </button>
                        }
                    </div>
                    <p></p>
                </div>

                <div id="profile-orders">
                    <p style={{fontSize: "1.2rem", fontWeight: 500}}>My orders</p>
                    <Link className='link-component' to='/orders'>View all</Link>
                    {userProfile.orders.length}
                    {userProfile.orders.reverse().map((item, index)=>{
                        return <Order key={index} order={item}/>
                    })}
                </div>
            </div>
        </>
    )
}