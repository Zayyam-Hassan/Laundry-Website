import React from 'react';

const Feature = ({
  title,
  features,
  image,
  stat,
  reverse = false,
  theme = {
    bgColor: 'bg-white',
    titleColor: 'text-indigo-900',
    featureNumberBg: 'bg-yellow-100',
    featureNumberColor: 'text-yellow-600',
    featureTitleColor: 'text-gray-900',
    featureDescriptionColor: 'text-gray-500',
  },
}) => {
  const textOrder = reverse ? 'md:order-last' : '';
  const imageOrder = reverse ? 'md:order-first' : '';

  return (
    <div className={`py-24 ${theme.bgColor} overflow-hidden`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-20 items-center">
          {/* Text Content */}
          <div className={`relative space-y-10 ${textOrder}`}>
            {/* Decorative Accent */}
            <div className={`absolute -top-1/4 -left-1/4 w-full h-full rounded-full ${theme.featureNumberBg} opacity-20 blur-3xl`} />
            
            <div className="relative">
              <h2 className={`text-3xl font-extrabold sm:text-4xl font-serif ${theme.titleColor}`}>
                {title}
              </h2>
              <div className="mt-10 space-y-8">
                {features.map((feature, index) => (
                  <div key={index} className="flex">
                    <div className="flex-shrink-0">
                      <div className={`flex items-center justify-center h-10 w-10 rounded-full ${theme.featureNumberBg} ${theme.featureNumberColor} font-bold`}>
                        {index + 1}
                      </div>
                    </div>
                    <div className="ml-4">
                      <h3 className={`text-lg leading-6 font-bold ${theme.featureTitleColor}`}>{feature.title}</h3>
                      <p className={`mt-2 text-sm ${theme.featureDescriptionColor}`}>{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Image Content */}
          <div className={`relative mt-10 md:mt-0 ${imageOrder}`}>
            <div className="relative w-10/12 mx-auto animate-float">
              <img
                className="relative rounded-2xl shadow-2xl w-full h-auto object-cover z-10"
                src={image.src}
                alt={image.alt}
              />
              {stat && (
                <div className="absolute bottom-0 left-0 transform translate-y-1/4 -translate-x-1/4 z-20">
                  <div className="w-40 h-40 rounded-full bg-black/30 backdrop-blur-xl border-2 border-white/20 flex flex-col items-center justify-center text-center shadow-2xl">
                    <p className="text-4xl font-bold text-white">{stat.value}</p>
                    <p className="mt-1 text-xs text-white/80 max-w-[80px]">{stat.label}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feature; 