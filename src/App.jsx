import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";

import Header from './components/template/Header'
import Banner from './components/template/Banner'
import Collection from './components/products/Collection'
import Footer from './components/template/Footer'
import Shop from './components/shop/Shop'
import Terms from "./components/policies/Terms";
import DeliveryPolicy from "./components/policies/DeliveryPolicy";
import Return from "./components/policies/Return";
import ProductCard from "./components/products/ProductCard";
import Login from "./components/registration/Login"
import Register from "./components/registration/Register"
import About from "./components/general/About"
import Contact from "./components/general/Contact"
import Faq from "./components/general/Faq"
import AdBannerLeft from "./components/template/AdBannerLeft";
import AdBannerRight from "./components/template/AdBannerRight";
import TagLine from "./components/template/TagLine";
import Profile from "./components/registration/Profile"
import Cart from "./components/shop/Cart"
import ProductDesc from "./components/products/ProductDesc";

import { useRecoilState } from 'recoil'
import { username } from './atoms'
import { useEffect, useCallback } from "react";

function App() {
  const navigate = useNavigate();
  const [_username, setUsername] = useRecoilState(username);


  const loginWithToken = useCallback(async (token)=>{
    let response = await fetch('https://funkyverse-backend.netlify.app/.netlify/functions/api/user/login', {
      method: 'POST',
      headers: {
        'auth': token
      },
      credentials: 'include',
      mode: 'cors'
    });
    
    let data = await response.json();
    setUsername(data.username.split(" ")[0]);
    console.log("here")
    if(response.status === 200){
      navigate("/");
    }
    
  }, [_username]);
  
  useEffect(()=>{
    const token = localStorage.getItem('auth_token');
    if(token) loginWithToken(token);
  }, [])

  return (
    <>
      {/* <Suspense> */}
      
        <Routes>
            <Route path='/' exact element={
              <>
                <Header/>
                <Banner/>
                <Collection color="white" collection="FEATURED"/>
                {/* <TagLine/> */}
                <AdBannerLeft/>
                <Collection color="#F5F6FB" collection="LATEST DROPS"/>
                <AdBannerRight/>
                <Footer/>
              </>
            }></Route>

            <Route path='/shop' exact element={<>
              <Header/>
              <Shop/>
              <Footer/>
            </>}></Route>

            <Route path='/shop/:productId' exact element={
              <>
                <Header/>
                <ProductCard/>
                <Footer/>
              </>
            }></Route>

            <Route path='/about' exact element={<>
              <Header/>
              <About/>
              <Footer/>
            </>}></Route>

            <Route path='/faq' exact element={<>
              <Header/>
              <Faq/>
              <Footer/>
            </>}></Route>

            <Route path='/contact' exact element={<>
              <Header/>
              <Contact/>
              <Footer/>
            </>}></Route>

            <Route path='/login' exact element={<>
              <Header/>
              <Login/>
              <Footer/>
            </>}></Route>

            <Route path='/register' exact element={<>
              <Header/>
              <Register/>
              <Footer/>
            </>}></Route>

            <Route path='/return' exact element={<>
              <Header/>
              <Return/>
              <Footer/>
            </>}></Route>

            <Route path='/terms' exact element={<>
              <Header/>
              <Terms/>
              <Footer/>
            </>}></Route>

            <Route path='/delivery' exact element={<>
              <Header/>
              <DeliveryPolicy/>
              <Footer/>
            </>}></Route>

            <Route path='/return' exact element={<>
              <Header/>
              <Return/>
              <Footer/>
            </>}></Route>

            <Route path='/profile' exact element={<>
              <Header/>
              <Profile/>
              <Footer/>
            </>}></Route>

            <Route path='/cart' exact element={<>
              <Header/>
              <Cart/>
              <Footer/>
            </>}></Route>
            
            <Route path='/product' exact element={<>
              <Header/>
              <ProductDesc/>
              <Footer/>
            </>}></Route>
          
        </Routes>
      
      {/* </Suspense> */}
    </>
  )
}

export default App
