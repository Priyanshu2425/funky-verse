import { BrowserRouter, Routes, Route } from "react-router-dom";
import {useEffect} from "react"

import Header from './components/Header'
import Banner from './components/Banner'
import Collection from './components/Collection'
import Footer from './components/Footer'
import Shop from './components/Shop'

function App() {
  

  return (
    <>
      <BrowserRouter>
        <Routes>
            <Route path='/' element={
              <>
                <Header/>
                <Banner/>
                <Collection color="white" collection="Tshirts"/>
                <Collection color="#F5F6FB" collection="Hoodies & Sweatshirt"/>
                <Footer/>
              </>
            }></Route>
            <Route path='/shop' element={<>
              <Header/>
              <Shop/>
              <Footer/>
            </>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
