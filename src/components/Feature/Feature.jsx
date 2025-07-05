import React from "react";

const Feature = ({
  title,
  subtitle,
  features,
  image,
  stat,
  buttons,
  reverse = false,
  layout = "features", // 'features' or 'hero'
  theme = {
    bgColor: "bg-white",
    titleColor: "text-gray-900",
    subtitleColor: "text-gray-600",
    featureNumberBg: "bg-yellow-100",
    featureNumberColor: "text-yellow-600",
    featureTitleColor: "text-gray-900",
    featureDescriptionColor: "text-gray-500",
    primaryButtonBg: "bg-yellow-400",
    primaryButtonText: "text-black",
    primaryButtonHover: "hover:bg-yellow-500",
    secondaryButtonBg: "bg-transparent",
    secondaryButtonText: "text-white",
    secondaryButtonBorder: "border-white",
    secondaryButtonHover: "hover:bg-white hover:text-gray-900",
    decorativeAccent: "bg-yellow-100",
  },
}) => {
  const textOrder = reverse ? "md:order-last" : "";
  const imageOrder = reverse ? "md:order-first" : "";

  // Hero layout for landing page style
  if (layout === "hero") {
    return (
      <div
        className={`min-h-screen relative flex items-center ${theme.bgColor} overflow-hidden`}
      >
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl animate-pulse"
            style={{ backgroundColor: "rgba(23, 13, 92, 0.1)" }}
          />
          <div
            className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full blur-3xl animate-pulse delay-1000"
            style={{ backgroundColor: "rgba(217, 180, 81, 0.1)" }}
          />
          <div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-3xl animate-spin"
            style={{
              animationDuration: "20s",
              background:
                "linear-gradient(to right, rgba(23, 13, 92, 0.05), rgba(217, 180, 81, 0.05))",
            }}
          />
        </div>

        {/* Floating Particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 rounded-full animate-bounce"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${3 + Math.random() * 2}s`,
                backgroundColor:
                  i % 2 === 0
                    ? "rgba(23, 13, 92, 0.3)"
                    : "rgba(217, 180, 81, 0.3)",
              }}
            />
          ))}
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-20 gap-y-16 items-center">
            {/* Text Content */}
            <div className={`relative space-y-10 ${textOrder}`}>
              <div className="relative animate-fade-in-up">
                <div className="mb-6">
                  <span
                    className="inline-block px-4 py-2 backdrop-blur-sm border rounded-full text-sm font-semibold tracking-wide animate-glow"
                    style={{
                      backgroundColor: "rgba(217, 180, 81, 0.2)",
                      borderColor: "rgba(217, 180, 81, 0.3)",
                      color: "#d9b451",
                    }}
                  >
                    PREMIUM LAUNDRY SERVICE
                  </span>
                </div>

                <h1
                  className="text-4xl md:text-5xl lg:text-7xl font-bold leading-[0.9] animate-slide-up"
                  style={{ color: "#f8f9fa" }}
                >
                  {(() => {
                    // Replace the first '.' with a comma, keep the rest as is
                    if (!title) return null;
                    const firstDot = title.indexOf(".");
                    if (firstDot === -1) return title;
                    return (
                      <>
                        {title.slice(0, firstDot)},
                        <br />
                        {title.slice(firstDot + 1)}
                      </>
                    );
                  })()}
                </h1>

                {subtitle && (
                  <p
                    className="mt-8 text-xl leading-relaxed max-w-lg animate-fade-in opacity-0"
                    style={{
                      animationDelay: "0.6s",
                      animationFillMode: "forwards",
                      color: "#fff",
                    }}
                  >
                    {subtitle}
                  </p>
                )}

                {/* Buttons */}
                {buttons && buttons.length > 0 && (
                  <div
                    className="mt-12 flex flex-col sm:flex-row gap-6 animate-fade-in opacity-0"
                    style={{
                      animationDelay: "0.8s",
                      animationFillMode: "forwards",
                    }}
                  >
                    {buttons.map((button, index) => {
                      // Determine the route based on button text
                      const getRoute = (text) => {
                        if (
                          text.toLowerCase().includes("subscribe") ||
                          text.toLowerCase().includes("book")
                        ) {
                          return "/subscription";
                        } else if (
                          text.toLowerCase().includes("how") &&
                          text.toLowerCase().includes("work")
                        ) {
                          return "/services";
                        }
                        return "#"; // fallback
                      };

                      return (
                        <button
                          key={index}
                          onClick={() =>
                            (window.location.href = getRoute(button.text))
                          }
                          className={`group relative px-8 py-4 font-semibold text-base transition-all duration-500 flex items-center justify-center gap-3 min-w-[180px] overflow-hidden rounded-xl transform hover:-translate-y-1 hover:scale-105 ${
                            button.variant === "primary"
                              ? "shadow-lg hover:shadow-xl"
                              : "border-2 backdrop-blur-sm hover:bg-white/10"
                          }`}
                          style={{
                            backgroundColor:
                              button.variant === "primary"
                                ? "#d9b451"
                                : "transparent",
                            borderColor:
                              button.variant === "primary"
                                ? "transparent"
                                : "white",
                            color:
                              button.variant === "primary" ? "black" : "white",
                            boxShadow:
                              button.variant === "primary"
                                ? "0 10px 25px -5px rgba(217, 180, 81, 0.25)"
                                : "none",
                          }}
                        >
                          <span className="relative z-10">{button.text}</span>
                          {button.icon && (
                            <button.icon className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                          )}
                          {button.variant === "primary" && (
                            <div
                              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"
                              style={{
                                background:
                                  "linear-gradient(to right, #d9b451, #d9b451dd)",
                              }}
                            />
                          )}
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* Stats/Features for hero */}
                {features && (
                  <div
                    className="mt-16 grid grid-cols-1 sm:grid-cols-2 gap-6 animate-fade-in opacity-0"
                    style={{
                      animationDelay: "1s",
                      animationFillMode: "forwards",
                    }}
                  >
                    {features.slice(0, 4).map((feature, index) => (
                      <div key={index} className="flex items-center group">
                        <div
                          className="flex items-center justify-center h-8 w-8 rounded-lg mr-4 transition-transform duration-300 group-hover:scale-110"
                          style={{ backgroundColor: "rgba(217, 180, 81, 0.1)" }}
                        >
                          <svg
                            className="w-5 h-5"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            style={{ color: "#d9b451" }}
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                        <span
                          className="font-medium text-lg"
                          style={{ color: "#f8f9fa" }}
                        >
                          {feature.title || feature}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Image Content */}
            <div
              className={`relative ${imageOrder} animate-fade-in-right opacity-0`}
              style={{ animationDelay: "0.4s", animationFillMode: "forwards" }}
            >
              {/* Floating elements around image */}
              <div
                className="absolute -top-8 -right-8 w-20 h-20 rounded-full blur-xl animate-pulse"
                style={{ backgroundColor: "rgba(217, 180, 81, 0.2)" }}
              />
              <div
                className="absolute -bottom-8 -left-8 w-16 h-16 rounded-full blur-xl animate-pulse delay-500"
                style={{ backgroundColor: "rgba(23, 13, 92, 0.2)" }}
              />

              <div className="relative group">
                {/* Image container with hover effects */}
                <div className="relative overflow-hidden rounded-3xl shadow-2xl shadow-black/20 transform transition-all duration-700 group-hover:scale-105 group-hover:rotate-1">
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"
                    style={{
                      background:
                        "linear-gradient(to top right, rgba(23, 13, 92, 0.2), rgba(217, 180, 81, 0.2))",
                    }}
                  />
                  <img
                    className="relative w-full h-[550px] object-cover transition-transform duration-700 group-hover:scale-110"
                    src={image.src}
                    alt={image.alt}
                  />

                  {/* Glossy overlay effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-60" />
                </div>

                {/* Floating stat card */}
                {stat && (
                  <div className="absolute -bottom-6 -left-6 z-20">
                    <div className="bg-white/95 backdrop-blur-xl rounded-2xl p-6 shadow-2xl border border-white/20 min-w-[200px] group-hover:shadow-3xl transition-all duration-500">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-2xl font-bold text-gray-900 mb-1">
                            {stat.value}
                          </p>
                          <p className="text-sm text-gray-600 font-medium">
                            {stat.label}
                          </p>
                        </div>
                        <div
                          className="w-12 h-12 rounded-xl flex items-center justify-center"
                          style={{
                            background:
                              "linear-gradient(to bottom right, #d9b451, #d9b451dd)",
                          }}
                        >
                          <svg
                            className="w-6 h-6 text-white"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Decorative elements */}
                <div
                  className="absolute top-1/2 -right-12 w-24 h-1 animate-pulse"
                  style={{
                    background:
                      "linear-gradient(to right, #d9b451, transparent)",
                  }}
                />
                <div
                  className="absolute top-1/3 -left-12 w-20 h-1 animate-pulse delay-300"
                  style={{
                    background:
                      "linear-gradient(to left, #170d5c, transparent)",
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        <style jsx>{`
          @keyframes fade-in-up {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          @keyframes slide-up {
            from {
              opacity: 0;
              transform: translateY(50px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          @keyframes fade-in {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }
          @keyframes fade-in-right {
            from {
              opacity: 0;
              transform: translateX(50px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }
          @keyframes glow {
            0%,
            100% {
              box-shadow: 0 0 20px rgba(217, 180, 81, 0.3);
            }
            50% {
              box-shadow: 0 0 30px rgba(217, 180, 81, 0.5);
            }
          }
          @keyframes float {
            0%,
            100% {
              transform: translateY(0px);
            }
            50% {
              transform: translateY(-10px);
            }
          }
          .animate-fade-in-up {
            animation: fade-in-up 0.8s ease-out forwards;
          }
          .animate-slide-up {
            animation: slide-up 0.8s ease-out forwards;
          }
          .animate-fade-in {
            animation: fade-in 0.8s ease-out forwards;
          }
          .animate-fade-in-right {
            animation: fade-in-right 0.8s ease-out forwards;
          }
          .animate-glow {
            animation: glow 2s ease-in-out infinite;
          }
          .animate-float {
            animation: float 3s ease-in-out infinite;
          }
        `}</style>
      </div>
    );
  }

  // Default features layout
  return (
    <div className={`py-24 ${theme.bgColor} overflow-hidden`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-20 items-center">
          {/* Text Content */}
          <div className={`relative space-y-10 ${textOrder}`}>
            {/* Animated Decorative Accent */}
            <div
              className="absolute -top-1/4 -left-1/4 w-full h-full rounded-full opacity-20 blur-3xl animate-pulse"
              style={{ backgroundColor: "rgba(217, 180, 81, 0.1)" }}
            />

            <div className="relative animate-fade-in-up">
              <h2
                className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 leading-tight tracking-tight min-h-[4rem] flex items-center justify-center animate-fade-in-up"
                style={{
                  color: theme.customTitleStyle?.color || "#f8f9fa",
                }}
              >
                {title}
              </h2>

              {subtitle && (
                <p
                  className="mt-4 text-lg animate-fade-in opacity-0"
                  style={{
                    animationDelay: "0.2s",
                    animationFillMode: "forwards",
                    color: "#6b7280",
                  }}
                >
                  {subtitle}
                </p>
              )}

              {/* Buttons for features layout */}
              {buttons && buttons.length > 0 && (
                <div
                  className="mt-8 flex flex-col sm:flex-row gap-4 animate-fade-in opacity-0"
                  style={{
                    animationDelay: "0.4s",
                    animationFillMode: "forwards",
                  }}
                >
                  {buttons.map((button, index) => {
                    // Determine the route based on button text
                    const getRoute = (text) => {
                      if (
                        text.toLowerCase().includes("subscribe") ||
                        text.toLowerCase().includes("book")
                      ) {
                        return "/subscription";
                      } else if (
                        text.toLowerCase().includes("how") &&
                        text.toLowerCase().includes("work")
                      ) {
                        return "/services";
                      }
                      return "#"; // fallback
                    };

                    return (
                      <button
                        key={index}
                        onClick={() =>
                          (window.location.href = getRoute(button.text))
                        }
                        className={`group px-6 py-3 rounded-lg font-semibold transition-all duration-500 flex items-center justify-center gap-2 transform hover:-translate-y-1 hover:scale-105 ${
                          button.variant === "primary"
                            ? "shadow-md hover:shadow-lg"
                            : "border-2 hover:scale-105"
                        }`}
                        style={{
                          backgroundColor:
                            button.variant === "primary"
                              ? "#d9b451"
                              : "transparent",
                          color:
                            button.variant === "primary" ? "black" : "white",
                          borderColor:
                            button.variant === "primary"
                              ? "transparent"
                              : "white",
                        }}
                      >
                        {button.text}
                        {button.icon && (
                          <button.icon className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                        )}
                      </button>
                    );
                  })}
                </div>
              )}

              <div className="mt-10 space-y-8">
                {features &&
                  features.map((feature, index) => (
                    <div
                      key={index}
                      className="flex group cursor-pointer animate-fade-in opacity-0 hover:transform hover:translate-x-2 transition-all duration-300"
                      style={{
                        animationDelay: `${0.6 + index * 0.1}s`,
                        animationFillMode: "forwards",
                      }}
                    >
                      <div className="flex-shrink-0">
                        <div
                          className="flex items-center justify-center h-10 w-10 rounded-full font-bold transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg"
                          style={{
                            backgroundColor: "rgba(217, 180, 81, 0.1)",
                            color: "#d9b451",
                          }}
                        >
                          {index + 1}
                        </div>
                      </div>
                      <div className="ml-4">
                        <h3
                          className="text-lg leading-6 font-bold transition-colors duration-300"
                          style={{ color: "#6b7280" }}
                        >
                          {feature.title}
                        </h3>
                        <p
                          className="mt-2 text-sm transition-colors duration-300"
                          style={{ color: "#6b7280" }}
                        >
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>

          {/* Image Content */}
          <div
            className={`relative mt-10 md:mt-0 ${imageOrder} animate-fade-in-right opacity-0`}
            style={{ animationDelay: "0.3s", animationFillMode: "forwards" }}
          >
            <div className="relative w-10/12 mx-auto">
              {/* Subtle floating elements */}
              <div
                className="absolute -top-4 -right-4 w-8 h-8 rounded-full animate-pulse"
                style={{ backgroundColor: "rgba(217, 180, 81, 0.2)" }}
              />
              <div
                className="absolute -bottom-4 -left-4 w-6 h-6 rounded-full animate-pulse delay-500"
                style={{ backgroundColor: "rgba(23, 13, 92, 0.2)" }}
              />

              <div className="relative group">
                <img
                  className="relative rounded-2xl shadow-2xl w-full h-auto object-cover z-10 transition-transform duration-500 group-hover:scale-105 animate-float"
                  src={image.src}
                  alt={image.alt}
                />

                {/* Subtle hover overlay */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl z-20"
                  style={{
                    background:
                      "linear-gradient(to bottom right, rgba(23, 13, 92, 0.1), rgba(217, 180, 81, 0.1))",
                  }}
                />

                {stat && (
                  <div
                    className="absolute bottom-0 left-0 transform translate-y-1/4 -translate-x-1/4 z-30 animate-float"
                    style={{ animationDelay: "1s" }}
                  >
                    <div
                      className="w-40 h-40 rounded-full backdrop-blur-xl border-2 border-white/30 flex flex-col items-center justify-center text-center shadow-2xl transition-all duration-500 hover:scale-110 hover:shadow-3xl"
                      style={{
                        background:
                          "linear-gradient(to bottom right, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.2))",
                      }}
                    >
                      <p className="text-4xl font-bold text-white">
                        {stat.value}
                      </p>
                      <p className="mt-1 text-xs text-white/90 max-w-[80px] font-medium">
                        {stat.label}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes fade-in-right {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-8px);
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
        }
        .animate-fade-in-right {
          animation: fade-in-right 0.6s ease-out forwards;
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default Feature;
