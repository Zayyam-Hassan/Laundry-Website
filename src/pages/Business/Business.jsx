import React from 'react'
import CallToAction from '../../components/CallToAction/CallToAction'
import FeatureForAll from '../../components/FeatureForAll/FeatureForAll'
import BusinessProposalForm from '../../components/BusinessProposal/proposal'
import { Hotel, Scissors, Dumbbell, HeartPulse, Briefcase,CheckCircle,Building2,Award,Users,User, Calendar,ArrowRight, Phone } from 'lucide-react';
import CardsSection from '../../components/CardsSection/CardsSection'
const Business = () => {
     const industriesData = {
  title: "Industries We Serve",
  subtitle: "Specialized laundry solutions tailored to meet the unique needs of different business sectors.",
  cards: [
    {
      icon: Hotel,
      title: "Hotels & Hospitality",
      description: "Complete linen and uniform services for hotels, restaurants, and hospitality businesses.",
      features: [
        "Bulk pricing",
        "Daily pickup/delivery",
        "Quality consistency",
        "Inventory management"
      ],
      variant: "gradient"
    },
    {
      icon: Scissors,
      title: "Salons & Spas",
      description: "Professional cleaning of towels, robes, and specialty linens for beauty and wellness businesses.",
      features: [
        "Hygiene compliance",
        "Soft fabric care",
        "Color protection",
        "Quick turnaround"
      ],
      variant: "neon"
    },
    {
      icon: Dumbbell,
      title: "Gyms & Fitness Centers",
      description: "High-volume cleaning of towels, uniforms, and athletic wear with specialized odor treatment.",
      features: [
        "Odor elimination",
        "Antibacterial treatment",
        "Durable fabric care",
        "Bulk processing"
      ],
      variant: "glow"
    },
    {
      icon: HeartPulse,
      title: "Medical & Healthcare",
      description: "Sterile cleaning services for medical uniforms, linens, and specialized healthcare textiles.",
      features: [
        "Medical-grade cleaning",
        "Sterile processing",
        "Compliance standards",
        "Secure handling"
      ],
      variant: "gradient"
    },
    {
      icon: Briefcase,
      title: "Corporate Offices",
      description: "Professional uniform cleaning and employee laundry services for corporate clients.",
      features: [
        "Employee benefits",
        "Professional appearance",
        "Convenient scheduling",
        "Cost-effective"
      ],
      variant: "neon"
    }
  ]
};
    const whyChooseUsData = {
  title: "Why Businesses Choose FarrariGo",
  subtitle: "Professional service with the reliability and quality your business demands.",
  cards: [
    {
      icon: User,
      title: "Dedicated Account Management",
      description: "Personal account manager to handle all your business needs and ensure seamless service.",
      variant: "gradient"
    },
    {
      icon: Calendar,
      title: "Flexible Scheduling",
      description: "Custom pickup and delivery schedules that work around your business operations.",
      variant: "glow"
    },
    {
      icon: Award,
      title: "Quality Guarantee",
      description: "Consistent, professional results with our satisfaction guarantee and quality control.",
      variant: "neon"
    }
  ]
};
  return (
    <div>
              <FeatureForAll
  title="Laundry Solutions for Businesses"
  subtitle="Partner with FarrariGo to provide premium laundry services for your business. Professional solutions for hotels, salons, gyms, clinics, and offices."
  highlightText="Trusted by 500+ Businesses in Kuwait"
  highlightIcon={CheckCircle}
  showFeatures={false}
  features={[
    {
      icon: Building2,
      title: "Multi-Industry Solutions",
      description: "Specialized services for hotels, salons, gyms, clinics, and corporate offices"
    },
    {
      icon: Award,
      title: "Commercial Grade Quality",
      description: "Industrial-strength cleaning with professional finishing for business standards"
    },
    {
      icon: Users,
      title: "Volume Discounts",
      description: "Competitive pricing with special rates for high-volume business partnerships"
    }
  ]}
/>
 <CardsSection {...industriesData} gridCols="3" />
<CardsSection {...whyChooseUsData} gridCols="3" />
<BusinessProposalForm/>
<CallToAction
      headline="Join the Growing List of Clients Who Trust FarrariGo"
      description="Let us handle your laundry needs so you can focus on what matters most - running your business."
      stats={[
        {
          value: "500+",
          label: "Businesses Trust FarrariGo"
        }
      ]}
      primaryButton={{
        text: "Get Started",
        link: "/get-started",
        Icon: ArrowRight
      }}
      secondaryButton={{
        text: "Contact Us",
        link: "/contact",
        Icon: Phone
      }}
    />
    </div>
  )
}

export default Business
