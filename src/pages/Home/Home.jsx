import React from "react";
import Feature from "../../components/Feature/Feature";
import CallToAction from "../../components/CallToAction/CallToAction";
import TestimonialsSection from "../../components/TestimonialSection/TestimonialsSection";
import {
  ArrowRight,
  Download,
  Phone,
  Clock,
  CheckCircle,
  FileText,
  Star,
  Shield,
  Shirt,
  Sparkles,
  Thermometer,
  Wind,
  Hand,
} from "lucide-react";
import Statistics from "../../components/Statistics/Statistics";
import Tracking from "../../components/RealTimeTracking/Tracking";
import Experience from "../../components/Experience/Experience";
import CardsSection from "../../components/CardsSection/CardsSection";

const Home = () => {
  const whyChooseData = {
    title: "Why Choose FarrariGo?",
    subtitle:
      "Experience the difference of premium laundry service designed for the modern lifestyle.",
    cards: [
      {
        icon: Star,
        title: "Premium Quality",
        description:
          "Expert care for all your garments with premium cleaning solutions and techniques.",
        variant: "gradient",
      },
      {
        icon: Clock,
        title: "Convenient Scheduling",
        description:
          "Flexible pickup and delivery times that work with your busy lifestyle.",
        variant: "glow",
      },
      {
        icon: Shield,
        title: "Trusted Service",
        description:
          "Reliable, insured service with a satisfaction guarantee on every order.",
        variant: "neon",
      },
    ],
  };

  const heroTheme = {
    bgColor: "bg-[linear-gradient(135deg,#0f172a_0%,#1e1b4b_25%,#312e81_50%,#1e1b4b_75%,#0f172a_100%)]", // Much darker, more dramatic gradient
    titleColor: "text-white",
    subtitleColor: "text-gray-300",
    featureNumberBg: "bg-yellow-400",
    featureNumberColor: "text-black",
    featureTitleColor: "text-white",
    featureDescriptionColor: "text-gray-300",
    primaryButtonBg: "bg-yellow-400",
    primaryButtonText: "text-black",
    primaryButtonHover: "hover:bg-yellow-500",
    secondaryButtonBg: "bg-transparent",
    secondaryButtonText: "text-white",
    secondaryButtonBorder: "border-white",
    secondaryButtonHover: "hover:bg-white hover:text-gray-900",
  };

  
  return (
    <div>
      <Feature
        layout="hero"
        title="Luxury Laundry. Effortlessly Delivered."
        subtitle="FarrariGo is Kuwait's first premium, subscription-based laundry service. Elegant care. Exceptional convenience."
        buttons={[
          {
            text: "Book Now",
            variant: "primary",
            icon: ArrowRight,
          },
          {
            text: "How It Works",
            variant: "secondary",
          },
        ]}
        image={{
          src: "https://images.pexels.com/photos/6195125/pexels-photo-6195125.jpeg?auto=compress&cs=tinysrgb&w=600&h=800&fit=crop",
          alt: "Professional cleaning crew",
        }}
        stat={{
          label: "Premium Quality",
          value: "Guaranteed Excellence",
        }}
        theme={heroTheme}
      />
      <Statistics />
      <Tracking
        title="Manage Everything from Your Phone"
        subtitle="Our intuitive app puts complete control at your fingertips. Track orders, schedule pickups, and manage your account with ease."
        features={[
          {
            icon: FileText,
            title: "Real-Time Tracking",
            description:
              "Follow your order from pickup to delivery with live updates and notifications.",
            color: "text-yellow-500",
          },
          {
            icon: Clock,
            title: "Flexible Scheduling",
            description:
              "Book pickups and deliveries that fit your schedule, with same-day options available.",
            color: "text-yellow-500",
          },
          {
            icon: CheckCircle,
            title: "Special Instructions",
            description:
              "Add custom care instructions for delicate items or specific preferences.",
            color: "text-yellow-500",
          },
        ]}
        orderData={{
          currentOrderLabel: "Current Order",
          orderLabel: "Order",
          orderId: "FG2024001",
          status: "In Progress",
          statusColor: "text-green-500",
          itemCount: 15,
          itemsLabel: "items",
          estimatedDelivery: "Tomorrow, 2:00 PM",
          deliveryLabel: "Estimated delivery",
          progressWidth: "65%",
        }}
        backgroundColor="bg-gray-50"
        phoneCardColor="bg-gradient-to-br from-indigo-900 via-blue-900 to-purple-900"
      />
      <Experience />
      <CardsSection 
        title={whyChooseData.title} 
        subtitle={whyChooseData.subtitle} 
        cards={whyChooseData.cards} 
      />
      <TestimonialsSection />
      <CallToAction
        headline="Ready to Experience Premium Laundry Care?"
        description="Join thousands of satisfied customers who have made the switch to convenient, luxury laundry service."
        primaryButton={{
          text: "Start Your Subscription",
          link: "/subscription",
        }}
        secondaryButton={{
          text: "Contact Us",
          link: "/contact",
        }}
      />
    </div>
  );
};

export default Home;