import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../contexts/LanguageContext';
import { ArrowLeftIcon, LanguageIcon } from '@heroicons/react/24/outline';

const AnimatedPage = ({ title, onBack, children, icon: Icon }) => {
  const { language, changeLanguage } = useLanguage();

  const handleLanguageToggle = () => {
    const newLanguage = language === 'en' ? 'te' : 'en';
    changeLanguage(newLanguage);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="min-h-screen bg-gradient-to-br from-green-50 via-yellow-50 to-orange-50"
    >
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white shadow-lg"
      >
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={onBack}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeftIcon className="h-6 w-6 text-gray-600" />
              </button>
              
              {Icon && (
                <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-turmeric-500 rounded-full flex items-center justify-center">
                  <Icon className="h-6 w-6 text-white" />
                </div>
              )}
              
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
                <p className="text-gray-600">TurmerLink</p>
              </div>
            </div>

            {/* Language Toggle */}
            <div className="flex items-center space-x-4">
              <button 
                onClick={handleLanguageToggle}
                className="flex items-center space-x-2 px-3 py-2 bg-gray-100 rounded-lg text-gray-700 hover:bg-gray-200 transition-colors font-semibold"
              >
                <LanguageIcon className="h-4 w-4" />
                <span>{language === 'te' ? 'English' : 'తెలుగు'}</span>
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="max-w-6xl mx-auto px-6 py-8"
      >
        {children}
      </motion.div>
    </motion.div>
  );
};

export default AnimatedPage;
