import Card from '../Card/Card';
const CardsSection = ({ 
  title,
  subtitle,
  cards = [],
  className = "",
  containerClassName = "",
  showDecorations = true,
  gridCols = "auto"
}) => {
  const getGridClass = () => {
    if (gridCols !== "auto") {
      if (gridCols === "1") return "grid-cols-1";
      if (gridCols === "2") return "md:grid-cols-2";
      if (gridCols === "3") return "md:grid-cols-3";
      if (gridCols === "4") return "md:grid-cols-2 lg:grid-cols-4";
      return gridCols;
    }
    
    if (cards.length === 1) return "grid-cols-1";
    if (cards.length === 2) return "md:grid-cols-2";
    if (cards.length === 3) return "md:grid-cols-3";
    if (cards.length === 4) return "md:grid-cols-2 lg:grid-cols-4";
    if (cards.length >= 5) return "md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4";
    return "md:grid-cols-2";
  };

  return (
    <div className={`min-h-screen bg-white relative overflow-hidden ${className}`}>
      {/* Subtle Background Elements */}
      {showDecorations && (
        <>
          <div className="absolute inset-0">
            <div className="absolute top-20 left-20 w-72 h-72 bg-blue-50 rounded-full blur-3xl animate-pulse opacity-60"></div>
            <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-50 rounded-full blur-3xl animate-pulse opacity-60" style={{ animationDelay: '1s' }}></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-emerald-50 rounded-full blur-3xl animate-pulse opacity-60" style={{ animationDelay: '2s' }}></div>
          </div>

          {/* Floating particles */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(15)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-gray-300/40 rounded-full animate-pulse"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`,
                  animationDuration: `${2 + Math.random() * 2}s`
                }}
              ></div>
            ))}
          </div>
        </>
      )}

      <div className={`relative z-10 container mx-auto px-6 py-20 ${containerClassName}`}>
        {/* Header */}
        {(title || subtitle) && (
          <div className="text-center mb-16">
            {title && (
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent mb-4 leading-tight tracking-tight">
                {title}
              </h1>
            )}
            {subtitle && (
              <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed font-medium mt-6 transform transition-all duration-1000 delay-300">
                {subtitle}
              </p>
            )}
            {title && (
              <div className="mt-8 w-24 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto rounded-full"></div>
            )}
          </div>
        )}

        {/* Cards Grid */}
        {cards.length > 0 && (
          <div className={`grid gap-8 ${getGridClass()}`}>
            {cards.map((card, index) => (
              <Card
                key={index}
                icon={card.icon}
                title={card.title}
                description={card.description}
                features={card.features || []}
                variant={card.variant || 'default'}
                delay={index * 200}
              />
            ))}
          </div>
        )}

        {/* Bottom decoration */}
        {showDecorations && cards.length > 0 && (
          <div className="mt-20 flex justify-center">
            <div className="flex space-x-2">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="w-2 h-2 rounded-full bg-gradient-to-r from-indigo-400 to-purple-400 animate-pulse"
                  style={{ animationDelay: `${i * 200}ms` }}
                ></div>
              ))}
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
      `}</style>
    </div>
  );
};

export default CardsSection;
//   const whyChooseData = {
//     title: "Why Choose FarrariGo?",
//     subtitle: "Experience the difference of premium laundry service designed for the modern lifestyle.",
//     cards: [
//       {
//         icon: Star,
//         title: "Premium Quality",
//         description: "Expert care for all your garments with premium cleaning solutions and techniques.",
//         variant: 'gradient'
//       },
//       {
//         icon: Clock,
//         title: "Convenient Scheduling",
//         description: "Flexible pickup and delivery times that work with your busy lifestyle.",
//         variant: 'glow'
//       },
//       {
//         icon: Shield,
//         title: "Trusted Service",
//         description: "Reliable, insured service with a satisfaction guarantee on every order.",
//         variant: 'neon'
//       }
//     ]
//   };

//   // Example 2: Services section
//   const servicesData = {
//     title: "Comprehensive Laundry Solutions",
//     subtitle: "From everyday essentials to luxury garments, we provide expert care for all your laundry needs.",
//     cards: [
//       {
//         icon: Shirt,
//         title: "Wash & Fold",
//         description: "Professional washing and careful folding of your everyday garments with premium detergents.",
//         features: ["Eco-friendly detergents", "Fabric-specific care", "Neat folding", "Fresh scent"],
//         variant: 'gradient'
//       },
//       {
//         icon: Sparkles,
//         title: "Dry Cleaning",
//         description: "Expert dry cleaning for delicate fabrics and special garments that require gentle care.",
//         features: ["Delicate fabric care", "Stain removal", "Professional pressing", "Protective packaging"],
//         variant: 'glow'
//       }
//     ]
//   };