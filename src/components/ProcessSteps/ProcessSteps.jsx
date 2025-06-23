import React, { useState, useEffect } from 'react';

const ProcessSteps = ({ 
  title, 
  subtitle,
  steps, 
  theme = 'ocean'
}) => {
  const [activeStep, setActiveStep] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [steps.length]);

  const themes = {
    golden: {
      accent: 'from-yellow-400 via-amber-400 to-orange-400',
      glow: 'shadow-yellow-400/30',
      particle: 'bg-yellow-400',
      cardGlow: 'shadow-yellow-400/20',
      hoverGlow: 'shadow-yellow-400/40'
    },
    aurora: {
      accent: 'from-pink-400 via-purple-400 to-indigo-400',
      glow: 'shadow-pink-500/25',
      particle: 'bg-pink-400',
      cardGlow: 'shadow-pink-500/20',
      hoverGlow: 'shadow-pink-500/40'
    },
    cosmic: {
      accent: 'from-cyan-400 via-blue-400 to-purple-400',
      glow: 'shadow-cyan-500/25',
      particle: 'bg-cyan-400',
      cardGlow: 'shadow-cyan-500/20',
      hoverGlow: 'shadow-cyan-500/40'
    },
    ocean: {
      accent: 'from-teal-400 via-cyan-400 to-blue-400',
      glow: 'shadow-teal-500/25',
      particle: 'bg-teal-400',
      cardGlow: 'shadow-teal-500/20',
      hoverGlow: 'shadow-teal-500/40'
    },
    sunset: {
      accent: 'from-yellow-400 via-orange-400 to-red-400',
      glow: 'shadow-orange-500/25',
      particle: 'bg-orange-400',
      cardGlow: 'shadow-orange-500/20',
      hoverGlow: 'shadow-orange-500/40'
    }
  };

  const currentTheme = themes[theme];

  return (
    <div className="relative w-full bg-[linear-gradient(135deg,#0f172a_0%,#1e1b4b_25%,#312e81_50%,#1e1b4b_75%,#0f172a_100%)] overflow-hidden py-12 md:py-16">
      {/* Enhanced Animated Background Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(40)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-1 h-1 ${currentTheme.particle} rounded-full opacity-30 animate-pulse`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${2 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>

      {/* Enhanced Floating Geometric Shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-20 left-10 w-24 h-24 border border-${currentTheme.particle.split('-')[1]}-400/20 rounded-full animate-spin-slow`}></div>
        <div className={`absolute bottom-20 right-10 w-36 h-36 border border-${currentTheme.particle.split('-')[1]}-400/10 rounded-full animate-pulse`}></div>
        <div className={`absolute top-1/2 left-1/4 w-16 h-16 bg-gradient-to-r from-${currentTheme.particle.split('-')[1]}-400/10 to-transparent rounded-lg rotate-45 animate-float`}></div>
        <div className={`absolute top-1/3 right-1/4 w-12 h-12 border border-${currentTheme.particle.split('-')[1]}-400/15 rounded-lg rotate-12 animate-float-reverse`}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        {/* Compact Header */}
        <div className={`text-center mb-12 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="relative inline-block">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-200 to-white mb-4 leading-tight tracking-tight">
              {title}
            </h1>
            <div className={`absolute -inset-1 bg-gradient-to-r ${currentTheme.accent} opacity-20 blur-xl rounded-lg`}></div>
          </div>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed font-light">
            {subtitle}
          </p>
        </div>

        {/* Revolutionary Steps Design with Consistent Cards */}
        <div className="relative">
          {/* Enhanced Dynamic Connection Path */}
          <svg className="absolute inset-0 w-full h-full hidden lg:block" style={{ zIndex: 1 }}>
            <defs>
              <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgba(255,255,255,0)" />
                <stop offset="30%" stopColor={`rgba(${currentTheme.particle === 'bg-teal-400' ? '45,212,191' : currentTheme.particle === 'bg-yellow-400' ? '250,204,21' : currentTheme.particle === 'bg-pink-400' ? '244,114,182' : currentTheme.particle === 'bg-cyan-400' ? '34,211,238' : '251,146,60'},0.4)`} />
                <stop offset="70%" stopColor={`rgba(${currentTheme.particle === 'bg-teal-400' ? '45,212,191' : currentTheme.particle === 'bg-yellow-400' ? '250,204,21' : currentTheme.particle === 'bg-pink-400' ? '244,114,182' : currentTheme.particle === 'bg-cyan-400' ? '34,211,238' : '251,146,60'},0.4)`} />
                <stop offset="100%" stopColor="rgba(255,255,255,0)" />
              </linearGradient>
            </defs>
            <path
              d="M 100 150 Q 300 120 500 150 T 900 150 T 1300 150"
              stroke="url(#pathGradient)"
              strokeWidth="3"
              fill="none"
              className="animate-pulse"
            />
          </svg>

          {/* Enhanced Steps Grid with Consistent Sizing */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-6 relative z-10">
            {steps.map((step, index) => {
              const isActive = activeStep === index;
              const isPassed = index < activeStep;
              
              return (
                <div
                  key={index}
                  className={`group relative transform transition-all duration-700 hover:scale-105 ${
                    isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
                  }`}
                  style={{ transitionDelay: `${index * 200}ms` }}
                  onMouseEnter={() => setActiveStep(index)}
                >
                  {/* Enhanced Holographic Card with Consistent Height */}
                  <div className={`
                    relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl 
                    rounded-3xl p-6 border border-white/20 group-hover:border-${currentTheme.particle.split('-')[1]}-400/60
                    transition-all duration-500 group-hover:shadow-2xl min-h-[280px] flex flex-col
                    ${isActive ? `${currentTheme.glow} shadow-2xl border-${currentTheme.particle.split('-')[1]}-400/70 ${currentTheme.cardGlow}` : `${currentTheme.cardGlow}`}
                    ${isPassed ? 'border-green-400/30 shadow-green-500/10' : ''}
                    group-hover:${currentTheme.hoverGlow}
                  `}>
                    {/* Enhanced Step Number with Orbital Animation */}
                    <div className="relative mb-6 flex justify-center">
                      <div className={`
                        relative w-16 h-16 rounded-full bg-gradient-to-r ${currentTheme.accent}
                        flex items-center justify-center text-xl font-black text-black
                        transition-all duration-500 group-hover:scale-110
                        ${isActive ? 'animate-pulse shadow-xl shadow-' + currentTheme.particle.split('-')[1] + '-400/50' : 'shadow-lg shadow-' + currentTheme.particle.split('-')[1] + '-400/30'}
                      `}>
                        {/* Enhanced Orbital Ring */}
                        <div className={`
                          absolute -inset-3 border-2 border-${currentTheme.particle.split('-')[1]}-400/30 rounded-full
                          ${isActive ? 'animate-spin-slow border-' + currentTheme.particle.split('-')[1] + '-400/70 shadow-lg shadow-' + currentTheme.particle.split('-')[1] + '-400/30' : ''}
                        `}>
                          <div className={`
                            absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2
                            w-2 h-2 ${currentTheme.particle} rounded-full shadow-lg shadow-${currentTheme.particle.split('-')[1]}-400/50
                            ${isActive ? 'animate-ping' : 'animate-pulse'}
                          `}></div>
                        </div>
                        
                        <span className="relative z-10 drop-shadow-lg">{index + 1}</span>
                        
                        {/* Enhanced Success Checkmark */}
                        {isPassed && (
                          <div className="absolute inset-0 bg-green-500 rounded-full flex items-center justify-center animate-scale-in shadow-xl shadow-green-500/50">
                            <svg className="w-6 h-6 text-white drop-shadow-lg" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Enhanced Content with Flex Growth */}
                    <div className="text-center space-y-3 flex-grow flex flex-col justify-center">
                      <h3 className={`
                        text-lg font-bold text-white group-hover:text-transparent 
                        group-hover:bg-clip-text group-hover:bg-gradient-to-r 
                        group-hover:${currentTheme.accent}
                        transition-all duration-300 drop-shadow-lg
                      `}>
                        {step.title}
                      </h3>
                      <p className="text-gray-300 group-hover:text-white transition-colors duration-300 leading-relaxed text-sm">
                        {step.description}
                      </p>
                    </div>

                    {/* Enhanced Interactive Glow Effect */}
                    <div className={`
                      absolute inset-0 bg-gradient-to-r ${currentTheme.accent} opacity-0 
                      group-hover:opacity-10 rounded-3xl transition-opacity duration-500
                    `}></div>

                    {/* Enhanced Progress Indicator */}
                    {isActive && (
                      <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-${currentTheme.particle.split('-')[1]}-400/70 to-transparent rounded-b-3xl`}>
                        <div className={`h-full bg-gradient-to-r from-${currentTheme.particle.split('-')[1]}-400/0 via-${currentTheme.particle.split('-')[1]}-400 to-${currentTheme.particle.split('-')[1]}-400/0 animate-pulse shadow-lg shadow-${currentTheme.particle.split('-')[1]}-400/50`}></div>
                      </div>
                    )}

                    {/* Additional Accent Lines */}
                    <div className={`
                      absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-${currentTheme.particle.split('-')[1]}-400/50 to-transparent
                      ${isActive ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500
                    `}></div>
                  </div>

                  {/* Enhanced Mobile Connection Arrow */}
                  {index < steps.length - 1 && (
                    <div className="lg:hidden flex justify-center my-6">
                      <div className={`w-1 h-8 bg-gradient-to-b ${currentTheme.accent} rounded-full opacity-60 animate-pulse shadow-lg shadow-${currentTheme.particle.split('-')[1]}-400/30`}></div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Enhanced Progress Bar */}
        <div className="mt-12 flex justify-center">
          <div className="flex space-x-2 bg-white/10 backdrop-blur-sm rounded-full p-2 border border-white/20">
            {steps.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveStep(index)}
                className={`
                  w-3 h-3 rounded-full transition-all duration-300 border border-transparent
                  ${index === activeStep 
                    ? `bg-gradient-to-r ${currentTheme.accent} shadow-lg shadow-${currentTheme.particle.split('-')[1]}-400/50 border-${currentTheme.particle.split('-')[1]}-400/30` 
                    : 'bg-white/20 hover:bg-white/40 hover:shadow-md'
                  }
                `}
              />
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(45deg); }
          50% { transform: translateY(-20px) rotate(45deg); }
        }
        @keyframes float-reverse {
          0%, 100% { transform: translateY(0px) rotate(12deg); }
          50% { transform: translateY(20px) rotate(12deg); }
        }
        @keyframes scale-in {
          0% { transform: scale(0); }
          100% { transform: scale(1); }
        }
        .animate-spin-slow { animation: spin-slow 8s linear infinite; }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-float-reverse { animation: float-reverse 8s ease-in-out infinite; }
        .animate-scale-in { animation: scale-in 0.5s ease-out; }
      `}</style>
    </div>
  );
};

export default ProcessSteps;