import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Phone, Download } from 'lucide-react';

const CallToAction = ({
  headline,
  description,
  stats,
  primaryButton,
  secondaryButton,
  footerText,
}) => {
  return (
    <div style={{ backgroundColor: '#170d5c', background: 'linear-gradient(to top right, #170d5c, #1a0f6b, rgba(217, 180, 81, 0.3))' }}>
      <div className="max-w-6xl mx-auto py-16 px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold text-white sm:text-4xl mt-4 leading-tight tracking-tight">
          {headline}
        </h2>
        <p className="mt-6 max-w-3xl mx-auto text-base text-gray-300">
          {description}
        </p>

        {/* Stats Section */}
        {stats && stats.length > 0 && (
          <div className="mt-10 max-w-2xl mx-auto">
            <div className="rounded-lg p-8" style={{ backgroundColor: 'rgba(217, 180, 81, 0.1)' }}>
              <div className={`grid gap-8 ${
                stats.length === 1 
                  ? 'grid-cols-1 place-items-center' 
                  : stats.length === 2 
                  ? 'grid-cols-1 sm:grid-cols-2' 
                  : 'grid-cols-1 sm:grid-cols-3'
              }`}>
                {stats.map((stat, index) => (
                  <div key={stat.label || index} className="flex flex-col items-center">
                    <dt className="text-4xl font-bold" style={{ color: '#d9b451' }}>{stat.value}</dt>
                    <dd className="mt-2 text-sm text-gray-300">{stat.label}</dd>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Buttons Section */}
        <div className="mt-10 flex justify-center items-center flex-wrap gap-4">
          {primaryButton && (
            <Link
              to={primaryButton.link}
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-sm font-semibold rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900"
              style={{ 
                backgroundColor: '#d9b451', 
                color: '#170d5c',
                '--tw-ring-color': '#d9b451'
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#c4a23a'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#d9b451'}
            >
              {primaryButton.text}
              {primaryButton.Icon && <primaryButton.Icon className="ml-2 h-5 w-5" />}
            </Link>
          )}
          {secondaryButton && (
            <Link
              to={secondaryButton.link}
              className="inline-flex items-center justify-center px-6 py-3 border-2 text-sm font-semibold rounded-full text-white bg-transparent transition-all duration-300 transform hover:scale-105 shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900"
              style={{ 
                borderColor: '#d9b451', 
                '--tw-ring-color': '#d9b451'
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(217, 180, 81, 0.1)'}
              onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
            >
              {secondaryButton.text}
              {secondaryButton.Icon && <secondaryButton.Icon className="ml-2 h-5 w-5" />}
            </Link>
          )}
        </div>

        {/* Footer Text */}
        {footerText && (
          <p className="mt-6 text-xs text-gray-400">{footerText}</p>
        )}
      </div>
    </div>
  );
};

export default CallToAction;