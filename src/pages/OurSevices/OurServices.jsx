import React from 'react'
import FeatureForAll from '../../components/FeatureForAll/FeatureForAll'
// import {Truck, Star, Shield, Clock} from 'lucide-react'
import { 
  CheckCircle, Shield, Eye, MessageCircle, Gift, Heart, 
  Truck, Star, Calendar, Building2, Award, Users, 
  Sparkles, Clock, ThumbsUp 
} from 'lucide-react';
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'
const OurServices = () => {
  return (
    <div>
        <Navbar/>

      <FeatureForAll
      title="Our Premium Services"
      subtitle="Experience the convenience of subscription-based laundry service with premium quality and professional care for all your garments."
      highlightText="Free Pickup & Delivery Included"
      highlightIcon={Truck}
      showFeatures={false}
      features={[
        {
          icon: Star,
          title: "Premium Quality",
          description: "Professional care with attention to detail for every garment"
        },
        {
          icon: Shield,
          title: "Guaranteed Service",
          description: "100% satisfaction guarantee on all orders with full insurance coverage"
        },
        {
          icon: Clock,
          title: "Fast Turnaround",
          description: "Quick processing with reliable same-day or next-day delivery"
        }
      ]}
    />
    <Footer/>
    </div>
  )
}

export default OurServices
