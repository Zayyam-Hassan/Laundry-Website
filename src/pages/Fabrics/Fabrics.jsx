import React from "react";
import FeatureForAll from "../../components/FeatureForAll/FeatureForAll";
import CardsSection from "../../components/CardsSection/CardsSection";
import CallToAction from "../../components/CallToAction/CallToAction";
import {
  Shield,
  Eye,
  ThumbsUp,
  Sparkles,
  Shirt,
  Crown,
  Package,
  Zap,
  Leaf,
  ShirtIcon,
  Droplets,
  Thermometer,
  Wind,
  Hand,
  Download
} from "lucide-react";
import Feature from "../../components/Feature/Feature";
const Fabrics = () => {
  const materialsData = {
    title: "How We Handle Different Materials",
    subtitle:
      "Each fabric type requires specialized knowledge and care. Our experts understand the unique properties of every material, and apply the appropriate treatment methods.",
    cards: [
      {
        icon: Sparkles,
        title: "Silk",
        description: "Delicate natural fiber requiring gentle care",
        features: [
          "Processes: Gentle machine wash with specialty detergents",
          "Temperature: Cold water (30°C)",
          "Drying: Air dry away from direct sunlight",
          "Special Care: Avoid agitation, use mild detergents",
        ],
        variant: "gradient",
      },
      {
        icon: Crown,
        title: "Cashmere",
        description: "Luxury wool fiber from cashmere goats",
        features: [
          "Processes: Hand wash with premium wool detergent",
          "Temperature: Cold water (30°C)",
          "Drying: Flat dry on clean towel",
          "Special Care: Fiber protection, professional finishing",
        ],
        variant: "gradient",
      },
      {
        icon: Shirt,
        title: "Cotton",
        description: "Versatile natural fiber for everyday wear",
        features: [
          "Processes: Machine wash with color-safe detergents",
          "Temperature: Warm water (40°C)",
          "Drying: Tumble dry low or line dry",
          "Special Care: Pre-treat stains, avoid over-drying",
        ],
        variant: "gradient",
      },
      {
        icon: Package,
        title: "Denim",
        description: "Heavy cotton twill, requires special attention",
        features: [
          "Processes: Cold water washing to preserve color",
          "Temperature: Cold water (30°C)",
          "Drying: Air dry or tumble dry low",
          "Special Care: Wash inside out, minimal washing",
        ],
        variant: "gradient",
      },
      {
        icon: Leaf,
        title: "Linen",
        description: "Natural flax fiber, breathable and durable",
        features: [
          "Processes: Machine wash with gentle cycle",
          "Temperature: Warm water (40°C)",
          "Drying: Air dry for best results",
          "Special Care: Iron while slightly damp",
        ],
        variant: "gradient",
      },
      {
        icon: Shield,
        title: "Wool",
        description: "Natural protein fiber requiring careful handling",
        features: [
          "Processes: Wool-specific detergent, minimal agitation",
          "Temperature: Cold water (30°C)",
          "Drying: Flat dry to maintain shape",
          "Special Care: Avoid harsh chemicals, professional pressing",
        ],
        variant: "gradient",
      },
    ],
  };
  const advancedCareData = {
    title: "Our Advanced Care Processes",
    subtitle:
      "State-of-the-art technology combined with traditional craftsmanship.",
    cards: [
      {
        icon: Droplets,
        title: "Eco-Wash Technology",
        description:
          "Advanced water filtration and eco-friendly detergents that are gentle on fabrics and the environment.",
        variant: "gradient",
      },
      {
        icon: Thermometer,
        title: "Temperature Control",
        description:
          "Precise temperature management for each fabric type to prevent damage and maintain quality.",
        variant: "gradient",
      },
      {
        icon: Wind,
        title: "Gentle Drying",
        description:
          "Climate-controlled drying rooms with optimal humidity levels for different fabric types.",
        variant: "gradient",
      },
      {
        icon: Hand,
        title: "Hand Finishing",
        description:
          "Expert hand-pressing and finishing touches for a premium, professional appearance.",
        variant: "gradient",
      },
    ],
  };
  // Professional care tips theme (like your second image)
  const professionalCareTheme = {
    bgColor: "bg-gray-50",
    titleColor: "text-indigo-900",
    subtitleColor: "text-gray-600",
    featureNumberBg: "bg-yellow-400",
    featureNumberColor: "text-black",
    featureTitleColor: "text-indigo-900",
    featureDescriptionColor: "text-gray-600",
    decorativeAccent: "bg-yellow-100",
  };

  const professionalCareTips = [
    {
      title: "Read Care Labels",
      description:
        "Always check garment care labels before treatment. Our experts follow manufacturer guidelines while applying our premium techniques.",
    },
    {
      title: "Treat Stains Quickly",
      description:
        "The sooner stains are treated, the better the results. Our pickup service ensures rapid professional treatment.",
    },
    {
      title: "Proper Storage",
      description:
        "We return your garments in protective packaging. Store them properly to maintain their fresh, clean condition.",
    },
    {
      title: "Regular Professional Care",
      description:
        "Regular professional cleaning extends garment life and maintains appearance better than home washing alone.",
    },
  ];
  return (
    <div>
      <FeatureForAll
        title="Fabric & Garment Care Guide"
        subtitle="Discover how our expert team provides specialized care for every type of fabric, ensuring your garments receive the perfect treatment they deserve."
        highlightText="Expert Care for Every Fabric"
        highlightIcon={Shield}
        showFeatures={true}
        features={[
          {
            icon: Sparkles,
            title: "Specialized Treatments",
            description:
              "Custom care protocols for silk, wool, cotton, synthetic blends, and delicate fabrics",
          },
          {
            icon: Eye,
            title: "Pre-Treatment Analysis",
            description:
              "Thorough fabric inspection and stain assessment before processing begins",
          },
          {
            icon: ThumbsUp,
            title: "Gentle Processing",
            description:
              "Temperature-controlled washing and drying to preserve fabric integrity and color",
          },
        ]}
      />
      <CardsSection
        title={materialsData.title}
        subtitle={materialsData.subtitle}
        cards={materialsData.cards}
        gridCols="3" // This will show 3 columns on larger screens
      />
      <CardsSection
        title={advancedCareData.title}
        subtitle={advancedCareData.subtitle}
        cards={advancedCareData.cards}
        gridCols="4" // This will show 4 columns on larger screens
      />
      {/* Professional Care Tips Section - Second Image Style */}
      <Feature
        layout="features"
        title="Professional Care Tips"
        features={professionalCareTips}
        image={{
          src:
            "https://images.pexels.com/photos/6195125/pexels-photo-6195125.jpeg?auto=compress&cs=tinysrgb&w=600&h=800&fit=crop",
          alt: "Professional cleaning crew",
        }}
        stat={{
          value: "99.9%",
          label: "Stain Removal Success",
        }}
        theme={{
          ...professionalCareTheme,
          titleColor: "text-[#170d5c]",
          customTitleStyle: { color: '#170d5c' }
        }}
      />
      {/* <CallToAction
        headline="Download Our Complete Care Guide"
        description="Get our comprehensive fabric care booklet with detailed instructions, stain removal tips, and professional recommendations."
        stats={[
          { value: "50+", label: "Fabric Types Covered" },
          { value: "100+", label: "Care Instructions" },
          { value: "25+", label: "Stain Solutions" },
        ]}
        primaryButton={{
          text: "Download Care Guide (PDF)",
          link: "/download-guide",
          Icon: Download,
        }}
        footerText="Free download • 2.5MB • Available in English and Arabic"
      /> */}
    </div>
  );
};

export default Fabrics;
