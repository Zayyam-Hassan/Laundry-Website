import React from "react";
import { useState, useEffect } from "react";
import { CheckCircle, ArrowRight, Sparkles } from "lucide-react";

const ProcessStepBusiness = ({
  title = "What Happens Next?",
  subtitle = "Here's what you can expect after submitting your inquiry.",
  steps = [
    {
      title: "Initial Review",
      description: "Our team reviews your submission within 24 hours and validates all requirements."
    },
    {
      title: "Analysis & Planning",
      description: "We conduct thorough analysis and create a customized strategy for your needs."
    },
    {
      title: "Implementation",
      description: "We execute the plan with regular updates and milestone tracking."
    }
  ],
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-gradient-to-br from-slate-50 via-white to-blue-50 py-16 sm:py-24 px-4 sm:px-6 lg:px-8 min-h-screen flex items-center">
      <div className="max-w-7xl mx-auto w-full">
        {/* Header */}
        <div
          className={`text-center mb-16 mt-4 transform transition-all duration-1000 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
          }`}
        >
          <div className="relative inline-block">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent mb-4 leading-tight tracking-tight">
              {title}
            </h1>
            {/* Animated underline */}
            <div
              className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-full transition-all duration-1000 delay-500"
              style={{ width: isVisible ? "50%" : "0%" }}
            />
          </div>

          <p
            className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed font-medium mt-6 transform transition-all duration-1000 delay-300"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(0)" : "translateY(20px)",
            }}
          >
            {subtitle}
          </p>
        </div>

        {/* Steps Container */}
        <div className="relative">
          {/* Connection Line - Hidden on mobile */}
          <div className="hidden md:block absolute top-20 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-indigo-200 to-transparent"></div>
          
          {/* Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`relative transform transition-all duration-700 ease-out ${
                  isVisible 
                    ? "translate-y-0 opacity-100" 
                    : "translate-y-20 opacity-0"
                }`}
                style={{ 
                  transitionDelay: `${0.2 + index * 0.2}s` 
                }}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Card */}
                <div className="relative group h-full">
                  {/* Animated background glow */}
                  <div 
                    className={`absolute -inset-2 bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-pink-500/20 rounded-2xl blur-xl transition-all duration-500 ${
                      hoveredCard === index ? 'opacity-100 scale-105' : 'opacity-0 scale-95'
                    }`}
                  ></div>
                  
                  {/* Main card */}
                  <div className={`relative bg-white rounded-2xl p-8 lg:p-10 h-full shadow-lg border border-gray-100 transition-all duration-500 ease-out transform ${
                    hoveredCard === index 
                      ? 'scale-105 shadow-2xl border-indigo-200' 
                      : 'scale-100 hover:shadow-xl'
                  }`}>
                    
                    {/* Floating number badge */}
                    <div className={`absolute -top-6 left-8 transition-all duration-500 ${
                      hoveredCard === index ? 'scale-110 -rotate-3' : 'scale-100 rotate-0'
                    }`}>
                      <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full blur-md opacity-50"></div>
                        <div className="relative w-14 h-14 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center text-white font-black text-xl shadow-lg">
                          {index + 1}
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="pt-6">
                      {/* Icon and title */}
                      <div className="flex items-center mb-6">
                        <div className={`transition-all duration-300 ${
                          hoveredCard === index ? 'scale-110 rotate-12' : 'scale-100 rotate-0'
                        }`}>
                          <CheckCircle className="w-7 h-7 text-indigo-500 mr-3" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 leading-tight">
                          {step.title}
                        </h3>
                      </div>

                      {/* Description */}
                      <p className="text-gray-600 leading-relaxed">
                        {step.description}
                      </p>


                    </div>

                    {/* Decorative elements */}
                    <div className="absolute top-4 right-4 w-8 h-8 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full opacity-50"></div>
                    <div className="absolute bottom-4 left-4 w-6 h-6 bg-gradient-to-br from-pink-100 to-indigo-100 rounded-full opacity-30"></div>

                    {/* Bottom gradient line */}
                    <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-b-2xl transition-all duration-500 ${
                      hoveredCard === index ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'
                    }`}></div>
                  </div>
                </div>

                {/* Connection arrow for larger screens */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute -right-6 top-20 z-10">
                    <div className={`w-12 h-12 rounded-full bg-white shadow-lg border-2 border-indigo-200 flex items-center justify-center transition-all duration-500 ${
                      hoveredCard === index || hoveredCard === index + 1
                        ? 'scale-110 border-indigo-400 bg-indigo-50'
                        : 'scale-100'
                    }`}>
                      <ArrowRight className="w-5 h-5 text-indigo-500" />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>


      </div>
    </div>
  );
};

export default ProcessStepBusiness;