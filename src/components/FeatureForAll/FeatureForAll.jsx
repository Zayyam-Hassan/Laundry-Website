import React from 'react';

const FeatureForAll = ({
  title,
  subtitle,
  highlightText,
  highlightIcon: HighlightIcon,
  features = [],
  showFeatures = false,
  theme = {},
  className = ""
}) => {
  // Default theme that can be overridden by props
  const defaultTheme = {
    bgColor: "bg-[linear-gradient(135deg,#0f172a_0%,#1e1b4b_25%,#312e81_50%,#1e1b4b_75%,#0f172a_100%)]",
    titleColor: "text-white",
    subtitleColor: "text-gray-300",
    highlightColor: "text-yellow-400",
    highlightBg: "bg-yellow-400/10",
    highlightBorder: "border-yellow-400/30",
    featureIconBg: "bg-white/10",
    featureIconColor: "text-yellow-400",
    featureTitleColor: "text-white",
    featureDescriptionColor: "text-gray-300",
    ...theme
  };

  return (
    <div className={`relative overflow-hidden ${defaultTheme.bgColor} ${className}`}>
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-yellow-400/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/4 w-24 h-24 bg-blue-400/20 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 right-1/3 w-16 h-16 bg-purple-400/20 rounded-full blur-xl animate-pulse delay-500"></div>
      </div>
      
      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-yellow-400/30 rounded-full animate-ping"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          ></div>
        ))}
      </div>

      <div className="relative z-10 px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main Title */}
          {title && (
            <h1 className={`text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-6 sm:mb-8 ${defaultTheme.titleColor} leading-tight mt-2.5`}>
              <span className="inline-block animate-fade-in-up">
                {title}
              </span>
            </h1>
          )}
          
          {/* Subtitle */}
          {subtitle && (
            <p className={`text-base sm:text-lg lg:text-xl mb-8 sm:mb-12 ${defaultTheme.subtitleColor} max-w-3xl mx-auto leading-relaxed animate-fade-in-up delay-200`}>
              {subtitle}
            </p>
          )}
          
          {/* Highlight Badge */}
          {highlightText && HighlightIcon && (
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full border backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-yellow-400/20 animate-fade-in-up delay-400">
              <div className={`p-2 rounded-full ${defaultTheme.highlightBg} ${defaultTheme.highlightBorder} border`}>
                <HighlightIcon className={`w-5 h-5 ${defaultTheme.highlightColor}`} />
              </div>
              <span className={`text-sm sm:text-base font-semibold ${defaultTheme.highlightColor}`}>
                {highlightText}
              </span>
            </div>
          )}

          {/* Optional Features Grid */}
          {showFeatures && features.length > 0 && (
            <div className="mt-12 sm:mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 animate-fade-in-up delay-600">
              {features.map((feature, index) => (
                <div 
                  key={index}
                  className="group p-6 rounded-xl backdrop-blur-sm bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:transform hover:scale-105 hover:shadow-xl hover:shadow-yellow-400/10"
                >
                  {feature.icon && (
                    <div className={`w-12 h-12 rounded-xl ${defaultTheme.featureIconBg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <feature.icon className={`w-6 h-6 ${defaultTheme.featureIconColor}`} />
                    </div>
                  )}
                  {feature.title && (
                    <h3 className={`text-lg font-semibold mb-2 ${defaultTheme.featureTitleColor}`}>
                      {feature.title}
                    </h3>
                  )}
                  {feature.description && (
                    <p className={`text-sm ${defaultTheme.featureDescriptionColor}`}>
                      {feature.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Bottom gradient overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
      
      <style jsx>{`
        @keyframes fade-in-up {
          0% {
            opacity: 0;
            transform: translateY(30px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }
        
        .delay-200 {
          animation-delay: 0.2s;
        }
        
        .delay-400 {
          animation-delay: 0.4s;
        }
        
        .delay-600 {
          animation-delay: 0.6s;
        }
        
        .delay-1000 {
          animation-delay: 1s;
        }
        
        .delay-500 {
          animation-delay: 0.5s;
        }
      `}</style>
    </div>
  );
};
export default FeatureForAll;