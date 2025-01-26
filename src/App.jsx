import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './Dashboard';
import Collection from './pages/Collection';
import Contact from './pages/Contact'; // Corrected import for Contact
import Cart from './pages/Cart';
import Llogin from './pages/Llogin';
import Placeorder from './pages/Placeorder';
import Orders from './pages/Orders';
import Navbar from './components/Navbar';
import Home from './pages/Home'; // Added import for Home
import About from './pages/About'; // Added import for About
import Product from './pages/Products'; // Added import for Product

function App() {
  return (
    <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
      <Navbar />
      <Routes>
        <Route path='/home' element={<Home />} />
        <Route path="/collection" element={<Collection />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/product/:productId' element={<Product />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/llogin' element={<Llogin />} />
        <Route path='/place-order' element={<Placeorder />} />
        <Route path='/orders' element={<Orders />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  );
}

export default App;
