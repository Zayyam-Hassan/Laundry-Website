import React, { useState, useRef } from 'react';
import { AlertCircle, CheckCircle2, Send, MapPin, Phone, Mail, Clock, MessageCircle } from 'lucide-react';

const GetInTouchForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const subjectOptions = [
    'Select Subject',
    'General Inquiry',
    'Service Request',
    'Pickup Schedule',
    'Pricing Information',
    'Special Care Instructions',
    'Complaint or Feedback',
    'Partnership Opportunity',
    'Other'
  ];

  // Input sanitization functions
  const sanitizeTextInput = (value, allowNumbers = false) => {
    if (allowNumbers) {
      return value.replace(/[^a-zA-Z0-9\s&.,'-]/g, '');
    } else {
      return value.replace(/[^a-zA-Z\s'-]/g, '');
    }
  };

  const sanitizePhoneInput = (value) => {
    return value.replace(/[^0-9\s\-\(\)\+]/g, '');
  };

  const sanitizeEmailInput = (value) => {
    return value.replace(/[^a-zA-Z0-9@._-]/g, '').toLowerCase();
  };

  const validateField = (name, value, isSubmit = false) => {
    switch (name) {
      case 'fullName':
        if (isSubmit && !value.trim()) return 'Full name is required';
        if (value.trim() && value.trim().length > 50) return 'Name must be less than 50 characters';
        return '';
      case 'email':
        if (isSubmit && !value.trim()) return 'Email address is required';
        if (value.trim()) {
          const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
          if (!emailRegex.test(value.trim())) return 'Please enter a valid email address';
          if (value.length > 254) return 'Email address is too long';
        }
        return '';
      case 'phone':
        if (isSubmit && !value.trim()) return 'Phone number is required';
        if (value.trim()) {
          const cleanPhone = value.replace(/[\s\-\(\)]/g, '');
          if (!/^\+?[1-9]\d{7,14}$/.test(cleanPhone)) return 'Please enter a valid phone number (8-15 digits)';
        }
        return '';
      case 'subject':
        if (isSubmit && (!value || value === '' || value === 'Select Subject')) return 'Please select a subject';
        return '';
      case 'message':
        if (isSubmit && !value.trim()) return 'Message is required';
        if (value.length > 1000) return 'Message must be less than 1000 characters';
        return '';
      default:
        return '';
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let sanitizedValue = value;

    switch (name) {
      case 'fullName':
        sanitizedValue = sanitizeTextInput(value);
        break;
      case 'email':
        sanitizedValue = sanitizeEmailInput(value);
        break;
      case 'phone':
        sanitizedValue = sanitizePhoneInput(value);
        break;
      case 'message':
        sanitizedValue = value.replace(/[<>]/g, '');
        break;
      default:
        break;
    }

    setFormData(prev => ({ ...prev, [name]: sanitizedValue }));

    if (touched[name]) {
      const error = validateField(name, sanitizedValue);
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  };

  const handleKeyPress = (e, fieldName) => {
    const char = e.key;
    switch (fieldName) {
      case 'fullName':
        if (!/[a-zA-Z\s'-]/.test(char) && !['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab'].includes(char)) {
          e.preventDefault();
        }
        break;
      case 'phone':
        if (!/[0-9\s\-\(\)\+]/.test(char) && !['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab'].includes(char)) {
          e.preventDefault();
        }
        break;
      case 'email':
        if (!/[a-zA-Z0-9@._-]/.test(char) && !['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab'].includes(char)) {
          e.preventDefault();
        }
        break;
      default:
        break;
    }
  };

  const handlePaste = (e, fieldName) => {
    e.preventDefault();
    const paste = (e.clipboardData || window.clipboardData).getData('text');
    let sanitizedPaste = paste;

    switch (fieldName) {
      case 'fullName':
        sanitizedPaste = sanitizeTextInput(paste);
        break;
      case 'email':
        sanitizedPaste = sanitizeEmailInput(paste);
        break;
      case 'phone':
        sanitizedPaste = sanitizePhoneInput(paste);
        break;
      default:
        break;
    }

    const target = e.target;
    const start = target.selectionStart;
    const end = target.selectionEnd;
    const currentValue = target.value;
    const newValue = currentValue.substring(0, start) + sanitizedPaste + currentValue.substring(end);

    setFormData(prev => ({ ...prev, [fieldName]: newValue }));

    const error = validateField(fieldName, newValue);
    setErrors(prev => ({ ...prev, [fieldName]: error }));
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    if (value.trim() !== '') {
      setTouched(prev => ({ ...prev, [name]: true }));
      const error = validateField(name, value);
      setErrors(prev => ({ ...prev, [name]: error }));
    } else {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    Object.keys(formData).forEach(key => {
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
      setTouched(Object.keys(formData).reduce((acc, key) => ({ ...acc, [key]: true }), {}));

      setTimeout(() => {
        const firstErrorField = document.querySelector('.animate-shake');
        if (firstErrorField) {
          firstErrorField.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
          });
          firstErrorField.focus();
        }
      }, 100);
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 4000);

      setFormData({
        fullName: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
      setTouched({});
      setErrors({});
    }, 2000);
  };

  // Ripple effect for WhatsApp button
  const rippleRef = useRef(null);

  const handleRipple = (e) => {
    const button = e.currentTarget;
    const circle = document.createElement("span");
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;
    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${e.clientX - button.getBoundingClientRect().left - radius}px`;
    circle.style.top = `${e.clientY - button.getBoundingClientRect().top - radius}px`;
    circle.classList.add("ripple");
    const ripple = button.getElementsByClassName("ripple")[0];
    if (ripple) {
      ripple.remove();
    }
    button.appendChild(circle);
  };

  const handleWhatsAppClick = (e) => {
    handleRipple(e);
    const phoneNumber = '96522286689';
    const message = encodeURIComponent(
      `Hello! I'm interested in your laundry services. Could you please provide me with more information?`
    );
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  const getFieldClasses = (fieldName) => {
    const baseClasses = "w-full px-4 py-3 bg-white border-2 rounded-xl transition-all duration-300 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-0";
    if (errors[fieldName] && touched[fieldName]) {
      return `${baseClasses} border-red-400 focus:border-red-500 shadow-lg shadow-red-500/20 animate-shake bg-red-50/50`;
    } else if (touched[fieldName] && !errors[fieldName] && formData[fieldName]?.trim()) {
      return `${baseClasses} border-green-400 focus:border-green-500 shadow-lg shadow-green-500/10 bg-green-50/30`;
    } else {
      return `${baseClasses} border-gray-200 focus:border-indigo-500 hover:border-gray-300 focus:shadow-lg focus:shadow-indigo-500/10`;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-4 lg:p-8">
      {/* Success Message */}
      {showSuccess && (
        <div className="fixed top-4 right-4 left-4 md:left-auto bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-4 rounded-xl shadow-2xl z-50 flex items-center animate-slide-in backdrop-blur-sm border border-green-400">
          <div className="bg-white/20 p-2 rounded-full mr-3">
            <CheckCircle2 className="text-white" size={24} />
          </div>
          <div>
            <h4 className="font-bold text-lg">Success!</h4>
            <p className="text-green-100">Your message has been sent successfully. We'll get back to you soon!</p>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-indigo-600/10 blur-3xl rounded-full animate-pulse"></div>
          <div className="relative">
            <div className="relative inline-block">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-gray-900 via-indigo-900 to-purple-900 bg-clip-text text-transparent mb-6 leading-tight tracking-tight">
                Get in Touch
              </h1>
              <div
                className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 h-1 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-full transition-all duration-1000 delay-500 animate-expand"
                style={{ width: "60%" }}
              />
            </div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-medium mt-8">
              Ready to experience premium laundry service? Contact us today to learn more about our services or to schedule your first pickup.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left Side - Contact Information */}
          <div className="space-y-8">
            {/* Location */}
            <div className="relative group hover:transform hover:scale-105 transition-all duration-500">
              <div className="relative flex items-start space-x-5 p-6 rounded-2xl transition-all duration-300">
                <div className="bg-gradient-to-br from-yellow-100 to-orange-100 p-4 rounded-2xl group-hover:from-yellow-200 group-hover:to-orange-200 transition-all duration-300 shadow-lg group-hover:shadow-xl">
                  <MapPin className="text-yellow-600" size={26} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-indigo-900 mb-3 group-hover:text-yellow-700 transition-colors duration-300">Our Location</h3>
                  <p className="text-gray-600 leading-relaxed text-lg group-hover:text-gray-700 transition-colors duration-300">
                    Industrial Area 3, Block D<br />
                    Street 58/59, Reef Square Building<br />
                    Shuwaikh, Kuwait
                  </p>
                </div>
              </div>
            </div>
            {/* Phone */}
            <div className="relative group hover:transform hover:scale-105 transition-all duration-500">
              <div className="relative flex items-start space-x-5 p-6 rounded-2xl transition-all duration-300">
                <div className="bg-gradient-to-br from-blue-100 to-indigo-100 p-4 rounded-2xl group-hover:from-blue-200 group-hover:to-indigo-200 transition-all duration-300 shadow-lg group-hover:shadow-xl">
                  <Phone className="text-blue-600" size={26} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-indigo-900 mb-3 group-hover:text-blue-700 transition-colors duration-300">Phone Number</h3>
                  <p className="text-gray-600 text-lg font-medium group-hover:text-gray-700 transition-colors duration-300">22286689</p>
                </div>
              </div>
            </div>
            {/* Email */}
            <div className="relative group hover:transform hover:scale-105 transition-all duration-500">
              <div className="relative flex items-start space-x-5 p-6 rounded-2xl transition-all duration-300">
                <div className="bg-gradient-to-br from-purple-100 to-pink-100 p-4 rounded-2xl group-hover:from-purple-200 group-hover:to-pink-200 transition-all duration-300 shadow-lg group-hover:shadow-xl">
                  <Mail className="text-purple-600" size={26} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-indigo-900 mb-3 group-hover:text-purple-700 transition-colors duration-300">Email Address</h3>
                  <p className="text-gray-600 text-lg font-medium group-hover:text-gray-700 transition-colors duration-300">info@laundry.com</p>
                </div>
              </div>
            </div>
            {/* Working Hours */}
            <div className="relative group hover:transform hover:scale-105 transition-all duration-500">
              <div className="relative flex items-start space-x-5 p-6 rounded-2xl transition-all duration-300">
                <div className="bg-gradient-to-br from-green-100 to-emerald-100 p-4 rounded-2xl group-hover:from-green-200 group-hover:to-emerald-200 transition-all duration-300 shadow-lg group-hover:shadow-xl">
                  <Clock className="text-green-600" size={26} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-indigo-900 mb-3 group-hover:text-green-700 transition-colors duration-300">Working Hours</h3>
                  <p className="text-gray-600 text-lg font-medium group-hover:text-gray-700 transition-colors duration-300">
                    Sun - Thu: 8:00 AM - 8:00 PM<br />
                    Fri - Sat: 10:00 AM - 6:00 PM
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Contact Form */}
          <form className="space-y-7 bg-white/70 rounded-3xl shadow-xl p-8 border border-gray-200/60" onSubmit={handleSubmit} autoComplete="off">
            {/* Full Name */}
            <div>
              <label htmlFor="fullName" className="block font-semibold text-gray-800 mb-2">
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                className={getFieldClasses('fullName')}
                placeholder="Your full name"
                value={formData.fullName}
                onChange={handleInputChange}
                onKeyDown={(e) => handleKeyPress(e, 'fullName')}
                onPaste={(e) => handlePaste(e, 'fullName')}
                onBlur={handleBlur}
                maxLength={50}
                autoComplete="off"
                required
              />
              {errors.fullName && touched.fullName && (
                <div className="flex items-center text-red-500 mt-1 text-sm">
                  <AlertCircle size={16} className="mr-1" />
                  {errors.fullName}
                </div>
              )}
            </div>
            {/* Email */}
            <div>
              <label htmlFor="email" className="block font-semibold text-gray-800 mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className={getFieldClasses('email')}
                placeholder="you@email.com"
                value={formData.email}
                onChange={handleInputChange}
                onKeyDown={(e) => handleKeyPress(e, 'email')}
                onPaste={(e) => handlePaste(e, 'email')}
                onBlur={handleBlur}
                maxLength={254}
                autoComplete="off"
                required
              />
              {errors.email && touched.email && (
                <div className="flex items-center text-red-500 mt-1 text-sm">
                  <AlertCircle size={16} className="mr-1" />
                  {errors.email}
                </div>
              )}
            </div>
            {/* Phone */}
            <div>
              <label htmlFor="phone" className="block font-semibold text-gray-800 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                className={getFieldClasses('phone')}
                placeholder="Your phone number"
                value={formData.phone}
                onChange={handleInputChange}
                onKeyDown={(e) => handleKeyPress(e, 'phone')}
                onPaste={(e) => handlePaste(e, 'phone')}
                onBlur={handleBlur}
                maxLength={15}
                autoComplete="off"
                required
              />
              {errors.phone && touched.phone && (
                <div className="flex items-center text-red-500 mt-1 text-sm">
                  <AlertCircle size={16} className="mr-1" />
                  {errors.phone}
                </div>
              )}
            </div>
            {/* Subject */}
            <div>
              <label htmlFor="subject" className="block font-semibold text-gray-800 mb-2">
                Subject
              </label>
              <select
                id="subject"
                name="subject"
                className={getFieldClasses('subject')}
                value={formData.subject}
                onChange={handleInputChange}
                onBlur={handleBlur}
                required
              >
                {subjectOptions.map((option, idx) => (
                  <option key={idx} value={option === 'Select Subject' ? '' : option}>
                    {option}
                  </option>
                ))}
              </select>
              {errors.subject && touched.subject && (
                <div className="flex items-center text-red-500 mt-1 text-sm">
                  <AlertCircle size={16} className="mr-1" />
                  {errors.subject}
                </div>
              )}
            </div>
            {/* Message */}
            <div>
              <label htmlFor="message" className="block font-semibold text-gray-800 mb-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                className={getFieldClasses('message')}
                placeholder="How can we help you?"
                value={formData.message}
                onChange={handleInputChange}
                onBlur={handleBlur}
                maxLength={1000}
                rows={5}
                required
              />
              {errors.message && touched.message && (
                <div className="flex items-center text-red-500 mt-1 text-sm">
                  <AlertCircle size={16} className="mr-1" />
                  {errors.message}
                </div>
              )}
            </div>
            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full flex justify-center items-center bg-gradient-to-r from-indigo-500 to-blue-600 hover:from-blue-600 hover:to-indigo-500 text-white font-bold py-3 px-8 rounded-xl shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <svg className="animate-spin h-6 w-6 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                  </svg>
                ) : (
                  <Send size={20} className="mr-2" />
                )}
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </div>
          </form>
        </div>

        {/* WhatsApp Support Button Centered at the End */}
        <div className="flex justify-center mt-16">
          <button
            ref={rippleRef}
            onClick={handleWhatsAppClick}
            className={`
              relative overflow-hidden
              bg-green-500 
              hover:bg-green-600 
              text-white 
              px-8 py-4 
              rounded-full 
              shadow-xl
              flex items-center space-x-3
              font-semibold text-lg
              transition-all duration-200
              focus:outline-none
              active:scale-95
              hover:scale-105
              hover:shadow-green-400/40
              animate-slideupfadein
            `}
            style={{
              boxShadow: '0 8px 32px 0 rgba(34,197,94,0.18)',
            }}
            aria-label="WhatsApp Support"
          >
            <MessageCircle size={28} className="animate-bounce-slow" />
            <span className="tracking-wide">WhatsApp Support</span>
          </button>
          {/* Ripple CSS */}
          <style>{`
            .ripple {
              position: absolute;
              border-radius: 50%;
              transform: scale(0);
              animation: ripple 0.6s linear;
              background-color: rgba(255,255,255,0.5);
              pointer-events: none;
            }
            @keyframes ripple {
              to {
                transform: scale(4);
                opacity: 0;
              }
            }
            @keyframes slideupfadein {
              0% {
                opacity: 0;
                transform: translateY(30px) scale(0.95);
              }
              100% {
                opacity: 1;
                transform: translateY(0) scale(1);
              }
            }
            .animate-slideupfadein {
              animation: slideupfadein 0.8s cubic-bezier(.23,1.02,.57,1.01) both;
            }
            @keyframes bounce-slow {
              0%, 100% { transform: translateY(0);}
              50% { transform: translateY(-6px);}
            }
            .animate-bounce-slow {
              animation: bounce-slow 2s infinite;
            }
          `}</style>
        </div>
      </div>
    </div>
  );
};

export default GetInTouchForm;
