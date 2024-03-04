import { BrowserRouter, Routes, Route } from "react-router-dom";
import {useEffect} from "react"

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

function App() {

  return (
    <>
      <BrowserRouter>
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
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
