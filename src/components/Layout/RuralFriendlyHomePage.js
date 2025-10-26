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

const RuralFriendlyHomePage = ({ onNavigate }) => {
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
      description: 'Check current market prices and trends',
      emoji: '💰'
    },
    {
      id: 'ledger',
      title: 'My Sales',
      subtitle: 'Digital ledger',
      icon: BookOpenIcon,
      color: 'from-blue-500 to-cyan-600',
      description: 'Record and track your sales',
      emoji: '📊'
    },
    {
      id: 'learning',
      title: 'Learn',
      subtitle: 'Farming tips',
      icon: AcademicCapIcon,
      color: 'from-purple-500 to-violet-600',
      description: 'Watch videos and learn farming',
      emoji: '🎓'
    },
    {
      id: 'notifications',
      title: 'Alerts',
      subtitle: 'Price updates',
      icon: BellIcon,
      color: 'from-orange-500 to-red-600',
      description: 'Get price and weather alerts',
      emoji: '🔔'
    },
    {
      id: 'weather',
      title: 'Weather',
      subtitle: 'Forecast',
      icon: SunIcon,
      color: 'from-yellow-500 to-orange-600',
      description: 'Check weather for farming',
      emoji: '☀️'
    },
    {
      id: 'msp',
      title: 'MSP Rates',
      subtitle: 'Government prices',
      icon: ShieldCheckIcon,
      color: 'from-indigo-500 to-blue-600',
      description: 'Minimum Support Price',
      emoji: '🛡️'
    }
  ];

  const handleFeatureClick = (featureId) => {
    onNavigate(featureId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-yellow-50 to-orange-50">
      {/* Header - BIGGER and BOLDER */}
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white/90 backdrop-blur-sm shadow-lg"
      >
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            {/* Logo - MUCH BIGGER */}
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-2xl flex items-center justify-center shadow-xl">
                <span className="text-white text-3xl">🌱</span>
              </div>
              <span className="text-4xl font-bold text-gray-900">TurmerLink</span>
            </div>

            {/* Desktop Navigation - BIGGER TEXT */}
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#" className="text-primary-600 font-bold text-lg">Home</a>
              <a href="#" className="text-gray-600 hover:text-primary-600 transition-colors text-lg font-semibold">Market Prices</a>
              <a href="#" className="text-gray-600 hover:text-primary-600 transition-colors text-lg font-semibold">My Sales</a>
              <a href="#" className="text-gray-600 hover:text-primary-600 transition-colors text-lg font-semibold">Learning</a>
              <a href="#" className="text-gray-600 hover:text-primary-600 transition-colors text-lg font-semibold">Contact</a>
            </nav>

            {/* Sign In Button - BIGGER */}
            <div className="hidden md:flex items-center space-x-4">
              <button className="flex items-center space-x-3 bg-primary-600 text-white px-6 py-3 rounded-xl hover:bg-primary-700 transition-colors shadow-lg text-lg font-semibold">
                <UserIcon className="h-6 w-6" />
                <span>Sign In</span>
              </button>
            </div>

            {/* Mobile Menu Button - BIGGER */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-3 text-gray-600 hover:text-primary-600 transition-colors"
            >
              <Bars3Icon className="h-8 w-8" />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Side - Content - MUCH BIGGER TEXT */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-12"
          >
            {/* Main Headline - HUGE TEXT */}
            <div>
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-6xl lg:text-7xl font-bold text-gray-900 leading-tight"
              >
                <span className="block">🌱 Smart &</span>
                <span className="block text-primary-600">Transparent</span>
                <span className="block">Farming</span>
              </motion.h1>
            </div>

            {/* Description - BIGGER TEXT */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-2xl text-gray-700 leading-relaxed max-w-lg font-medium"
            >
              💰 Get live turmeric prices<br/>
              📊 Track your sales easily<br/>
              🌤️ Check weather for farming<br/>
              🎓 Learn farming tips
            </motion.p>

            {/* Action Buttons - MUCH BIGGER */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-6"
            >
              <button 
                onClick={() => handleFeatureClick('dashboard')}
                className="bg-primary-600 text-white px-12 py-6 rounded-2xl font-bold text-2xl hover:bg-primary-700 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-2 flex items-center justify-center space-x-3"
              >
                <span>💰</span>
                <span>Check Prices</span>
              </button>
              <button 
                onClick={() => handleFeatureClick('ledger')}
                className="bg-gray-800 text-white px-12 py-6 rounded-2xl font-bold text-2xl hover:bg-gray-900 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-2 flex items-center justify-center space-x-3"
              >
                <span>📊</span>
                <span>Track Sales</span>
              </button>
            </motion.div>

            {/* Quick Stats - BIGGER */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="grid grid-cols-3 gap-8 pt-8"
            >
              <div className="text-center bg-white rounded-2xl p-6 shadow-lg">
                <div className="text-4xl font-bold text-primary-600 mb-2">₹8,500</div>
                <div className="text-lg text-gray-600 font-semibold">Current Price</div>
              </div>
              <div className="text-center bg-white rounded-2xl p-6 shadow-lg">
                <div className="text-4xl font-bold text-green-600 mb-2">1,250+</div>
                <div className="text-lg text-gray-600 font-semibold">Farmers</div>
              </div>
              <div className="text-center bg-white rounded-2xl p-6 shadow-lg">
                <div className="text-4xl font-bold text-orange-600 mb-2">₹67L+</div>
                <div className="text-lg text-gray-600 font-semibold">Sales Tracked</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Side - Illustration - BIGGER */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            {/* Main Illustration Container - BIGGER */}
            <div className="relative w-full h-[600px]">
              {/* Background Card - BIGGER */}
              <motion.div
                initial={{ scale: 0.8, rotate: -5 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="absolute inset-0 bg-gradient-to-br from-green-100 to-yellow-100 rounded-3xl shadow-2xl"
              >
                {/* Animated Turmeric Elements - BIGGER */}
                <div className="absolute inset-0 p-12">
                  {/* Top Row - Market Prices */}
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    className="absolute top-12 left-12 w-24 h-24 bg-gradient-to-r from-green-400 to-emerald-500 rounded-3xl flex items-center justify-center shadow-xl"
                  >
                    <span className="text-4xl">💰</span>
                  </motion.div>

                  {/* Second Row - Sales Tracking */}
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1.0 }}
                    className="absolute top-32 left-12 w-28 h-20 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-2xl flex items-center justify-center shadow-xl"
                  >
                    <span className="text-3xl">📊</span>
                  </motion.div>

                  {/* Third Row - Learning */}
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1.2 }}
                    className="absolute top-52 left-12 w-20 h-20 bg-gradient-to-r from-purple-400 to-violet-500 rounded-3xl flex items-center justify-center shadow-xl"
                  >
                    <span className="text-3xl">🎓</span>
                  </motion.div>

                  {/* Right Side - Weather */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 1.4 }}
                    className="absolute top-12 right-12 w-24 h-24 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-3xl flex items-center justify-center shadow-xl"
                  >
                    <span className="text-4xl">☀️</span>
                  </motion.div>

                  {/* Center - Animated Turmeric - MUCH BIGGER */}
                  <motion.div
                    animate={{ 
                      scale: [1, 1.2, 1],
                      rotate: [0, 10, -10, 0]
                    }}
                    transition={{ 
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-gradient-to-r from-orange-400 to-red-500 rounded-full flex items-center justify-center shadow-2xl"
                  >
                    <motion.span
                      animate={{ 
                        fontSize: ['3rem', '4rem', '3rem']
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
                    className="absolute bottom-12 left-12 w-24 h-16 bg-gradient-to-r from-indigo-400 to-blue-500 rounded-2xl flex items-center justify-center shadow-xl"
                  >
                    <span className="text-3xl">🛡️</span>
                  </motion.div>

                  {/* Bottom Right - Notifications */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1.8 }}
                    className="absolute bottom-12 right-12 w-24 h-24 bg-gradient-to-r from-red-400 to-pink-500 rounded-3xl flex items-center justify-center shadow-xl"
                  >
                    <span className="text-4xl">🔔</span>
                  </motion.div>
                </div>

                {/* Floating Elements - BIGGER */}
                <motion.div
                  animate={{ 
                    y: [0, -15, 0],
                    rotate: [0, 10, 0]
                  }}
                  transition={{ 
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute top-20 right-20 w-12 h-12 bg-yellow-300 rounded-full opacity-60 text-2xl flex items-center justify-center"
                >
                  🌱
                </motion.div>
                <motion.div
                  animate={{ 
                    y: [0, 20, 0],
                    rotate: [0, -10, 0]
                  }}
                  transition={{ 
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1
                  }}
                  className="absolute bottom-20 left-20 w-10 h-10 bg-green-300 rounded-full opacity-60 text-xl flex items-center justify-center"
                >
                  🌿
                </motion.div>
              </motion.div>

              {/* Ground/Base - BIGGER */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.0 }}
                className="absolute -bottom-6 left-0 right-0 h-12 bg-gradient-to-r from-green-600 to-green-800 rounded-b-3xl shadow-xl"
              >
                <div className="absolute top-0 left-0 right-0 h-2 bg-green-400 rounded-t-full"></div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Features Section - BIGGER CARDS */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.0 }}
        className="bg-white py-20"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-gray-900 mb-6">🌱 Our Features</h2>
            <p className="text-2xl text-gray-600 max-w-3xl mx-auto font-medium">
              Everything you need for successful turmeric farming in one place
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -10 }}
                  onClick={() => handleFeatureClick(feature.id)}
                  className="bg-white rounded-3xl shadow-xl p-8 cursor-pointer hover:shadow-2xl transition-all duration-300 border-4 border-transparent hover:border-primary-200"
                >
                  <div className="text-center">
                    <div className={`w-24 h-24 bg-gradient-to-r ${feature.color} rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl`}>
                      <span className="text-4xl">{feature.emoji}</span>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-xl text-gray-600 mb-4 font-semibold">
                      {feature.subtitle}
                    </p>
                    <p className="text-lg text-gray-500">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.section>

      {/* Footer - BIGGER TEXT */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.2 }}
        className="bg-gray-900 text-white py-16"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
            <div>
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-2xl flex items-center justify-center">
                  <span className="text-white text-xl">🌱</span>
                </div>
                <span className="text-3xl font-bold">TurmerLink</span>
              </div>
              <p className="text-gray-400 text-lg">
                Empowering turmeric farmers with technology and transparency.
              </p>
            </div>
            
            <div>
              <h3 className="font-bold text-xl mb-6">Features</h3>
              <ul className="space-y-3 text-lg text-gray-400">
                <li>💰 Market Prices</li>
                <li>📊 Digital Ledger</li>
                <li>🎓 Learning Center</li>
                <li>☀️ Weather Forecast</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold text-xl mb-6">Support</h3>
              <ul className="space-y-3 text-lg text-gray-400">
                <li>❓ Help Center</li>
                <li>📞 Contact Us</li>
                <li>💬 FAQ</li>
                <li>👥 Community</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold text-xl mb-6">Contact</h3>
              <ul className="space-y-3 text-lg text-gray-400">
                <li>📍 Nizamabad, Telangana</li>
                <li>📱 +91 9876543210</li>
                <li>✉️ support@turmerlink.com</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-lg text-gray-400">
            <p>&copy; 2024 TurmerLink. All rights reserved.</p>
          </div>
        </div>
      </motion.footer>

      {/* Mobile Menu - BIGGER */}
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
            className="absolute right-0 top-0 h-full w-96 bg-white shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-8">
              <div className="flex items-center justify-between mb-12">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-2xl flex items-center justify-center">
                    <span className="text-white text-lg">🌱</span>
                  </div>
                  <span className="text-2xl font-bold text-gray-900">TurmerLink</span>
                </div>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <nav className="space-y-6">
                <a href="#" className="block text-primary-600 font-bold text-xl py-3">🏠 Home</a>
                <a href="#" className="block text-gray-600 py-3 text-xl font-semibold">💰 Market Prices</a>
                <a href="#" className="block text-gray-600 py-3 text-xl font-semibold">📊 My Sales</a>
                <a href="#" className="block text-gray-600 py-3 text-xl font-semibold">🎓 Learning</a>
                <a href="#" className="block text-gray-600 py-3 text-xl font-semibold">📞 Contact</a>
              </nav>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default RuralFriendlyHomePage;
