import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import FeatureForAll from "../../components/FeatureForAll/FeatureForAll";
import CardsSection from "../../components/CardsSection/CardsSection";
import Tracking from "../../components/RealTimeTracking/Tracking";
import CallToAction from "../../components/CallToAction/CallToAction";
import { ArrowRight, CheckCircle, Truck, Clock, Users, Shield, Zap, GraduationCap, Settings,Thermometer,Search,Droplets} from "lucide-react";
const OurProcess = () => {
  const premiumFleetData = {
    title: "Our Premium Fleet",
    subtitle:
      "Professional vehicles and trained drivers ensure reliable, secure service.",
    cards: [
      {
        icon: Truck,
        title: "100+ Vehicles",
        description:
          "Modern, GPS-tracked fleet ensuring reliable pickup and delivery.",
        features: [
          "Late-model vehicles",
          "Real-time GPS tracking",
          "Regular maintenance",
          "Branded for easy identification",
        ],
        variant: "gradient",
      },
      {
        icon: Users,
        title: "Trained Drivers",
        description:
          "Professional, uniformed staff committed to excellent service.",
        features: [
          "Background-checked professionals",
          "Customer service training",
          "Uniformed personnel",
          "Secure handling procedures",
        ],
        variant: "gradient",
      },
      {
        icon: Shield,
        title: "Secure Transport",
        description:
          "Climate-controlled vehicles protect your garments during transport.",
        features: [
          "Temperature-controlled compartments",
          "Separate garment bags",
          "Secure storage systems",
          "Direct route optimization",
        ],
        variant: "gradient",
      },
    ],
  };
  const facilityData = {
    title: "Our State-of-the-Art Facility",
    subtitle:
      "Advanced technology and expert craftsmanship come together in our modern facility.",
    cards: [
      {
        icon: Zap,
        title: "Advanced Sanitization",
        description:
          "Hospital-grade sanitization protocols ensure the highest hygiene standards.",
        features: [
          "Medical-grade disinfectants",
          "UV sterilization where applicable",
          "Anti-microbial treatments",
          "Regular facility deep-cleaning",
        ],
        variant: "glow",
      },
      {
        icon: GraduationCap,
        title: "Expert Staff",
        description:
          "Our team undergoes continuous training in the latest fabric care techniques.",
        features: [
          "Certified fabric care specialists",
          "Monthly training sessions",
          "Master tailors on staff",
          "Specialized stain removal experts",
        ],
        variant: "glow",
      },
      {
        icon: CheckCircle,
        title: "Quality Assurance",
        description: "ISO-certified processes and quality management systems.",
        features: [
          "ISO 9001 certified",
          "Triple-check quality control",
          "Digital tracking of each item",
          "Customer satisfaction metrics",
        ],
        variant: "glow",
      },
      {
        icon: Settings,
        title: "Efficient Operations",
        description:
          "Streamlined workflows ensure consistent turnaround times.",
        features: [
          "Automated sorting systems",
          "Barcode tracking",
          "Optimized workflow paths",
          "Real-time progress tracking",
        ],
        variant: "glow",
      },
    ],
  };
    const trackingFeatures = [
    {
      icon: Droplets,
      title: "Advanced Water Filtration",
      description: "Multi-stage filtration ensures the purest water for optimal cleaning results.",
      color: "text-blue-600"
    },
    {
      icon: Search,
      title: "Digital Tracking System",
      description: "Every garment is tracked from pickup to delivery for complete transparency.",
      color: "text-purple-600"
    },
    {
      icon: Thermometer,
      title: "Climate Control",
      description: "Precise temperature and humidity control for optimal fabric care.",
      color: "text-orange-600"
    }
  ];

  // Order data for the phone mockup on the right side
  const orderTrackingData = {
    currentOrderLabel: "Live Process Tracking",
    status: "In Progress",
    statusColor: "text-green-600",
    orderLabel: "Order",
    orderId: "LDY2024001",
    itemCount: "12",
    itemsLabel: "items",
    progressWidth: "60%", // 60% completion (3 out of 5 steps completed)
    deliveryLabel: "Estimated completion",
    estimatedDelivery: "2 hours"
  };
  return (
    <div>
      <Navbar />
      <FeatureForAll
        title="Behind the Scenes: Our Process"
        subtitle="Discover the meticulous care and attention that goes into every step of our premium laundry service. From pickup to delivery, we ensure excellence at every stage."
        highlightText="Transparency in Every Step"
        highlightIcon={CheckCircle}
        showFeatures={false}
        features={[
          {
            icon: Truck,
            title: "Professional Pickup",
            description:
              "Scheduled collection with detailed inventory and special handling instructions",
          },
          {
            icon: Shield,
            title: "Quality Processing",
            description:
              "Multi-stage cleaning process with quality checks at every step",
          },
          {
            icon: Clock,
            title: "Timely Delivery",
            description:
              "On-time delivery with real-time tracking and delivery confirmation",
          },
        ]}
      />
      <CardsSection
        title={facilityData.title}
        subtitle={facilityData.subtitle}
        cards={facilityData.cards}
        gridCols="4" // Shows as 4-column grid on larger screens
      />
      <Tracking
      title="Technology Meets Tradition"
      subtitle="We combine cutting-edge technology with time-honored craftsmanship to deliver unparalleled results for your garments."
      features={trackingFeatures}
      orderData={orderTrackingData}
      backgroundColor="bg-gray-50"
      phoneCardColor="bg-gradient-to-br from-indigo-900 via-blue-900 to-purple-900"
    />
      <CardsSection
        title={premiumFleetData.title}
        subtitle={premiumFleetData.subtitle}
        cards={premiumFleetData.cards}
        gridCols="3" // Shows as 3-column grid on larger screens
      />
      <CallToAction
        headline="Experience Our Premium Process"
        description="Ready to see the difference our meticulous process makes? Schedule your first pickup today."
        primaryButton={{
          text: "Schedule Pickup",
          link: "/schedule-pickup",
          Icon: ArrowRight,
        }}
        secondaryButton={{
          text: "Learn More",
          link: "/learn-more",
        }}
      />
      <Footer />
    </div>
  );
};

export default OurProcess;
