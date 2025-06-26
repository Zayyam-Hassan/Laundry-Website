import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Home from './pages/Home/Home';
import OurServices from './pages/OurSevices/OurServices';
import Fabrics from './pages/Fabrics/Fabrics';
import OurProcess from './pages/OurProcess/OurProcess';
import Business from './pages/Business/Business';
import Subscription from './pages/Subscription/Subscription';
import Contact from './pages/Contact/Contact';

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        {/* Home Page */}
        <Route path="/" element={<Home />} />
        
        {/* Main Pages */}
        <Route path="/services" element={<OurServices />} />
        <Route path="/fabrics" element={<Fabrics />} />
        <Route path="/process" element={<OurProcess />} />
        <Route path="/business" element={<Business />} />
        <Route path="/subscription" element={<Subscription />} />
        <Route path="/contact" element={<Contact />} />
        
        {/* Legal Pages */}
        {/* <Route path="/privacy-policy" element={<PrivacyPolicy />} /> */}
        
        {/* 404 Page - Add this if you have one */}
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
      <Footer />
    </div>
  )
}

export default App;