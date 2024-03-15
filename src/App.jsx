import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { useEffect } from 'react'

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



function App() {

  useEffect(()=>{
    console.log("app is reloading");
  })

  return (
    <>
      {/* <Suspense> */}
      
        <Header/>
        <Routes>
            <Route path='/' exact element={
              <>
                <Banner/>
                <Collection color="white" collection="FEATURED"/>
                {/* <TagLine/> */}
                <AdBannerLeft/>
                <Collection color="#F5F6FB" collection="LATEST DROPS"/>
                <AdBannerRight/>
              </>
            }></Route>

            <Route path='/shop' exact element={<>
              <Shop/>
            </>}></Route>

            <Route path='/shop/:productId' exact element={
              <>
                <ProductCard/>
              </>
            }></Route>

            <Route path='/about' exact element={<>
              <About/>
            </>}></Route>

            <Route path='/faq' exact element={<>
              <Faq/>
            </>}></Route>

            <Route path='/contact' exact element={<>
              <Contact/>
            </>}></Route>

            <Route path='/login' exact element={<>
              <Login/>
            </>}></Route>

            <Route path='/register' exact element={<>
              <Register/>
            </>}></Route>

            <Route path='/return' exact element={<>
              <Return/>
            </>}></Route>

            <Route path='/terms' exact element={<>
              <Terms/>
            </>}></Route>

            <Route path='/delivery' exact element={<>
              <DeliveryPolicy/>
            </>}></Route>

            <Route path='/profile' exact element={<>
              <Profile/>
            </>}></Route>

            <Route path='/cart' exact element={<>
              <Cart/>
            </>}></Route>
            
            <Route path='/product' exact element={<>
              <ProductDesc/>
            </>}></Route>
          
        </Routes>
      <Footer/>
      {/* </Suspense> */}
    </>
  )
}

export default App
