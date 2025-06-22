import TestimonialCard from "../TestimonialsCard/TestimonialsCard";

const TestimonialsSection = ({ 
  title = "What Our Customers Say",
  subtitle = "Hear from families and professionals who trust our service.",
  className = "",
  containerClassName = "",
  showDecorations = true
}) => {
  // Testimonials data directly in the component
  const testimonials = [
    {
      rating: 5,
      testimonial: "FarrariGo has transformed my weekly routine. The quality is exceptional and the convenience is unmatched.",
      name: "Sarah Al-Ahmad",
      title: "Verified Customer",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b332c1f2?w=150&h=150&fit=crop&crop=face"
    },
    {
      rating: 5,
      testimonial: "Professional service with attention to detail. My business shirts have never looked better.",
      name: "Mohammed Hassan",
      title: "Verified Customer",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
    },
    {
      rating: 5,
      testimonial: "The subscription model works perfectly for our family. Reliable, premium quality every time.",
      name: "Fatima Al-Zahra",
      title: "Verified Customer",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
    }
  ];

  return (
    <div className={`min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30 relative overflow-hidden py-20 ${className}`}>
      {/* Subtle Background Elements */}
      {showDecorations && (
        <>
          <div className="absolute inset-0">
            <div className="absolute top-20 left-20 w-72 h-72 bg-blue-100/30 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-100/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-emerald-100/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
          </div>

          {/* Floating particles */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-blue-300/30 rounded-full animate-pulse"
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

      <div className={`relative z-10 container mx-auto px-6 ${containerClassName}`}>
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent mb-4 leading-tight tracking-tight">
            {title}
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed font-medium mt-6 transform transition-all duration-1000 delay-300">
            {subtitle}
          </p>
          <div className="mt-8 w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              rating={testimonial.rating}
              testimonial={testimonial.testimonial}
              name={testimonial.name}
              title={testimonial.title}
              avatar={testimonial.avatar}
              delay={index * 200}
            />
          ))}
        </div>

        {/* Bottom decoration */}
        {showDecorations && testimonials.length > 0 && (
          <div className="mt-20 flex justify-center">
            <div className="flex space-x-2">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 animate-pulse"
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

export default TestimonialsSection;