import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  CurrencyRupeeIcon, 
  BookOpenIcon, 
  AcademicCapIcon, 
  BellIcon,
  ScaleIcon,
  SunIcon,
  ChartBarIcon,
  ShieldCheckIcon
} from '@heroicons/react/24/outline';
import { motion, AnimatePresence } from 'framer-motion';

const HomePage = ({ onNavigate }) => {
  const { t } = useTranslation();
  const [selectedFeature, setSelectedFeature] = useState(null);

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

  const handleFeatureClick = (feature) => {
    setSelectedFeature(feature);
    setTimeout(() => {
      onNavigate(feature.id);
    }, 300);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-yellow-50 to-orange-50">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white shadow-lg"
      >
        <div className="max-w-4xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-3xl">🌱</span>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">TurmerLink</h1>
                <p className="text-gray-600">Farmers Market Access</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button className="px-4 py-2 bg-gray-100 rounded-lg text-gray-700 hover:bg-gray-200 transition-colors">
                తెలుగు
              </button>
              <button className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
                Login
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Welcome Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome to TurmerLink
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Your complete farming companion for market prices, sales tracking, and learning
          </p>
        </motion.div>

        {/* Features Grid */}
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
                whileTap={{ scale: 0.95 }}
                onClick={() => handleFeatureClick(feature)}
                className="bg-white rounded-2xl shadow-lg p-8 cursor-pointer hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-primary-200"
              >
                <div className="text-center">
                  <div className={`w-20 h-20 bg-gradient-to-r ${feature.color} rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg`}>
                    <Icon className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-lg text-gray-600 mb-3">
                    {feature.subtitle}
                  </p>
                  <p className="text-gray-500 text-sm">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Quick Stats */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 bg-white rounded-2xl shadow-lg p-8"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Today's Market Overview
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">₹8,500</div>
              <div className="text-gray-600">Nizamabad Price</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">₹7,500</div>
              <div className="text-gray-600">MSP Rate</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600 mb-2">28°C</div>
              <div className="text-gray-600">Temperature</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">+₹200</div>
              <div className="text-gray-600">Price Change</div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Feature Preview Modal */}
      <AnimatePresence>
        {selectedFeature && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedFeature(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white rounded-2xl p-8 max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center">
                <div className={`w-16 h-16 bg-gradient-to-r ${selectedFeature.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <selectedFeature.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {selectedFeature.title}
                </h3>
                <p className="text-gray-600 mb-6">
                  {selectedFeature.description}
                </p>
                <div className="flex space-x-4">
                  <button
                    onClick={() => setSelectedFeature(null)}
                    className="flex-1 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleFeatureClick(selectedFeature)}
                    className="flex-1 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                  >
                    Open
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HomePage;
