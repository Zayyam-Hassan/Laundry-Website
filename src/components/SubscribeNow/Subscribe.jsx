import React, { useState, useEffect } from "react";
import { AlertCircle, CheckCircle2, Calendar, Sparkles } from "lucide-react";

const PickupScheduleForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    pickupAddress: "",
    serviceInterested: "",
    preferredPickupDate: "",
    preferredTimeSlot: "",
    specialInstructions: "",
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const serviceOptions = [
    "Select Service",
    "Regular Laundry",
    "Dry Cleaning",
    "Wash & Fold",
    "Delicate Care",
    "Bedding & Linens",
    "Alterations",
    "Stain Removal",
    "Express Service",
  ];

  const timeSlotOptions = [
    "Select Time Slot",
    "8:00 AM - 10:00 AM",
    "10:00 AM - 12:00 PM",
    "12:00 PM - 2:00 PM",
    "2:00 PM - 4:00 PM",
    "4:00 PM - 6:00 PM",
    "6:00 PM - 8:00 PM",
  ];

  // Input sanitization functions
  const sanitizeTextInput = (value, allowNumbers = false) => {
    if (allowNumbers) {
      return value.replace(/[^a-zA-Z0-9\s&.,'-]/g, "");
    } else {
      return value.replace(/[^a-zA-Z\s'-]/g, "");
    }
  };

  const sanitizePhoneInput = (value) => {
    return value.replace(/[^0-9\s\-\(\)\+]/g, "");
  };

  const sanitizeEmailInput = (value) => {
    return value.replace(/[^a-zA-Z0-9@._-]/g, "").toLowerCase();
  };

  const sanitizeAddressInput = (value) => {
    return value.replace(/[^a-zA-Z0-9\s&.,'#/-]/g, "");
  };

  const validateField = (name, value, isSubmit = false) => {
    switch (name) {
      case "fullName":
        if (isSubmit && !value.trim()) return "Full name is required";
        if (value.trim() && value.trim().length > 50)
          return "Name must be less than 50 characters";
        if (value.trim() && value.trim().length < 2)
          return "Name must be at least 2 characters";
        return "";

      case "email":
        if (isSubmit && !value.trim()) return "Email address is required";
        if (value.trim()) {
          const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
          if (!emailRegex.test(value.trim()))
            return "Please enter a valid email address";
          if (value.length > 254) return "Email address is too long";
        }
        return "";

      case "phoneNumber":
        if (isSubmit && !value.trim()) return "Phone number is required";
        if (value.trim()) {
          const cleanPhone = value.replace(/[\s\-\(\)]/g, "");
          if (!/^\+?[1-9]\d{7,14}$/.test(cleanPhone))
            return "Please enter a valid phone number (8-15 digits)";
        }
        return "";

      case "pickupAddress":
        if (isSubmit && !value.trim()) return "Pickup address is required";
        if (value.trim() && value.trim().length > 200)
          return "Address must be less than 200 characters";
        if (value.trim() && value.trim().length < 10)
          return "Please enter a complete address";
        return "";

      case "serviceInterested":
        if (isSubmit && (!value || value === "" || value === "Select Service"))
          return "Please select a service";
        return "";

      case "preferredPickupDate":
        if (isSubmit && !value.trim())
          return "Please select your preferred pickup date";
        if (value.trim()) {
          const selectedDate = new Date(value);
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          if (selectedDate < today) return "Pickup date cannot be in the past";

          // Check if date is more than 30 days in future
          const thirtyDaysFromNow = new Date();
          thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30);
          if (selectedDate > thirtyDaysFromNow)
            return "Please select a date within the next 30 days";
        }
        return "";

      case "preferredTimeSlot":
        if (
          isSubmit &&
          (!value || value === "" || value === "Select Time Slot")
        )
          return "Please select a preferred time slot";
        return "";

      case "specialInstructions":
        if (value.length > 500)
          return "Special instructions must be less than 500 characters";
        return "";

      default:
        return "";
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let sanitizedValue = value;

    // Apply input sanitization based on field type
    switch (name) {
      case "fullName":
        sanitizedValue = sanitizeTextInput(value);
        break;
      case "email":
        sanitizedValue = sanitizeEmailInput(value);
        break;
      case "phoneNumber":
        sanitizedValue = sanitizePhoneInput(value);
        break;
      case "pickupAddress":
        sanitizedValue = sanitizeAddressInput(value);
        break;
      case "specialInstructions":
        sanitizedValue = value.replace(/[<>]/g, "");
        break;
      default:
        break;
    }

    setFormData((prev) => ({ ...prev, [name]: sanitizedValue }));

    if (touched[name]) {
      const error = validateField(name, sanitizedValue);
      setErrors((prev) => ({ ...prev, [name]: error }));
    }
  };

  const handleKeyPress = (e, fieldName) => {
    const char = e.key;

    switch (fieldName) {
      case "fullName":
        if (
          !/[a-zA-Z\s'-]/.test(char) &&
          !["Backspace", "Delete", "ArrowLeft", "ArrowRight", "Tab"].includes(
            char
          )
        ) {
          e.preventDefault();
        }
        break;
      case "phoneNumber":
        if (
          !/[0-9\s\-\(\)\+]/.test(char) &&
          !["Backspace", "Delete", "ArrowLeft", "ArrowRight", "Tab"].includes(
            char
          )
        ) {
          e.preventDefault();
        }
        break;
      case "email":
        if (
          !/[a-zA-Z0-9@._-]/.test(char) &&
          !["Backspace", "Delete", "ArrowLeft", "ArrowRight", "Tab"].includes(
            char
          )
        ) {
          e.preventDefault();
        }
        break;
      default:
        break;
    }
  };

  const handlePaste = (e, fieldName) => {
    e.preventDefault();
    const paste = (e.clipboardData || window.clipboardData).getData("text");
    let sanitizedPaste = paste;

    switch (fieldName) {
      case "fullName":
        sanitizedPaste = sanitizeTextInput(paste);
        break;
      case "email":
        sanitizedPaste = sanitizeEmailInput(paste);
        break;
      case "phoneNumber":
        sanitizedPaste = sanitizePhoneInput(paste);
        break;
      case "pickupAddress":
        sanitizedPaste = sanitizeAddressInput(paste);
        break;
      default:
        break;
    }

    const target = e.target;
    const start = target.selectionStart;
    const end = target.selectionEnd;
    const currentValue = target.value;
    const newValue =
      currentValue.substring(0, start) +
      sanitizedPaste +
      currentValue.substring(end);

    setFormData((prev) => ({ ...prev, [fieldName]: newValue }));

    const error = validateField(fieldName, newValue);
    setErrors((prev) => ({ ...prev, [fieldName]: error }));
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    if (value.trim() !== "") {
      setTouched((prev) => ({ ...prev, [name]: true }));
      const error = validateField(name, value);
      setErrors((prev) => ({ ...prev, [name]: error }));
    } else {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key], true);
      if (error) newErrors[key] = error;
    });
    return newErrors;
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    const formErrors = validateForm();

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      setTouched(
        Object.keys(formData).reduce(
          (acc, key) => ({ ...acc, [key]: true }),
          {}
        )
      );
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);

      // Reset form after successful submission
      setFormData({
        fullName: "",
        email: "",
        phoneNumber: "",
        pickupAddress: "",
        serviceInterested: "",
        preferredPickupDate: "",
        preferredTimeSlot: "",
        specialInstructions: "",
      });
      setTouched({});
      setErrors({});
    }, 2000);
  };

  const getFieldClasses = (fieldName) => {
    const baseClasses =
      "w-full px-4 py-3 bg-white/5 backdrop-blur-sm border-2 rounded-xl transition-all duration-300 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-0";

    if (errors[fieldName] && touched[fieldName]) {
      return `${baseClasses} border-red-400 focus:border-red-500 shadow-lg shadow-red-500/20 animate-shake`;
    } else {
      return `${baseClasses} border-gray-200 focus:border-blue-400 hover:border-gray-300 focus:shadow-lg focus:shadow-blue-500/20 hover:shadow-md hover:shadow-blue-400/10`;
    }
  };

  // Get minimum date (today)
  const getMinDate = () => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  };

  // Get maximum date (30 days from now)
  const getMaxDate = () => {
    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 30);
    return maxDate.toISOString().split("T")[0];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100 p-4 flex items-center justify-center">
      <div className="w-full max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8 relative mt-4">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-indigo-600/20 blur-3xl rounded-full animate-pulse"></div>
          <div className="relative">
            <div className="relative inline-block">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent mb-4 leading-tight tracking-tight">
                Schedule Your First Pickup
              </h1>
              {/* Animated underline */}
              <div
                className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-full transition-all duration-1000 delay-500"
                style={{ width: "50%" }}
              />
            </div>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed font-medium mt-6">
              Tell us about your laundry needs and we'll take care of the rest.
            </p>
          </div>
        </div>

        {/* Success Message */}
        {showSuccess && (
          <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 flex items-center animate-slide-in">
            <CheckCircle2 className="mr-2" size={20} />
            Pickup scheduled successfully! We'll contact you within 2 hours to
            confirm.
          </div>
        )}

        {/* Form */}
        <div className="bg-white/70 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-white/20">
          {/* Personal Information Section */}
          <div className="mb-8">
            <div className="flex items-center mb-6">
              <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center text-white font-bold text-sm mr-3">
                1
              </div>
              <h2 className="text-xl font-bold text-gray-800">
                Personal Information
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Full Name */}
              <div className="relative">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  onKeyPress={(e) => handleKeyPress(e, "fullName")}
                  onPaste={(e) => handlePaste(e, "fullName")}
                  placeholder="Your Full Name"
                  maxLength={50}
                  className={getFieldClasses("fullName")}
                />
                {errors.fullName && touched.fullName && (
                  <div className="flex items-center mt-2 text-red-500 text-sm animate-fade-in">
                    <AlertCircle size={16} className="mr-1" />
                    {errors.fullName}
                  </div>
                )}
              </div>

              {/* Email Address */}
              <div className="relative">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  onKeyPress={(e) => handleKeyPress(e, "email")}
                  onPaste={(e) => handlePaste(e, "email")}
                  placeholder="your@email.com"
                  maxLength={254}
                  className={getFieldClasses("email")}
                />
                {errors.email && touched.email && (
                  <div className="flex items-center mt-2 text-red-500 text-sm animate-fade-in">
                    <AlertCircle size={16} className="mr-1" />
                    {errors.email}
                  </div>
                )}
              </div>

              {/* Phone Number */}
              <div className="relative">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  onKeyPress={(e) => handleKeyPress(e, "phoneNumber")}
                  onPaste={(e) => handlePaste(e, "phoneNumber")}
                  placeholder="+965 XXXX XXXX"
                  maxLength={20}
                  className={getFieldClasses("phoneNumber")}
                />
                {errors.phoneNumber && touched.phoneNumber && (
                  <div className="flex items-center mt-2 text-red-500 text-sm animate-fade-in">
                    <AlertCircle size={16} className="mr-1" />
                    {errors.phoneNumber}
                  </div>
                )}
              </div>

              {/* Pickup Address */}
              <div className="relative">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Pickup Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="pickupAddress"
                  value={formData.pickupAddress}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  onPaste={(e) => handlePaste(e, "pickupAddress")}
                  placeholder="Your Full Address"
                  maxLength={200}
                  className={getFieldClasses("pickupAddress")}
                />
                {errors.pickupAddress && touched.pickupAddress && (
                  <div className="flex items-center mt-2 text-red-500 text-sm animate-fade-in">
                    <AlertCircle size={16} className="mr-1" />
                    {errors.pickupAddress}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Service Preferences Section */}
          <div className="mb-8">
            <div className="flex items-center mb-6">
              <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center text-white font-bold text-sm mr-3">
                2
              </div>
              <h2 className="text-xl font-bold text-gray-800">
                Service Preferences
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Service Interested In */}
              <div className="relative">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Service Interested In <span className="text-red-500">*</span>
                </label>
                <select
                  name="serviceInterested"
                  value={formData.serviceInterested}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  className={getFieldClasses("serviceInterested")}
                >
                  {serviceOptions.map((service, index) => (
                    <option key={index} value={index === 0 ? "" : service}>
                      {service}
                    </option>
                  ))}
                </select>
                {errors.serviceInterested && touched.serviceInterested && (
                  <div className="flex items-center mt-2 text-red-500 text-sm animate-fade-in">
                    <AlertCircle size={16} className="mr-1" />
                    {errors.serviceInterested}
                  </div>
                )}
              </div>

              {/* Preferred Pickup Date */}
              <div className="relative">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Preferred Pickup Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  name="preferredPickupDate"
                  value={formData.preferredPickupDate}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  min={getMinDate()}
                  max={getMaxDate()}
                  className={getFieldClasses("preferredPickupDate")}
                />
                {errors.preferredPickupDate && touched.preferredPickupDate && (
                  <div className="flex items-center mt-2 text-red-500 text-sm animate-fade-in">
                    <AlertCircle size={16} className="mr-1" />
                    {errors.preferredPickupDate}
                  </div>
                )}
              </div>

              {/* Preferred Time Slot */}
              <div className="relative md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Preferred Time Slot <span className="text-red-500">*</span>
                </label>
                <select
                  name="preferredTimeSlot"
                  value={formData.preferredTimeSlot}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  className={getFieldClasses("preferredTimeSlot")}
                >
                  {timeSlotOptions.map((slot, index) => (
                    <option key={index} value={index === 0 ? "" : slot}>
                      {slot}
                    </option>
                  ))}
                </select>
                {errors.preferredTimeSlot && touched.preferredTimeSlot && (
                  <div className="flex items-center mt-2 text-red-500 text-sm animate-fade-in">
                    <AlertCircle size={16} className="mr-1" />
                    {errors.preferredTimeSlot}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Additional Information Section */}
          <div className="mb-8">
            <div className="flex items-center mb-6">
              <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center text-white font-bold text-sm mr-3">
                3
              </div>
              <h2 className="text-xl font-bold text-gray-800">
                Additional Information
              </h2>
            </div>

            <div className="relative">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Special Instructions or Requests
              </label>
              <textarea
                name="specialInstructions"
                value={formData.specialInstructions}
                onChange={handleInputChange}
                onBlur={handleBlur}
                placeholder="Any specific care instructions, allergies, or special requests..."
                rows={4}
                maxLength={500}
                className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border-2 border-gray-200 rounded-xl transition-all duration-300 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-0 focus:border-blue-400 hover:border-gray-300 focus:shadow-lg focus:shadow-blue-500/20 hover:shadow-md hover:shadow-blue-400/10 resize-none"
              />
              {errors.specialInstructions && (
                <div className="flex items-center mt-2 text-red-500 text-sm animate-fade-in">
                  <AlertCircle size={16} className="mr-1" />
                  {errors.specialInstructions}
                </div>
              )}
              <div className="text-right text-sm text-gray-500 mt-1">
                {formData.specialInstructions.length}/500 characters
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="relative inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-gray-800 font-bold rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-yellow-500/30 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none min-w-[220px] animate-pulse-glow"
            >
              {isSubmitting ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-gray-800 border-t-transparent mr-2"></div>
                  Scheduling...
                </div>
              ) : (
                <div className="flex items-center">
                  <Calendar className="mr-2" size={20} />
                  Schedule My Pickup
                </div>
              )}

              <div className="absolute inset-0 bg-gradient-to-r from-yellow-300 to-yellow-400 rounded-2xl opacity-0 hover:opacity-100 transition-opacity duration-300 -z-10 blur-xl"></div>
            </button>

            <p className="text-sm text-gray-600 mt-4">
              We'll contact you within 2 hours to confirm your appointment
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slide-in {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes shake {
          0%,
          100% {
            transform: translateX(0);
          }
          25% {
            transform: translateX(-5px);
          }
          75% {
            transform: translateX(5px);
          }
        }
        @keyframes pulse-glow {
          0%,
          100% {
            box-shadow: 0 0 20px rgba(255, 235, 59, 0.3);
          }
          50% {
            box-shadow: 0 0 30px rgba(255, 235, 59, 0.5),
              0 0 40px rgba(255, 235, 59, 0.2);
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
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
        .animate-pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite;
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default PickupScheduleForm;
