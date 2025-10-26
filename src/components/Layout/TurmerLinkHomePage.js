import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  CurrencyRupeeIcon, 
  BookOpenIcon, 
  AcademicCapIcon, 
  BellIcon,
  ScaleIcon,
  SunIcon,
  ChartBarIcon,
  ShieldCheckIcon,
  UserIcon,
  Bars3Icon
} from '@heroicons/react/24/outline';

const TurmerLinkHomePage = ({ onNavigate }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentAnimation, setCurrentAnimation] = useState(0);

  // Turmeric-themed animations
  const animations = [
    { emoji: '🌱', text: 'Growing' },
    { emoji: '🌿', text: 'Flourishing' },
    { emoji: '🌾', text: 'Harvesting' },
    { emoji: '🌶️', text: 'Processing' }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAnimation((prev) => (prev + 1) % animations.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      id: 'dashboard',
      title: 'Market Prices',
      subtitle: 'Live turmeric prices',
      icon: CurrencyRupeeIcon,
      color: 'from-green-500 to-emerald-600',
      description: 'Check current market prices and trends'
    },
    {
      id: 'ledger',
      title: 'My Sales',
      subtitle: 'Digital ledger',
      icon: BookOpenIcon,
      color: 'from-blue-500 to-cyan-600',
      description: 'Record and track your sales'
    },
    {
      id: 'learning',
      title: 'Learn',
      subtitle: 'Farming tips',
      icon: AcademicCapIcon,
      color: 'from-purple-500 to-violet-600',
      description: 'Watch videos and learn farming'
    },
    {
      id: 'notifications',
      title: 'Alerts',
      subtitle: 'Price updates',
      icon: BellIcon,
      color: 'from-orange-500 to-red-600',
      description: 'Get price and weather alerts'
    },
    {
      id: 'weather',
      title: 'Weather',
      subtitle: 'Forecast',
      icon: SunIcon,
      color: 'from-yellow-500 to-orange-600',
      description: 'Check weather for farming'
    },
    {
      id: 'msp',
      title: 'MSP Rates',
      subtitle: 'Government prices',
      icon: ShieldCheckIcon,
      color: 'from-indigo-500 to-blue-600',
      description: 'Minimum Support Price'
    }
  ];

  const handleFeatureClick = (featureId) => {
    onNavigate(featureId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-yellow-50 to-orange-50">
      {/* Header */}
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white/80 backdrop-blur-sm shadow-sm"
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center shadow-lg">
                <span className="text-white text-xl">🌱</span>
              </div>
              <span className="text-2xl font-bold text-gray-900">TurmerLink</span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#" className="text-primary-600 font-medium">Home</a>
              <a href="#" className="text-gray-600 hover:text-primary-600 transition-colors">Market Prices</a>
              <a href="#" className="text-gray-600 hover:text-primary-600 transition-colors">My Sales</a>
              <a href="#" className="text-gray-600 hover:text-primary-600 transition-colors">Learning</a>
              <a href="#" className="text-gray-600 hover:text-primary-600 transition-colors">Contact</a>
            </nav>

            {/* Sign In Button */}
            <div className="hidden md:flex items-center space-x-4">
              <button className="flex items-center space-x-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors shadow-sm">
                <UserIcon className="h-4 w-4" />
                <span>Sign In</span>
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-gray-600 hover:text-primary-600 transition-colors"
            >
              <Bars3Icon className="h-6 w-6" />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Main Headline */}
            <div>
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight"
              >
                <span className="block">Smart & Transparent</span>
                <span className="block text-primary-600">Farming Solutions</span>
              </motion.h1>
            </div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl text-gray-600 leading-relaxed max-w-lg"
            >
              Experience seamless farming with our advanced price tracking system, 
              digital ledger, and expert guidance for turmeric farmers.
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <button 
                onClick={() => handleFeatureClick('dashboard')}
                className="bg-primary-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-primary-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Check Prices
              </button>
              <button 
                onClick={() => handleFeatureClick('ledger')}
                className="bg-gray-800 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-900 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Track Sales
              </button>
            </motion.div>

            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="grid grid-cols-3 gap-6 pt-8"
            >
              <div className="text-center">
                <div className="text-2xl font-bold text-primary-600">₹8,500</div>
                <div className="text-sm text-gray-600">Current Price</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">1,250+</div>
                <div className="text-sm text-gray-600">Farmers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">₹67L+</div>
                <div className="text-sm text-gray-600">Sales Tracked</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Side - Illustration */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            {/* Main Illustration Container */}
            <div className="relative w-full h-96 lg:h-[500px]">
              {/* Background Card */}
              <motion.div
                initial={{ scale: 0.8, rotate: -5 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="absolute inset-0 bg-gradient-to-br from-green-100 to-yellow-100 rounded-3xl shadow-2xl"
              >
                {/* Animated Turmeric Elements */}
                <div className="absolute inset-0 p-8">
                  {/* Top Row - Market Prices */}
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    className="absolute top-8 left-8 w-16 h-16 bg-gradient-to-r from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center shadow-lg"
                  >
                    <CurrencyRupeeIcon className="h-8 w-8 text-white" />
                  </motion.div>

                  {/* Second Row - Sales Tracking */}
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1.0 }}
                    className="absolute top-24 left-8 w-20 h-12 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg"
                  >
                    <BookOpenIcon className="h-6 w-6 text-white" />
                  </motion.div>

                  {/* Third Row - Learning */}
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1.2 }}
                    className="absolute top-40 left-8 w-14 h-14 bg-gradient-to-r from-purple-400 to-violet-500 rounded-2xl flex items-center justify-center shadow-lg"
                  >
                    <AcademicCapIcon className="h-7 w-7 text-white" />
                  </motion.div>

                  {/* Right Side - Weather */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 1.4 }}
                    className="absolute top-8 right-8 w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg"
                  >
                    <SunIcon className="h-8 w-8 text-white" />
                  </motion.div>

                  {/* Center - Animated Turmeric */}
                  <motion.div
                    animate={{ 
                      scale: [1, 1.1, 1],
                      rotate: [0, 5, -5, 0]
                    }}
                    transition={{ 
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-gradient-to-r from-orange-400 to-red-500 rounded-full flex items-center justify-center shadow-xl"
                  >
                    <motion.span
                      animate={{ 
                        fontSize: ['2rem', '2.5rem', '2rem']
                      }}
                      transition={{ 
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                      className="text-white"
                    >
                      {animations[currentAnimation].emoji}
                    </motion.span>
                  </motion.div>

                  {/* Bottom - MSP Shield */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1.6 }}
                    className="absolute bottom-8 left-8 w-18 h-12 bg-gradient-to-r from-indigo-400 to-blue-500 rounded-xl flex items-center justify-center shadow-lg"
                  >
                    <ShieldCheckIcon className="h-6 w-6 text-white" />
                  </motion.div>

                  {/* Bottom Right - Notifications */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1.8 }}
                    className="absolute bottom-8 right-8 w-16 h-16 bg-gradient-to-r from-red-400 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg"
                  >
                    <BellIcon className="h-8 w-8 text-white" />
                  </motion.div>
                </div>

                {/* Floating Elements */}
                <motion.div
                  animate={{ 
                    y: [0, -10, 0],
                    rotate: [0, 5, 0]
                  }}
                  transition={{ 
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute top-16 right-16 w-8 h-8 bg-yellow-300 rounded-full opacity-60"
                />
                <motion.div
                  animate={{ 
                    y: [0, 15, 0],
                    rotate: [0, -5, 0]
                  }}
                  transition={{ 
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1
                  }}
                  className="absolute bottom-16 left-16 w-6 h-6 bg-green-300 rounded-full opacity-60"
                />
              </motion.div>

              {/* Ground/Base */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.0 }}
                className="absolute -bottom-4 left-0 right-0 h-8 bg-gradient-to-r from-green-600 to-green-800 rounded-b-3xl shadow-lg"
              >
                <div className="absolute top-0 left-0 right-0 h-1 bg-green-400 rounded-t-full"></div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Features Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.0 }}
        className="bg-white py-16"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Features</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Everything you need for successful turmeric farming in one place
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  onClick={() => handleFeatureClick(feature.id)}
                  className="bg-white rounded-2xl shadow-lg p-6 cursor-pointer hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-primary-200"
                >
                  <div className="text-center">
                    <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 mb-3">
                      {feature.subtitle}
                    </p>
                    <p className="text-sm text-gray-500">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.section>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.2 }}
        className="bg-gray-900 text-white py-12"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center">
                  <span className="text-white text-sm">🌱</span>
                </div>
                <span className="text-xl font-bold">TurmerLink</span>
              </div>
              <p className="text-gray-400 text-sm">
                Empowering turmeric farmers with technology and transparency.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Features</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>Market Prices</li>
                <li>Digital Ledger</li>
                <li>Learning Center</li>
                <li>Weather Forecast</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>Help Center</li>
                <li>Contact Us</li>
                <li>FAQ</li>
                <li>Community</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Contact</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>Nizamabad, Telangana</li>
                <li>+91 9876543210</li>
                <li>support@turmerlink.com</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2024 TurmerLink. All rights reserved.</p>
          </div>
        </div>
      </motion.footer>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 z-50 md:hidden"
          onClick={() => setIsMenuOpen(false)}
        >
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            className="absolute right-0 top-0 h-full w-80 bg-white shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center">
                    <span className="text-white text-sm">🌱</span>
                  </div>
                  <span className="text-xl font-bold text-gray-900">TurmerLink</span>
                </div>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <nav className="space-y-4">
                <a href="#" className="block text-primary-600 font-medium py-2">Home</a>
                <a href="#" className="block text-gray-600 py-2">Market Prices</a>
                <a href="#" className="block text-gray-600 py-2">My Sales</a>
                <a href="#" className="block text-gray-600 py-2">Learning</a>
                <a href="#" className="block text-gray-600 py-2">Contact</a>
              </nav>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default TurmerLinkHomePage;
