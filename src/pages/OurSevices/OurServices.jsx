import React from "react";
import FeatureForAll from "../../components/FeatureForAll/FeatureForAll";
import CardsSection from "../../components/CardsSection/CardsSection";
import ProcessSteps from "../../components/ProcessSteps/ProcessSteps";
import PricingPlans from "../../components/PricingPlans/Pricing";
// import {Truck, Star, Shield, Clock} from 'lucide-react'
import {
  CheckCircle,
  Shield,
  Eye,
  MessageCircle,
  Gift,
  Heart,
  Truck,
  Star,
  Calendar,
  Building2,
  Award,
  Users,
  Sparkles,
  Clock,
  ThumbsUp,
  Shirt,
  Bus,
  ArrowRight,
} from "lucide-react";
const OurServices = () => {
  const servicesData = {
    title: "Comprehensive Laundry Solutions",
    subtitle:
      "From everyday essentials to luxury garments, we provide expert care for all your laundry needs.",
    cards: [
      {
        icon: Shirt,
        title: "Wash & Fold",
        description:
          "Professional washing and careful folding of your everyday garments with premium detergents.",
        features: [
          "Eco-friendly detergents",
          "Fabric-specific care",
          "Neat folding",
          "Fresh scent",
        ],
        variant: "gradient",
      },
      {
        icon: Sparkles,
        title: "Dry Cleaning",
        description:
          "Expert dry cleaning for delicate fabrics and special garments that require gentle care.",
        features: [
          "Delicate fabric care",
          "Stain removal",
          "Professional pressing",
          "Protective packaging",
        ],
        variant: "glow",
      },
      {
        icon: Bus,
        title: "Premium Ironing",
        description:
          "Crisp, professional ironing that gives your clothes a polished, fresh-from-the-store look.",
        features: [
          "Professional pressing",
          "Wrinkle-free finish",
          "Hanger service",
          "Fresh scent",
        ],
        variant: "gradient",
      },
      {
        icon: Heart,
        title: "Special Care",
        description:
          "Specialized treatment for delicate items, luxury fabrics, and garments with special requirements.",
        features: [
          "Hand washing option",
          "Luxury fabric care",
          "Custom treatment",
          "Attention to detail",
        ],
        variant: "glow",
      },
    ],
  };
const OurServicesSteps = 
    {
      title: "How It Works",
      subtitle: "Experience the future of premium laundry care with our revolutionary process.",
      steps: [
        { title: "Schedule Pickup", description: "Book a convenient pickup time through our app or website.", icon: Calendar },
        { title: "Professional Collection", description: "Our uniformed staff collects your laundry with care and professionalism.", icon: Truck },
        { title: "Expert Cleaning", description: "Your items receive premium treatment at our state-of-the-art facility.", icon: Sparkles },
        { title: "Quality Check", description: "Each item undergoes thorough quality inspection before packaging.", icon: CheckCircle },
        { title: "Fresh Delivery", description: "Your clean, fresh laundry is delivered right to your doorstep.", icon: ArrowRight }
      ],
      theme: 'ocean'
    };

  return (
    <div>
      <FeatureForAll
        title="Our Premium Services"
        subtitle="Experience the convenience of subscription-based laundry service with premium quality and professional care for all your garments."
        highlightText="Free Pickup & Delivery Included"
        highlightIcon={Truck}
        showFeatures={true}
        features={[
          {
            icon: Star,
            title: "Premium Quality",
            description:
              "Professional care with attention to detail for every garment",
          },
          {
            icon: Shield,
            title: "Guaranteed Service",
            description:
              "100% satisfaction guarantee on all orders with full insurance coverage",
          },
          {
            icon: Clock,
            title: "Fast Turnaround",
            description:
              "Quick processing with reliable same-day or next-day delivery",
          },
        ]}
      />
      <CardsSection
        title={servicesData.title}
        subtitle={servicesData.subtitle}
        cards={servicesData.cards}
        
      />
       <ProcessSteps
        title={OurServicesSteps.title}
        subtitle={OurServicesSteps.subtitle}
        steps={OurServicesSteps.steps}
        theme="ocean"
      />
      <PricingPlans/>
    </div>
  );
};

export default OurServices;
  
