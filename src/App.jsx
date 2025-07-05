import React, { useEffect } from 'react';
import { Routes, Route, Outlet, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Home from './pages/Home/Home';
import OurServices from './pages/OurSevices/OurServices';
import Fabrics from './pages/Fabrics/Fabrics';
import OurProcess from './pages/OurProcess/OurProcess';
import Business from './pages/Business/Business';
import Subscription from './pages/Subscription/Subscription';
import Contact from './pages/Contact/Contact';
import GiftCard from './pages/GiftCard/GiftCard';
import PrivacyPolicy from './pages/PrivacyPolicy/Privacy';
import BookingPage from './components/BookingPage/BookingPage';
const MainLayout = () => (
  <>
    <Navbar />
    <Outlet />
    <Footer />
  </>
);

const NoLayout = () => <Outlet />;

// ✅ Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const App = () => {
  return (
    <>
      <ScrollToTop />
      <Routes>
        {/* Routes with Navbar + Footer */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<OurServices />} />
          <Route path="/fabrics" element={<Fabrics />} />
          <Route path="/process" element={<OurProcess />} />
          <Route path="/business" element={<Business />} />
          <Route path="/subscription" element={<Subscription />} />
          <Route path="/contact" element={<Contact />} />
          {/* <Route path="/giftcards" element={<GiftCard />} /> */}
          <Route path="/booking" element={<BookingPage/>}/>
        </Route>

        {/* Routes without Navbar + Footer */}
        <Route element={<NoLayout />}>
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        </Route>

        {/* Optional 404 */}
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </>
  );
};

export default App;
