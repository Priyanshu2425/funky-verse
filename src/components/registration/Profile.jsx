import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import '../../assets/profile.css'
import { grey } from '@mui/material/colors';
import CircularProgress from '@mui/material/CircularProgress';

export default function Profile(){
    const [userProfile, setUserProfile] = useState('');
    const [address, setAddress] = useState('');
    const [addingAddress, setAddingAddress] = useState(false);

    const changeAddress = (event)=>setAddress(event.target.value);

    function addAddress(){
        setAddingAddress(true);

        async function addAddressReq(){
            let response = await fetch("https://funkyverse-backend.netlify.app/.netlify/functions/api/user/profile/add-address",
            {
                method: "POST",
                headers: {
                    "auth": localStorage.getItem('auth_token'),
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({"address": address}),
                credentials: 'include'
            })
            let data = await response.json();
            console.log(data);
        }
        
        addAddressReq();
        getUserData();
        setAddingAddress(false);
    }

    async function getUserData(){
        let response = await fetch("https://funkyverse-backend.netlify.app/.netlify/functions/api/user/profile", {
            method: 'GET',
            headers:{
                'auth': localStorage.getItem('auth_token')
            },
            credentials: 'include'
        })

        let data = await response.json();
        console.log(data);
        setUserProfile(data.data);
    }
    
    useEffect(()=>{
        getUserData();
    }, [])

    return (
        <>
            <div id="profile" className='inter-thin'>
                <div id="profile-info">
                    <p style={{fontSize: "1.2rem", fontWeight: 500}}>{userProfile.name}</p>
                    <p> Email: {userProfile.email}</p>
                    <p> Mobile: {userProfile.mobile}</p>
                    <p> Orders: {userProfile.orders}</p>
                </div>

                <div id="profile-orders">
                    <p style={{fontSize: "1.2rem", fontWeight: 500}}>My orders</p>
                    <Link className='link-component' to='/orders'>View all</Link>
                    {userProfile.orders}
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
            </div>
        </>
    )
}