import React, { useState, useRef, useCallback, useMemo, useEffect } from 'react';
import { AlertCircle, CheckCircle2, Send, MapPin, Phone, Mail, Clock, MessageCircle } from 'lucide-react';
import axios from 'axios';
const baseURL = import.meta.env.VITE_API_BASE_URL;
const GetInTouchForm = () => {
  // --- User's improved logic ---
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

  // --- Animation states ---
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [displayedTitle, setDisplayedTitle] = useState('');
  const [titleIndex, setTitleIndex] = useState(0);
  const [showSubtitle, setShowSubtitle] = useState(false);
  const [showUnderline, setShowUnderline] = useState(false);
  const [showContactInfo, setShowContactInfo] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [showWhatsApp, setShowWhatsApp] = useState(false);
  const sectionRef = useRef(null);

  const subjectOptions = useMemo(() => [
    'Select Subject',
    'General Inquiry',
    'Service Request',
    'Pickup Schedule',
    'Pricing Information',
    'Special Care Instructions',
    'Complaint or Feedback',
    'Partnership Opportunity',
    'Other'
  ], []);

  const VALIDATION_RULES = useMemo(() => ({
    fullName: { 
      required: true, 
      maxLength: 50, 
      pattern: /^[a-zA-Z\s'-]+$/,
      message: 'Full name is required'
    },
    email: { 
      required: true, 
      maxLength: 254, 
      pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      message: 'Email address is required'
    },
    phone: { 
      required: true, 
      pattern: /^\+?[1-9]\d{7,14}$/,
      message: 'Phone number is required'
    },
    subject: { 
      required: true, 
      message: 'Please select a subject'
    },
    message: { 
      required: true, 
      maxLength: 1000,
      message: 'Message is required'
    }
  }), []);

  const sanitizeTextInput = useCallback((value, allowNumbers = false) => {
    if (allowNumbers) {
      return value.replace(/[^a-zA-Z0-9\s&.,'-]/g, '');
    } else {
      return value.replace(/[^a-zA-Z\s'-]/g, '');
    }
  }, []);

  const sanitizePhoneInput = useCallback((value) => {
    return value.replace(/[^0-9\s\-\(\)\+]/g, '');
  }, []);

  const sanitizeEmailInput = useCallback((value) => {
    return value.replace(/[^a-zA-Z0-9@._-]/g, '').toLowerCase();
  }, []);

  const validateField = useCallback((name, value, isSubmit = false) => {
    const rule = VALIDATION_RULES[name];
    if (!rule) return '';
    if (isSubmit && rule.required) {
      if (name === 'subject') {
        if (!value || value === '' || value === 'Select Subject') {
          return rule.message;
        }
      } else if (!value.trim()) {
        return rule.message;
      }
    }
    if (!value.trim() && !isSubmit) return '';
    if (rule.maxLength && value.length > rule.maxLength) {
      return `${name.charAt(0).toUpperCase() + name.slice(1)} must be less than ${rule.maxLength} characters`;
    }
    if (rule.pattern && value.trim()) {
      if (name === 'email') {
        if (!rule.pattern.test(value.trim())) {
          return 'Please enter a valid email address';
        }
      } else if (name === 'phone') {
        const cleanPhone = value.replace(/[\s\-\(\)]/g, '');
        if (!rule.pattern.test(cleanPhone)) {
          return 'Please enter a valid phone number (8-15 digits)';
        }
      } else if (name === 'fullName') {
        if (!rule.pattern.test(value.trim())) {
          return 'Please enter a valid name (letters, spaces, hyphens, and apostrophes only)';
        }
      }
    }
    return '';
  }, [VALIDATION_RULES]);

  const handleInputChange = useCallback((e) => {
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
  }, [touched, sanitizeTextInput, sanitizeEmailInput, sanitizePhoneInput, validateField]);

  const handleKeyPress = useCallback((e, fieldName) => {
    const char = e.key;
    const allowedKeys = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab', 'Enter'];
    if (allowedKeys.includes(char)) return;
    switch (fieldName) {
      case 'fullName':
        if (!/[a-zA-Z\s'-]/.test(char)) {
          e.preventDefault();
        }
        break;
      case 'phone':
        if (!/[0-9\s\-\(\)\+]/.test(char)) {
          e.preventDefault();
        }
        break;
      case 'email':
        if (!/[a-zA-Z0-9@._-]/.test(char)) {
          e.preventDefault();
        }
        break;
      default:
        break;
    }
  }, []);

  const handlePaste = useCallback((e, fieldName) => {
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
    setTouched(prev => ({ ...prev, [fieldName]: true }));
  }, [sanitizeTextInput, sanitizeEmailInput, sanitizePhoneInput, validateField]);

  const handleBlur = useCallback((e) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    if (value.trim() !== '') {
      const error = validateField(name, value);
      setErrors(prev => ({ ...prev, [name]: error }));
    } else {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  }, [validateField]);

  const validateForm = useCallback(() => {
    const newErrors = {};
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key], true);
      if (error) newErrors[key] = error;
    });
    return newErrors;
  }, [formData, validateField]);
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

  try {
    // ✅ Prepare email content
    const emailBody = `
  <div style="max-width: 600px; margin: 0 auto; font-family: Arial, Helvetica, sans-serif; line-height: 1.6; color: #333;">
    <!-- Header -->
    <div style="background: #16a34a; padding: 30px 20px; text-align: center;">
      <h1 style="color: white; margin: 0; font-size: 24px; font-weight: normal;">
        New Contact Form Submission
      </h1>
    </div>
    
    <!-- Content Container -->
    <div style="background: #ffffff; padding: 30px 25px;">
      
      <!-- User Details Section -->
      <div style="margin-bottom: 30px;">
        <h2 style="color: #1f2937; font-size: 18px; margin-bottom: 15px; padding-bottom: 8px; border-bottom: 2px solid #e5e7eb;">
          User Details
        </h2>
        
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6;">
              <strong style="color: #374151;">Full Name:</strong>
            </td>
            <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; color: #6b7280;">
              ${formData.fullName}
            </td>
          </tr>
          <tr>
            <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6;">
              <strong style="color: #374151;">Email:</strong>
            </td>
            <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6;">
              <a href="mailto:${formData.email}" style="color: #16a34a; text-decoration: none;">${formData.email}</a>
            </td>
          </tr>
          <tr>
            <td style="padding: 12px 0;">
              <strong style="color: #374151;">Phone:</strong>
            </td>
            <td style="padding: 12px 0;">
              <a href="tel:${formData.phone}" style="color: #16a34a; text-decoration: none;">${formData.phone}</a>
            </td>
          </tr>
        </table>
      </div>
      
      <!-- Subject Section -->
      <div style="margin-bottom: 30px;">
        <h2 style="color: #1f2937; font-size: 18px; margin-bottom: 15px; padding-bottom: 8px; border-bottom: 2px solid #e5e7eb;">
          Subject
        </h2>
        <p style="color: #6b7280; font-size: 14px; line-height: 1.6; margin: 0;">
          ${formData.subject}
        </p>
      </div>

      <!-- Message Section -->
      <div style="margin-bottom: 20px;">
        <h2 style="color: #1f2937; font-size: 18px; margin-bottom: 15px; padding-bottom: 8px; border-bottom: 2px solid #e5e7eb;">
          Message
        </h2>
        
        <div style="background: #f9fafb; padding: 15px; border: 1px solid #e5e7eb;">
          <p style="color: #6b7280; font-size: 14px; line-height: 1.6; margin: 0; white-space: pre-wrap;">${formData.message}</p>
        </div>
      </div>
      
      <!-- Footer -->
      <div style="text-align: center; margin-top: 25px; padding-top: 15px; border-top: 1px solid #e5e7eb;">
        <p style="color: #9ca3af; font-size: 12px; margin: 0;">
          Submitted on ${new Date().toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })} at ${new Date().toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit'
          })}
        </p>
      </div>
    </div>
  </div>
`;

    await axios.post(`${baseURL}/api/send-email`, {
      subject: `New Query from ${formData.fullName}`,
      text: `
Full Name: ${formData.fullName}
Email: ${formData.email}
Phone: ${formData.phone}
Subject: ${formData.subject}
Message: ${formData.message}
      `,
      html: emailBody,
    });

    // ✅ Success flow
    setIsSubmitting(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);

    // ✅ Reset form
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    });
    setTouched({});
    setErrors({});
  } catch (error) {
    console.error('Error sending email:', error);
    setIsSubmitting(false);
    // Optional: Show error toast
  }
};


  // --- Animation logic from previous design ---
  useEffect(() => {
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          setIsVisible(true);
          setTimeout(() => setShowSubtitle(true), 300);
          setTimeout(() => setShowUnderline(true), 600);
          setTimeout(() => setShowContactInfo(true), 900);
          setTimeout(() => setShowForm(true), 1200);
          setTimeout(() => setShowWhatsApp(true), 1500);
        }
      },
      { threshold: 0.2, rootMargin: '0px 0px -100px 0px' }
    );
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => observer.disconnect();
  }, [hasAnimated]);

  useEffect(() => {
    if (isVisible && titleIndex < 'Get in Touch'.length) {
      const timer = setTimeout(() => {
        setDisplayedTitle('Get in Touch'.slice(0, titleIndex + 1));
        setTitleIndex(titleIndex + 1);
      }, 90);
      return () => clearTimeout(timer);
    }
  }, [titleIndex, isVisible]);

  const rippleRef = useRef(null);
  const handleRipple = useCallback((e) => {
    const button = e.currentTarget;
    const circle = document.createElement('span');
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;
    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${e.clientX - button.getBoundingClientRect().left - radius}px`;
    circle.style.top = `${e.clientY - button.getBoundingClientRect().top - radius}px`;
    circle.classList.add('ripple');
    const ripple = button.getElementsByClassName('ripple')[0];
    if (ripple) {
      ripple.remove();
    }
    button.appendChild(circle);
  }, []);

  const handleWhatsAppClick = useCallback((e) => {
    handleRipple(e);
    const phoneNumber = '96599555045';
    const message = encodeURIComponent(
      `Hello! I'm interested in your laundry services. Could you please provide me with more information?`
    );
    const whatsappUrl = `https://api.whatsapp.com/send/?phone=96599555045&text&type=phone_number&app_absent=0`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  }, [handleRipple]);

  const getFieldClasses = useCallback((fieldName) => {
    const baseClasses = 'w-full px-4 py-3 bg-white border-2 rounded-xl transition-all duration-300 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-0';
    if (errors[fieldName] && touched[fieldName]) {
      return `${baseClasses} border-red-400 focus:border-red-500 shadow-md shadow-red-500/10 animate-shake`;
    } else {
      return `${baseClasses} border-gray-200 focus:border-indigo-500 hover:border-gray-300`;
    }
  }, [errors, touched]);

  // --- Render ---
  return (
    <div ref={sectionRef} className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-4 lg:p-8 relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-20 left-20 w-72 h-72 rounded-full blur-3xl animate-pulse" style={{ backgroundColor: 'rgba(23, 13, 92, 0.10)' }}></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 rounded-full blur-3xl animate-pulse" style={{ backgroundColor: 'rgba(217, 180, 81, 0.10)', animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full blur-3xl animate-pulse" style={{ backgroundColor: 'rgba(23, 13, 92, 0.10)', animationDelay: '2s' }}></div>
      </div>
      {/* Success Message */}
      {showSuccess && (
        <div 
          className="fixed top-4 right-4 left-4 md:left-auto bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-4 rounded-xl shadow-2xl z-50 flex items-center animate-slide-in backdrop-blur-sm border border-green-400"
          role="alert"
          aria-live="polite"
        >
          <div className="bg-white/20 p-2 rounded-full mr-3">
            <CheckCircle2 className="text-white" size={24} />
          </div>
          <div>
            <h4 className="font-bold text-lg">Success!</h4>
            <p className="text-green-100">Your message has been sent successfully. We'll get back to you soon!</p>
          </div>
        </div>
      )}
      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        {/* Animated Heading */}
        <div className="text-center mb-12 relative mt-4">
          <div className="absolute inset-0 bg-gradient-to-r from-[#170d5c]/10 to-[#d9b451]/10 blur-3xl rounded-full animate-pulse"></div>
          <div className="relative inline-block">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight tracking-tight min-h-[4rem] flex items-center justify-center animate-fadein" style={{ color: '#170d5c', letterSpacing: '0.04em' }}>
              {displayedTitle}
              <span className="transition-all duration-300 animate-pulse" style={{ color: '#d9b451', marginLeft: 2 }}>|</span>
            </h1>
            {showUnderline && (
              <div
                className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 h-1 bg-gradient-to-r from-[#170d5c] via-[#d9b451] to-[#170d5c] rounded-full transition-all duration-1000 delay-500 animate-expand"
                style={{ width: '60%' }}
              />
            )}
          </div>
          {showSubtitle && (
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-medium mt-8 animate-fadein-delay">
              Ready to experience premium laundry service? Contact us today to learn more about our services or to schedule your first pickup.
            </p>
          )}
        </div>
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 md:gap-0">
          {/* Contact Info Cards */}
          <div className="space-y-4 flex flex-col h-full justify-center" style={{ opacity: showContactInfo ? 1 : 0, transform: showContactInfo ? 'translateY(0)' : 'translateY(30px)', transition: 'all 0.6s cubic-bezier(.23,1.02,.57,1.01)' }}>
            {/* Location */}
            <div className="relative group hover:transform hover:scale-105 transition-all duration-500">
              <div className="relative flex items-start space-x-5 p-6 rounded-2xl transition-all duration-300">
                <div className="icon-animated bg-gradient-to-br from-[#d9b451]/30 to-[#d9b451]/10 p-4 rounded-2xl group-hover:from-[#d9b451]/50 group-hover:to-[#d9b451]/20 transition-all duration-300 shadow-lg group-hover:shadow-xl">
                  <MapPin className="text-[#d9b451] icon-animated-inner" size={26} aria-hidden="true" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#170d5c] mb-3 group-hover:text-[#d9b451] transition-colors duration-300 animate-slideinleft">Our Location</h3>
                  <address className="text-gray-600 leading-relaxed text-lg group-hover:text-gray-700 transition-colors duration-300 not-italic">
                    Industrial Area 3, Block D<br />
                    Street 58/59, Reef Square Building<br />
                    Shuwaikh, Kuwait
                  </address>
                </div>
              </div>
            </div>
            {/* Phone */}
            <div className="relative group hover:transform hover:scale-105 transition-all duration-500">
              <div className="relative flex items-start space-x-5 p-6 rounded-2xl transition-all duration-300">
                <div className="icon-animated bg-gradient-to-br from-[#170d5c]/20 to-[#170d5c]/5 p-4 rounded-2xl group-hover:from-[#170d5c]/40 group-hover:to-[#170d5c]/10 transition-all duration-300 shadow-lg group-hover:shadow-xl">
                  <Phone className="text-[#170d5c] icon-animated-inner" size={26} aria-hidden="true" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#170d5c] mb-3 group-hover:text-[#d9b451] transition-colors duration-300 animate-slideinleft">Phone Number</h3>
                  <a href="tel:+96522286689" className="text-gray-600 text-lg font-medium group-hover:text-gray-700 transition-colors duration-300 hover:underline">
                    +965 99555045
                  </a>
                </div>
              </div>
            </div>
            {/* Email */}
            <div className="relative group hover:transform hover:scale-105 transition-all duration-500">
              <div className="relative flex items-start space-x-5 p-6 rounded-2xl transition-all duration-300">
                <div className="icon-animated bg-gradient-to-br from-[#170d5c]/10 to-[#d9b451]/10 p-4 rounded-2xl group-hover:from-[#170d5c]/20 group-hover:to-[#d9b451]/20 transition-all duration-300 shadow-lg group-hover:shadow-xl">
                  <Mail className="text-[#170d5c] icon-animated-inner" size={26} aria-hidden="true" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#170d5c] mb-3 group-hover:text-[#d9b451] transition-colors duration-300 animate-slideinleft">Email Address</h3>
                  <a href="mailto:info@laundry.com" className="text-gray-600 text-lg font-medium group-hover:text-gray-700 transition-colors duration-300 hover:underline">
                    info@laundry.com
                  </a>
                </div>
              </div>
            </div>
            {/* Working Hours */}
            <div className="relative group hover:transform hover:scale-105 transition-all duration-500">
              <div className="relative flex items-start space-x-5 p-6 rounded-2xl transition-all duration-300">
                <div className="icon-animated bg-gradient-to-br from-green-100 to-emerald-100 p-4 rounded-2xl group-hover:from-green-200 group-hover:to-emerald-200 transition-all duration-300 shadow-lg group-hover:shadow-xl">
                  <Clock className="text-green-600 icon-animated-inner" size={26} aria-hidden="true" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#170d5c] mb-3 group-hover:text-[#d9b451] transition-colors duration-300 animate-slideinleft">Working Hours</h3>
                  <p className="text-gray-600 text-lg font-medium group-hover:text-gray-700 transition-colors duration-300">
                    Working 24/7<br />
                  </p>
                </div>
              </div>
            </div>
            {/* WhatsApp Button (mobile/left column) */}
            <div className="flex justify-start mt-4 ml-15" style={{ opacity: showWhatsApp ? 1 : 0, transform: showWhatsApp ? 'translateY(0)' : 'translateY(30px)', transition: 'all 0.6s cubic-bezier(.23,1.02,.57,1.01)' }}>
              <button
                ref={rippleRef}
                onClick={handleWhatsAppClick}
                className="relative overflow-hidden bg-[#25D366] hover:bg-[#1ebe5d] text-white px-8 py-4 rounded-full shadow-xl flex items-start space-x-3 font-semibold text-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:ring-offset-2 active:scale-95 hover:scale-105 hover:shadow-[#25D366]/40 animate-slideupfadein"
                style={{ boxShadow: '0 8px 32px 0 rgba(37,211,102,0.18)' }}
                aria-label="Contact us via WhatsApp"
              >
                <MessageCircle size={28} className="animate-bounce-slow" aria-hidden="true" />
                <span className="tracking-wide">WhatsApp Support</span>
              </button>
            </div>
          </div>
          {/* Contact Form */}
          <form 
            className="space-y-5 bg-white/70 rounded-3xl shadow-xl p-6 border border-[#170d5c]/20" 
            onSubmit={handleSubmit} 
            autoComplete="off"
            noValidate
            style={{ opacity: showForm ? 1 : 0, transform: showForm ? 'translateY(0)' : 'translateY(30px)', transition: 'all 0.6s cubic-bezier(.23,1.02,.57,1.01)' }}
          >
            {/* Full Name */}
            <div>
              <label htmlFor="fullName" className="block font-semibold text-gray-800 mb-2">
                Full Name <span className="text-red-500" aria-label="required">*</span>
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                className={getFieldClasses('fullName') + ' animate-fadein-delay'}
                placeholder="Your full name"
                value={formData.fullName}
                onChange={handleInputChange}
                onKeyDown={(e) => handleKeyPress(e, 'fullName')}
                onPaste={(e) => handlePaste(e, 'fullName')}
                onBlur={handleBlur}
                maxLength={50}
                autoComplete="off"
                required
                aria-invalid={errors.fullName && touched.fullName ? 'true' : 'false'}
                aria-describedby={errors.fullName && touched.fullName ? 'fullName-error' : undefined}
              />
              {errors.fullName && touched.fullName && (
                <div 
                  id="fullName-error"
                  className="flex items-center text-red-500 mt-1 text-sm"
                  role="alert"
                  aria-live="polite"
                >
                  <AlertCircle size={16} className="mr-1" aria-hidden="true" />
                  {errors.fullName}
                </div>
              )}
            </div>
            {/* Email */}
            <div>
              <label htmlFor="email" className="block font-semibold text-gray-800 mb-2">
                Email Address <span className="text-red-500" aria-label="required">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className={getFieldClasses('email') + ' animate-fadein-delay'}
                placeholder="you@email.com"
                value={formData.email}
                onChange={handleInputChange}
                onKeyDown={(e) => handleKeyPress(e, 'email')}
                onPaste={(e) => handlePaste(e, 'email')}
                onBlur={handleBlur}
                maxLength={254}
                autoComplete="off"
                required
                aria-invalid={errors.email && touched.email ? 'true' : 'false'}
                aria-describedby={errors.email && touched.email ? 'email-error' : undefined}
              />
              {errors.email && touched.email && (
                <div 
                  id="email-error"
                  className="flex items-center text-red-500 mt-1 text-sm"
                  role="alert"
                  aria-live="polite"
                >
                  <AlertCircle size={16} className="mr-1" aria-hidden="true" />
                  {errors.email}
                </div>
              )}
            </div>
            {/* Phone */}
            <div>
              <label htmlFor="phone" className="block font-semibold text-gray-800 mb-2">
                Phone Number <span className="text-red-500" aria-label="required">*</span>
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                className={getFieldClasses('phone') + ' animate-fadein-delay'}
                placeholder="Your phone number"
                value={formData.phone}
                onChange={handleInputChange}
                onKeyDown={(e) => handleKeyPress(e, 'phone')}
                onPaste={(e) => handlePaste(e, 'phone')}
                onBlur={handleBlur}
                maxLength={20}
                autoComplete="off"
                required
                aria-invalid={errors.phone && touched.phone ? 'true' : 'false'}
                aria-describedby={errors.phone && touched.phone ? 'phone-error' : undefined}
              />
              {errors.phone && touched.phone && (
                <div 
                  id="phone-error"
                  className="flex items-center text-red-500 mt-1 text-sm"
                  role="alert"
                  aria-live="polite"
                >
                  <AlertCircle size={16} className="mr-1" aria-hidden="true" />
                  {errors.phone}
                </div>
              )}
            </div>
            {/* Subject */}
            <div>
              <label htmlFor="subject" className="block font-semibold text-gray-800 mb-2">
                Subject <span className="text-red-500" aria-label="required">*</span>
              </label>
              <select
                id="subject"
                name="subject"
                className={getFieldClasses('subject') + ' animate-fadein-delay'}
                value={formData.subject}
                onChange={handleInputChange}
                onBlur={handleBlur}
                required
                aria-invalid={errors.subject && touched.subject ? 'true' : 'false'}
                aria-describedby={errors.subject && touched.subject ? 'subject-error' : undefined}
              >
                {subjectOptions.map((option, idx) => (
                  <option key={idx} value={option === 'Select Subject' ? '' : option}>
                    {option}
                  </option>
                ))}
              </select>
              {errors.subject && touched.subject && (
                <div 
                  id="subject-error"
                  className="flex items-center text-red-500 mt-1 text-sm"
                  role="alert"
                  aria-live="polite"
                >
                  <AlertCircle size={16} className="mr-1" aria-hidden="true" />
                  {errors.subject}
                </div>
              )}
            </div>
            {/* Message */}
            <div>
              <label htmlFor="message" className="block font-semibold text-gray-800 mb-2">
                Message <span className="text-red-500" aria-label="required">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                className={getFieldClasses('message') + ' animate-fadein-delay'}
                placeholder="How can we help you?"
                value={formData.message}
                onChange={handleInputChange}
                onBlur={handleBlur}
                maxLength={1000}
                rows={5}
                required
                aria-invalid={errors.message && touched.message ? 'true' : 'false'}
                aria-describedby={errors.message && touched.message ? 'message-error' : 'message-count'}
              />
              {errors.message && touched.message && (
                <div 
                  id="message-error"
                  className="flex items-center text-red-500 mt-1 text-sm"
                  role="alert"
                  aria-live="polite"
                >
                  <AlertCircle size={16} className="mr-1" aria-hidden="true" />
                  {errors.message}
                </div>
              )}
              <div id="message-count" className="text-right text-sm text-gray-500 mt-1">
                {formData.message.length}/1000 characters
              </div>
            </div>
            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full flex justify-center items-center bg-gradient-to-r from-[#170d5c] to-[#d9b451] hover:from-[#d9b451] hover:to-[#170d5c] text-white font-bold py-3 px-8 rounded-xl shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#170d5c] focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed animate-fadein"
                disabled={isSubmitting}
                aria-describedby={isSubmitting ? 'submit-status' : undefined}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-6 w-6 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                    </svg>
                    <span id="submit-status">Sending...</span>
                  </>
                ) : (
                  <>
                    <Send size={20} className="mr-2" aria-hidden="true" />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
      {/* Animations and ripple styles */}
      <style>{`
        @keyframes slideIn {
          from { transform: translateY(-20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-3px); }
          75% { transform: translateX(3px); }
        }
        @keyframes expand {
          from { width: 0; }
          to { width: 60%; }
        }
        @keyframes slideUpFadeIn {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes bounceSlow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInDelay {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes iconFadeIn {
          from { opacity: 0; transform: scale(0.7) translateY(20px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        .animate-slide-in {
          animation: slideIn 0.5s ease-out forwards;
        }
        .animate-shake {
          animation: shake 0.3s ease-in-out;
        }
        .animate-expand {
          animation: expand 1s ease-out forwards;
        }
        .animate-slideupfadein {
          animation: slideUpFadeIn 0.6s ease-out forwards;
        }
        .animate-bounce-slow {
          animation: bounceSlow 2s ease-in-out infinite;
        }
        .animate-fadein {
          animation: fadeIn 1s cubic-bezier(0.4,0,0.2,1) both;
        }
        .animate-fadein-delay {
          animation: fadeInDelay 1.2s cubic-bezier(0.4,0,0.2,1) both;
        }
        .animate-slideinleft {
          animation: slideInLeft 1s cubic-bezier(0.4,0,0.2,1) both;
        }
        .ripple {
          position: absolute;
          border-radius: 50%;
          background-color: rgba(255, 255, 255, 0.7);
          transform: scale(0);
          animation: ripple 600ms linear;
          pointer-events: none;
        }
        @keyframes ripple {
          to {
            transform: scale(4);
            opacity: 0;
          }
        }
        .sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border-width: 0;
        }
        .icon-animated {
          animation: iconFadeIn 1s cubic-bezier(0.4,0,0.2,1) both;
        }
        .icon-animated-inner {
          animation: iconFadeIn 1.2s cubic-bezier(0.4,0,0.2,1) both;
        }
      `}</style>
    </div>
  );
};

export default GetInTouchForm;
