import { useState } from "react";
import { Mail, Gift, Calendar } from "lucide-react";

const GiftCardForm = () => {
  const [selectedAmount, setSelectedAmount] = useState(50);
  const [customAmount, setCustomAmount] = useState("");
  const [deliveryType, setDeliveryType] = useState("digital");
  const [selectedDesign, setSelectedDesign] = useState(0);
  const [formData, setFormData] = useState({
    recipientName: "",
    recipientEmail: "",
    yourName: "",
    yourEmail: "",
    personalMessage: "",
    deliveryDate: ""
  });
  const [errors, setErrors] = useState({});

  // Image array for easy management
  const designImages = [
    {
      url: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=300&fit=crop",
      title: "Birthday Celebration",
      subtitle: "Perfect for birthday gifts"
    },
    {
      url: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=400&h=300&fit=crop",
      title: "Wedding Gift",
      subtitle: "Ideal for newlyweds"
    },
    {
      url: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=300&fit=crop",
      title: "Corporate Gift",
      subtitle: "Professional appreciation"
    },
    {
      url: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=300&fit=crop",
      title: "General Gift",
      subtitle: "For any occasion"
    }
  ];

  const amountOptions = [25, 50, 100, 150, 200];

  // Validation functions
  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const validateDate = (date) => {
    const selectedDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return selectedDate >= today;
  };

  const validateForm = () => {
    const newErrors = {};

    // Recipient name validation (less than 4 characters)
    if (formData.recipientName.length < 4) {
      newErrors.recipientName = "Recipient name must be at least 4 characters";
    }

    // Email validations
    if (!validateEmail(formData.recipientEmail)) {
      newErrors.recipientEmail = "Please enter a valid email address";
    }

    if (!validateEmail(formData.yourEmail)) {
      newErrors.yourEmail = "Please enter a valid email address";
    }

    // Your name validation
    if (formData.yourName.trim().length < 2) {
      newErrors.yourName = "Your name must be at least 2 characters";
    }

    // Date validation (future dates only)
    if (formData.deliveryDate && !validateDate(formData.deliveryDate)) {
      newErrors.deliveryDate = "Please select a future date";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Form is valid, proceed with submission
      console.log("Form submitted successfully", {
        amount: customAmount || selectedAmount,
        deliveryType,
        selectedDesign: designImages[selectedDesign],
        formData
      });
      alert("Gift card purchased successfully!");
    }
  };

  const getCurrentAmount = () => {
    return customAmount ? parseFloat(customAmount) || 0 : selectedAmount;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 mt-4">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Purchase a Gift Card</h1>
          <p className="text-gray-600 text-lg">Choose the perfect amount and design for your gift.</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Left Section - Reduced height */}
          <div className="space-y-6">
            {/* Select Amount - Compact */}
            <div className="bg-white rounded-2xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Select Amount</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4">
                {amountOptions.map((amount) => (
                  <button
                    key={amount}
                    onClick={() => {
                      setSelectedAmount(amount);
                      setCustomAmount("");
                    }}
                    className={`p-3 rounded-xl border-2 transition-all duration-300 transform hover:scale-105 ${
                      selectedAmount === amount && !customAmount
                        ? "border-yellow-400 bg-yellow-50 text-yellow-700 shadow-md"
                        : "border-gray-200 hover:border-gray-300 text-gray-700"
                    }`}
                  >
                    KD {amount}
                  </button>
                ))}
              </div>
              
              <input
                type="number"
                value={customAmount}
                onChange={(e) => setCustomAmount(e.target.value)}
                placeholder="Enter custom amount"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              />
            </div>

            {/* Delivery Type - Compact */}
            <div className="bg-white rounded-2xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Delivery Type</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button
                  onClick={() => setDeliveryType("digital")}
                  className={`p-4 rounded-xl border-2 transition-all duration-300 transform hover:scale-105 ${
                    deliveryType === "digital"
                      ? "border-yellow-400 bg-yellow-50 shadow-md"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <Mail className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                  <h3 className="font-semibold text-gray-800">Digital</h3>
                  <p className="text-sm text-gray-600">Instant delivery via email</p>
                </button>
                
                <button
                  onClick={() => setDeliveryType("physical")}
                  className={`p-4 rounded-xl border-2 transition-all duration-300 transform hover:scale-105 ${
                    deliveryType === "physical"
                      ? "border-yellow-400 bg-yellow-50 shadow-md"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <Gift className="w-8 h-8 mx-auto mb-2 text-purple-600" />
                  <h3 className="font-semibold text-gray-800">Physical</h3>
                  <p className="text-sm text-gray-600">Elegant card by mail</p>
                </button>
              </div>
            </div>

            {/* Choose Design - Compact */}
            <div className="bg-white rounded-2xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Choose Design</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {designImages.map((design, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedDesign(index)}
                    className={`relative rounded-xl overflow-hidden border-2 transition-all duration-300 transform hover:scale-105 ${
                      selectedDesign === index
                        ? "border-yellow-400 shadow-lg"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <img
                      src={design.url}
                      alt={design.title}
                      className="w-full h-24 object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-end p-3">
                      <h3 className="text-white font-semibold text-sm">{design.title}</h3>
                      <p className="text-white text-xs opacity-90">{design.subtitle}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Section - Form with equal height */}
          <div className="bg-white rounded-2xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl h-full flex flex-col">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Gift Card Details</h2>
            
            <div className="space-y-4 flex-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Recipient Name *
                  </label>
                  <input
                    type="text"
                    value={formData.recipientName}
                    onChange={(e) => handleInputChange("recipientName", e.target.value)}
                    placeholder="Recipient's name"
                    className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 ${
                      errors.recipientName ? "border-red-500" : "border-gray-300"
                    }`}
                    required
                  />
                  {errors.recipientName && (
                    <p className="text-red-500 text-sm mt-1">{errors.recipientName}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Recipient Email *
                  </label>
                  <input
                    type="email"
                    value={formData.recipientEmail}
                    onChange={(e) => handleInputChange("recipientEmail", e.target.value)}
                    placeholder="recipient@email.com"
                    className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 ${
                      errors.recipientEmail ? "border-red-500" : "border-gray-300"
                    }`}
                    required
                  />
                  {errors.recipientEmail && (
                    <p className="text-red-500 text-sm mt-1">{errors.recipientEmail}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    value={formData.yourName}
                    onChange={(e) => handleInputChange("yourName", e.target.value)}
                    placeholder="Your name"
                    className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 ${
                      errors.yourName ? "border-red-500" : "border-gray-300"
                    }`}
                    required
                  />
                  {errors.yourName && (
                    <p className="text-red-500 text-sm mt-1">{errors.yourName}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Email *
                  </label>
                  <input
                    type="email"
                    value={formData.yourEmail}
                    onChange={(e) => handleInputChange("yourEmail", e.target.value)}
                    placeholder="your@email.com"
                    className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 ${
                      errors.yourEmail ? "border-red-500" : "border-gray-300"
                    }`}
                    required
                  />
                  {errors.yourEmail && (
                    <p className="text-red-500 text-sm mt-1">{errors.yourEmail}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Personal Message
                </label>
                <textarea
                  value={formData.personalMessage}
                  onChange={(e) => handleInputChange("personalMessage", e.target.value)}
                  placeholder="Add a personal message to your gift..."
                  rows={4}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Delivery Date
                </label>
                <div className="relative">
                  <input
                    type="date"
                    value={formData.deliveryDate}
                    onChange={(e) => handleInputChange("deliveryDate", e.target.value)}
                    className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 ${
                      errors.deliveryDate ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
                </div>
                {errors.deliveryDate && (
                  <p className="text-red-500 text-sm mt-1">{errors.deliveryDate}</p>
                )}
                <p className="text-sm text-gray-500 mt-1">Leave blank for immediate delivery</p>
              </div>

              {/* Additional Information Section */}
              <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                <h3 className="font-semibold text-gray-800">Gift Card Information</h3>
                <div className="text-sm text-gray-600 space-y-2">
                  <p>• Gift cards are valid for 12 months from purchase date</p>
                  <p>• No expiration fees or hidden charges</p>
                  <p>• Can be used online or in-store</p>
                  <p>• Remaining balance can be checked online</p>
                </div>
              </div>
            </div>

            {/* Footer - Always at bottom */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-semibold text-gray-800">Total Amount:</span>
                <span className="text-2xl font-bold text-blue-600">KD {getCurrentAmount()}</span>
              </div>

              <button
                type="button"
                onClick={handleSubmit}
                className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-800 font-semibold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
              >
                Purchase Gift Card →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GiftCardForm;