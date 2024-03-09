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

import { useSetRecoilState } from 'recoil'
import { username } from './atoms'
import { useEffect } from "react";

function App() {
  const navigate = useNavigate();
  const setUsername = useSetRecoilState(username);


  async function loginWithToken(token){
    let response = await fetch('http://localhost:3000/.netlify/functions/api/user/login', {
      method: 'POST',
      headers: {
        'auth': token
      },
      credentials: 'include'
    });
    
    let data = await response.json();
    console.log(data);
    setUsername(data.username);
    console.log("here")
    if(response.status === 200){
      navigate("/");
    }
    
  }
  
  useEffect(()=>{
    const token = localStorage.getItem('auth_token');
    if(token) loginWithToken(token);
  }, [])

  return (
    <>
      {/* <Suspense> */}
      
        <Routes>
            <Route path='/' element={
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

            <Route path='/shop' element={<>
              <Header/>
              <Shop/>
              <Footer/>
            </>}></Route>

            <Route path='/shop/:productId' element={
              <>
                <Header/>
                <ProductCard/>
                <Footer/>
              </>
            }></Route>

            <Route path='/about' element={<>
              <Header/>
              <About/>
              <Footer/>
            </>}></Route>

            <Route path='/faq' element={<>
              <Header/>
              <Faq/>
              <Footer/>
            </>}></Route>

            <Route path='/contact' element={<>
              <Header/>
              <Contact/>
              <Footer/>
            </>}></Route>

            <Route path='/login' element={<>
              <Header/>
              <Login/>
              <Footer/>
            </>}></Route>

            <Route path='/register' element={<>
              <Header/>
              <Register/>
              <Footer/>
            </>}></Route>

            <Route path='/return' element={<>
              <Header/>
              <Return/>
              <Footer/>
            </>}></Route>

            <Route path='/terms' element={<>
              <Header/>
              <Terms/>
              <Footer/>
            </>}></Route>

            <Route path='/delivery' element={<>
              <Header/>
              <DeliveryPolicy/>
              <Footer/>
            </>}></Route>

            <Route path='/return' element={<>
              <Header/>
              <Return/>
              <Footer/>
            </>}></Route>

            <Route path='/profile' element={<>
              <Header/>
              <Profile/>
              <Footer/>
            </>}></Route>

            <Route path='/cart' element={<>
              <Header/>
              <Cart/>
              <Footer/>
            </>}></Route>


        </Routes>
      
      {/* </Suspense> */}
    </>
  )
}

export default App
