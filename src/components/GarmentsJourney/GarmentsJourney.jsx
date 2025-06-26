import React, { useState, useEffect } from "react";
import {
  Truck,
  Search,
  Droplets,
  CheckCircle,
  Package,
  ArrowDown,
} from "lucide-react";

const GarmentJourney = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const steps = [
    {
      id: 1,
      icon: Truck,
      title: "Professional Pickup",
      description:
        "Our uniformed driver arrives at your scheduled time in a branded vehicle.",
      features: [
        "GPS-tracked vehicles for reliability",
        "Professional, uniformed staff",
        "Contactless pickup options available",
        "Secure garment collection bags",
      ],
      imagePath: "/images/Delivery van angle 1.png", 
      isLeft: true,
    },
    {
      id: 2,
      icon: Search,
      title: "Expert Sorting & Inspection",
      description:
        "Each garment is carefully inspected and sorted by fabric type and care requirements.",
      features: [
        "Individual garment inspection",
        "Stain identification and pre-treatment",
        "Fabric-specific sorting process",
        "Digital tracking system activation",
      ],
      imagePath:
        "/images/GarmentsSorting.jpg",

      isLeft: false,
    },
    {
      id: 3,
      icon: Droplets,
      title: "Premium Cleaning Process",
      description:
        "State-of-the-art equipment and eco-friendly solutions provide superior cleaning.",
      features: [
        "Eco-friendly, premium detergents",
        "Temperature-controlled washing",
        "Specialized dry cleaning for delicates",
        "Advanced stain removal techniques",
      ],
      imagePath:
        "https://images.unsplash.com/photo-1582735689369-4fe89db7114c?auto=format&fit=crop&w=800&q=80", // Industrial washing
      isLeft: true,
    },
    {
      id: 4,
      icon: CheckCircle,
      title: "Quality Control & Finishing",
      description:
        "Rigorous quality checks ensure every item meets our premium standards.",
      features: [
        "Multi-point quality inspection",
        "Professional pressing and finishing",
        "Spot cleaning for any missed areas",
        "Final quality approval process",
      ],
      imagePath:
        "https://images.unsplash.com/photo-1545558014-8692077e9b5c?auto=format&fit=crop&w=800&q=80", // Ironing
      isLeft: false,
    },
    {
      id: 5,
      icon: Package,
      title: "Elegant Packaging & Delivery",
      description:
        "Your fresh, clean garments are carefully packaged and delivered to your door.",
      features: [
        "Eco-friendly packaging materials",
        "Protective garment covers",
        "Scheduled delivery confirmation",
        "Satisfaction guarantee included",
      ],
      imagePath: "/images/Delivery pic.png", 
      isLeft: true,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div
        className={`text-center py-20 px-6 transition-all duration-1000 ease-out ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
        }`}
      >
        <h1 className="text-5xl lg:text-6xl font-bold text-blue-900 mb-6">
          Your Garment's Journey
        </h1>
        <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
          Follow your clothes through our comprehensive care process, designed
          to deliver exceptional results every time.
        </p>
      </div>

      {/* Steps Container */}
      <div className="max-w-7xl mx-auto px-6 pb-20">
        {steps.map((step, index) => {
          const Icon = step.icon;
          return (
            <div key={step.id} className="relative mb-20 last:mb-0">
              {/* Step Content */}
              <div
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center transition-all duration-1000 ease-out ${
                  isVisible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-20 opacity-0"
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                {/* Image Side */}
                <div
                  className={`${
                    step.isLeft ? "lg:order-2" : "lg:order-1"
                  } group`}
                >
                  <div className="relative bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden">
                    <div className="aspect-[4/3] relative">
                      {/* Image */}
                      {step.imagePath ? (
                        <img
                          src={step.imagePath}
                          alt={step.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
                          <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-purple-400/20"></div>
                          <Icon className="w-24 h-24 text-blue-600/40" />
                        </div>
                      )}

                      {/* Step Label */}
                      <div className="absolute top-4 left-4 bg-yellow-400 text-gray-800 px-3 py-1 rounded-lg text-sm font-semibold">
                        Step {step.id}
                      </div>

                      {/* Title Overlay */}
                      <div className="absolute bottom-4 left-4 right-4">
                        <h3 className="text-white text-xl font-bold bg-black/60 backdrop-blur-sm rounded-lg px-4 py-2">
                          {step.title}
                        </h3>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content Side */}
                <div
                  className={`${
                    step.isLeft ? "lg:order-1" : "lg:order-2"
                  } space-y-6`}
                >
                  {/* Step Number & Icon */}
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg group hover:scale-110 transition-transform duration-300">
                      <span className="text-2xl font-bold text-gray-800">
                        {step.id}
                      </span>
                    </div>
                    <div className="w-12 h-12 bg-white rounded-xl shadow-md flex items-center justify-center group hover:scale-110 transition-transform duration-300">
                      <Icon className="w-6 h-6 text-blue-600" />
                    </div>
                  </div>

                  {/* Title & Description */}
                  <div className="space-y-4">
                    <h2 className="text-3xl lg:text-4xl font-bold text-blue-900">
                      {step.title}
                    </h2>
                    <p className="text-lg text-gray-600 leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                  {/* Features */}
                  <div className="space-y-3">
                    {step.features.map((feature, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-3 group hover:translate-x-2 transition-transform duration-300"
                      >
                        <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0 group-hover:scale-150 transition-transform duration-300"></div>
                        <span className="text-gray-700 leading-relaxed group-hover:text-gray-900 transition-colors duration-300">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Connecting Arrow */}
              {index < steps.length - 1 && (
                <div className="flex justify-center mt-16">
                  <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 animate-pulse">
                    <ArrowDown className="w-6 h-6 text-gray-800" />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default GarmentJourney;
