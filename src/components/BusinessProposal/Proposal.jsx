import React, { useState, useEffect } from 'react';
import { AlertCircle, CheckCircle2, Send, Sparkles } from 'lucide-react';

const BusinessProposalForm = () => {
  const [formData, setFormData] = useState({
    businessName: '',
    contactPerson: '',
    email: '',
    phone: '',
    businessType: '',
    monthlyVolume: '',
    additionalRequirements: ''
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const businessTypes = [
    'Select Business Type',
    'Hotel & Hospitality',
    'Restaurant & Food Service',
    'Healthcare & Medical',
    'Salon & Spa',
    'Gym & Fitness Center',
    'Office & Corporate',
    'Retail & Shopping',
    'Residential Building',
    'Educational Institution',
    'Manufacturing & Industrial',
    'Other'
  ];

  const volumeOptions = [
    'Select Monthly Volume',
    'Less than 100 kg',
    '100 - 500 kg',
    '500 - 1,000 kg',
    '1,000 - 2,500 kg',
    '2,500 - 5,000 kg',
    'More than 5,000 kg'
  ];

  // Input sanitization functions
  const sanitizeTextInput = (value, allowNumbers = false) => {
    if (allowNumbers) {
      // Allow letters, numbers, spaces, and common business characters
      return value.replace(/[^a-zA-Z0-9\s&.,'-]/g, '');
    } else {
      // Only allow letters, numbers, spaces, and basic punctuation for names
      return value.replace(/[^a-zA-Z0-9\s'-]/g, '');
    }
  };

  const sanitizePhoneInput = (value) => {
    // Only allow numbers, spaces, hyphens, parentheses, and plus sign
    return value.replace(/[^0-9\s\-\(\)\+]/g, '');
  };

  const sanitizeEmailInput = (value) => {
    // Allow alphanumeric, @, ., -, _, and common email characters
    return value.replace(/[^a-zA-Z0-9@._-]/g, '').toLowerCase();
  };

  const validateField = (name, value, isSubmit = false) => {
    switch (name) {
      case 'businessName':
        if (isSubmit && !value.trim()) return 'Business name is required';
        if (value.trim() && value.trim().length > 100) return 'Business name must be less than 100 characters';
        return '';
      
      case 'contactPerson':
        if (isSubmit && !value.trim()) return 'Contact person name is required';
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
      
      case 'businessType':
        if (isSubmit && (!value || value === '' || value === 'Select Business Type')) return 'Please select a business type';
        return '';
      
      case 'monthlyVolume':
        if (isSubmit && (!value || value === '' || value === 'Select Monthly Volume')) return 'Please select estimated monthly laundry volume';
        return '';
      
      case 'additionalRequirements':
        if (value.length > 1000) return 'Additional requirements must be less than 1000 characters';
        return '';
      
      default:
        return '';
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let sanitizedValue = value;

    // Apply input sanitization based on field type
    switch (name) {
      case 'businessName':
        sanitizedValue = sanitizeTextInput(value, true);
        break;
      case 'contactPerson':
        sanitizedValue = sanitizeTextInput(value, true);
        break;
      case 'email':
        sanitizedValue = sanitizeEmailInput(value);
        break;
      case 'phone':
        sanitizedValue = sanitizePhoneInput(value);
        break;
      case 'additionalRequirements':
        // Allow more characters for requirements but prevent harmful content
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
    // Prevent certain characters from being entered
    const char = e.key;
    
    switch (fieldName) {
      case 'businessName':
        if (!/[a-zA-Z0-9\s&.,'-]/.test(char) && !['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab'].includes(char)) {
          e.preventDefault();
        }
        break;
      case 'contactPerson':
        if (!/[a-zA-Z0-9\s'-]/.test(char) && !['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab'].includes(char)) {
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
      case 'businessName':
        sanitizedPaste = sanitizeTextInput(paste, true);
        break;
      case 'contactPerson':
        sanitizedPaste = sanitizeTextInput(paste, true);
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
    
    // Validate the new value
    const error = validateField(fieldName, newValue);
    setErrors(prev => ({ ...prev, [fieldName]: error }));
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    // Only set touched and validate if user has entered something
    if (value.trim() !== '') {
      setTouched(prev => ({ ...prev, [name]: true }));
      const error = validateField(name, value);
      setErrors(prev => ({ ...prev, [name]: error }));
    } else {
      // Clear any existing errors for empty fields on blur
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key], true); // Pass true for submit validation
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
        businessName: '',
        contactPerson: '',
        email: '',
        phone: '',
        businessType: '',
        monthlyVolume: '',
        additionalRequirements: ''
      });
      setTouched({});
      setErrors({});
    }, 2000);
  };

  const getFieldClasses = (fieldName) => {
    const baseClasses = "w-full px-4 py-3 bg-white/5 backdrop-blur-sm border-2 rounded-xl transition-all duration-300 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-0";
    
    if (errors[fieldName] && touched[fieldName]) {
      return `${baseClasses} border-red-400 focus:border-red-500 shadow-lg shadow-red-500/20 animate-shake`;
    } else {
      return `${baseClasses} border-gray-200 focus:border-blue-400 hover:border-gray-300 focus:shadow-lg focus:shadow-blue-500/20 hover:shadow-md hover:shadow-blue-400/10`;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100 p-4 flex items-center justify-center">
      <div className="w-full max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-indigo-600/20 blur-3xl rounded-full animate-pulse"></div>
          <div className="relative">
            <div className="flex items-center justify-center mb-4">
              <Sparkles className="text-blue-600 mr-2 animate-float" size={32} />
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-800 to-indigo-800 bg-clip-text text-transparent">
                Request a Laundry Service Proposal
              </h1>
            </div>
            <p className="text-gray-600 text-lg">
              Get a customized laundry solution and pricing for your business needs.
            </p>
          </div>
        </div>

        {/* Success Message */}
        {showSuccess && (
          <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 flex items-center animate-slide-in">
            <CheckCircle2 className="mr-2" size={20} />
            Laundry service proposal request submitted successfully!
          </div>
        )}

        {/* Form */}
        <div className="bg-white/70 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-white/20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Business Name */}
            <div className="relative">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Business Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="businessName"
                value={formData.businessName}
                onChange={handleInputChange}
                onBlur={handleBlur}
                onKeyPress={(e) => handleKeyPress(e, 'businessName')}
                onPaste={(e) => handlePaste(e, 'businessName')}
                placeholder="Your Business Name"
                maxLength={100}
                className={getFieldClasses('businessName')}
              />
              {errors.businessName && touched.businessName && (
                <div className="flex items-center mt-2 text-red-500 text-sm animate-fade-in">
                  <AlertCircle size={16} className="mr-1" />
                  {errors.businessName}
                </div>
              )}
            </div>

            {/* Contact Person */}
            <div className="relative">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Contact Person <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="contactPerson"
                value={formData.contactPerson}
                onChange={handleInputChange}
                onBlur={handleBlur}
                onKeyPress={(e) => handleKeyPress(e, 'contactPerson')}
                onPaste={(e) => handlePaste(e, 'contactPerson')}
                placeholder="Your Name"
                maxLength={50}
                className={getFieldClasses('contactPerson')}
              />
              {errors.contactPerson && touched.contactPerson && (
                <div className="flex items-center mt-2 text-red-500 text-sm animate-fade-in">
                  <AlertCircle size={16} className="mr-1" />
                  {errors.contactPerson}
                </div>
              )}
            </div>

            {/* Email */}
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
                onKeyPress={(e) => handleKeyPress(e, 'email')}
                onPaste={(e) => handlePaste(e, 'email')}
                placeholder="your@email.com"
                maxLength={254}
                className={getFieldClasses('email')}
              />
              {errors.email && touched.email && (
                <div className="flex items-center mt-2 text-red-500 text-sm animate-fade-in">
                  <AlertCircle size={16} className="mr-1" />
                  {errors.email}
                </div>
              )}
            </div>

            {/* Phone */}
            <div className="relative">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                onBlur={handleBlur}
                onKeyPress={(e) => handleKeyPress(e, 'phone')}
                onPaste={(e) => handlePaste(e, 'phone')}
                placeholder="+965 XXXX XXXX"
                maxLength={20}
                className={getFieldClasses('phone')}
              />
              {errors.phone && touched.phone && (
                <div className="flex items-center mt-2 text-red-500 text-sm animate-fade-in">
                  <AlertCircle size={16} className="mr-1" />
                  {errors.phone}
                </div>
              )}
            </div>

            {/* Business Type */}
            <div className="relative">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Business Type <span className="text-red-500">*</span>
              </label>
              <select
                name="businessType"
                value={formData.businessType}
                onChange={handleInputChange}
                onBlur={handleBlur}
                className={getFieldClasses('businessType')}
              >
                {businessTypes.map((type, index) => (
                  <option key={index} value={index === 0 ? '' : type}>
                    {type}
                  </option>
                ))}
              </select>
              {errors.businessType && touched.businessType && (
                <div className="flex items-center mt-2 text-red-500 text-sm animate-fade-in">
                  <AlertCircle size={16} className="mr-1" />
                  {errors.businessType}
                </div>
              )}
            </div>

            {/* Monthly Laundry Volume */}
            <div className="relative">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Monthly Laundry Volume (kg) <span className="text-red-500">*</span>
              </label>
              <select
                name="monthlyVolume"
                value={formData.monthlyVolume}
                onChange={handleInputChange}
                onBlur={handleBlur}
                className={getFieldClasses('monthlyVolume')}
              >
                {volumeOptions.map((volume, index) => (
                  <option key={index} value={index === 0 ? '' : volume}>
                    {volume}
                  </option>
                ))}
              </select>
              {errors.monthlyVolume && touched.monthlyVolume && (
                <div className="flex items-center mt-2 text-red-500 text-sm animate-fade-in">
                  <AlertCircle size={16} className="mr-1" />
                  {errors.monthlyVolume}
                </div>
              )}
            </div>
          </div>

          {/* Laundry Requirements */}
          <div className="mt-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Laundry Requirements & Special Instructions
            </label>
            <textarea
              name="additionalRequirements"
              value={formData.additionalRequirements}
              onChange={handleInputChange}
              onBlur={handleBlur}
              placeholder="Tell us about your specific laundry needs: fabric types, frequency, pickup/delivery preferences, special care instructions, stain treatments, or any other requirements..."
              rows={4}
              maxLength={1000}
              className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border-2 border-gray-200 rounded-xl transition-all duration-300 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-0 focus:border-blue-400 hover:border-gray-300 focus:shadow-lg focus:shadow-blue-500/20 hover:shadow-md hover:shadow-blue-400/10 resize-none"
            />
            {errors.additionalRequirements && (
              <div className="flex items-center mt-2 text-red-500 text-sm animate-fade-in">
                <AlertCircle size={16} className="mr-1" />
                {errors.additionalRequirements}
              </div>
            )}
            <div className="text-right text-sm text-gray-500 mt-1">
              {formData.additionalRequirements.length}/1000 characters
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-8 text-center">
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="relative inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-gray-800 font-bold rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-yellow-500/30 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none min-w-[200px] animate-pulse-glow"
            >
              {isSubmitting ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-gray-800 border-t-transparent mr-2"></div>
                  Submitting...
                </div>
              ) : (
                <div className="flex items-center">
                  Request Laundry Proposal
                  <Send className="ml-2 transition-transform duration-300 group-hover:translate-x-1" size={20} />
                </div>
              )}
              
              {/* Animated background effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-300 to-yellow-400 rounded-2xl opacity-0 hover:opacity-100 transition-opacity duration-300 -z-10 blur-xl"></div>
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slide-in {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(255, 235, 59, 0.3); }
          50% { box-shadow: 0 0 30px rgba(255, 235, 59, 0.5), 0 0 40px rgba(255, 235, 59, 0.2); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
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

export default BusinessProposalForm;