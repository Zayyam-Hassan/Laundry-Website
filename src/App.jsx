import React from 'react'
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Home from './pages/Home/Home';
import PrivacyPolicy from './pages/PrivacyPolicy/Privacy';
import PricingPlans from './components/PricingPlans/Pricing';
import BusinessProposalForm from './components/BusinessProposal/proposal';
import FindOurLocation from './components/LocateUs/location';
import PickupScheduleForm from './components/SubscribeNow/Subscribe';
import OurServices from './pages/OurSevices/OurServices';
const App = () => {
  

  return (
    <div>
      {/* <PickupScheduleForm/> */}
      {/* <Home/> */}
      <OurServices/>
    </div>
  )
}

export default App
