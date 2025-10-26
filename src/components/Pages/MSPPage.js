import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../contexts/LanguageContext';
import { 
  ShieldCheckIcon, 
  ArrowTrendingUpIcon,
  CheckCircleIcon,
  InformationCircleIcon
} from '@heroicons/react/24/outline';
import AnimatedPage from './AnimatedPage';

const MSPPage = ({ onBack }) => {
  const [mspData, setMspData] = useState(null);
  const [loading, setLoading] = useState(true);
  // eslint-disable-next-line no-unused-vars
  const { language: _language, changeLanguage: _changeLanguage } = useLanguage();

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setMspData({
        current: {
          price: 7500,
          year: '2024-25',
          status: 'active'
        },
        history: [
          { year: '2023-24', price: 7200, change: 300 },
          { year: '2022-23', price: 6900, change: 200 },
          { year: '2021-22', price: 6700, change: 150 }
        ],
        alerts: [
          {
            type: 'success',
            message: 'Current market price is ₹1,000 above MSP',
            icon: CheckCircleIcon
          },
          {
            type: 'info',
            message: 'MSP rate increased by ₹300 this year',
            icon: InformationCircleIcon
          }
        ]
      });
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <AnimatedPage title="MSP Rates" onBack={onBack} icon={ShieldCheckIcon}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white rounded-2xl shadow-lg p-6 animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-1/3 mb-4"></div>
              <div className="h-8 bg-gray-200 rounded w-1/2 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3"></div>
            </div>
          ))}
        </div>
      </AnimatedPage>
    );
  }

  return (
    <AnimatedPage title="MSP Rates" onBack={onBack} icon={ShieldCheckIcon}>
      {/* Current MSP */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl shadow-lg p-8 text-white mb-8"
      >
        <div className="text-center">
          <ShieldCheckIcon className="h-16 w-16 mx-auto mb-4 opacity-80" />
          <div className="text-4xl font-bold mb-2">
            ₹{mspData?.current?.price?.toLocaleString()}
          </div>
          <div className="text-xl opacity-90 mb-2">
            Minimum Support Price
          </div>
          <div className="text-sm opacity-75">
            {mspData?.current?.year} Season
          </div>
        </div>
      </motion.div>

      {/* Alerts */}
      <div className="space-y-4 mb-8">
        {mspData?.alerts?.map((alert, index) => {
          const Icon = alert.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`p-4 rounded-xl flex items-center space-x-3 ${
                alert.type === 'success' 
                  ? 'bg-green-50 border border-green-200' 
                  : 'bg-blue-50 border border-blue-200'
              }`}
            >
              <Icon className={`h-6 w-6 ${
                alert.type === 'success' ? 'text-green-600' : 'text-blue-600'
              }`} />
              <p className={`font-medium ${
                alert.type === 'success' ? 'text-green-800' : 'text-blue-800'
              }`}>
                {alert.message}
              </p>
            </motion.div>
          );
        })}
      </div>

      {/* MSP History */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="bg-white rounded-2xl shadow-lg p-6 mb-8"
      >
        <h3 className="text-xl font-bold text-gray-900 mb-6">MSP History</h3>
        <div className="space-y-4">
          {mspData?.history?.map((item, index) => (
            <motion.div
              key={item.year}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-xl"
            >
              <div>
                <div className="font-semibold text-gray-900">{item.year}</div>
                <div className="text-sm text-gray-600">Season</div>
              </div>
              <div className="text-right">
                <div className="text-xl font-bold text-gray-900">
                  ₹{item.price.toLocaleString()}
                </div>
                <div className="text-sm text-green-600 flex items-center">
                  <ArrowTrendingUpIcon className="h-4 w-4 mr-1" />
                  +₹{item.change}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* MSP Benefits */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="bg-white rounded-2xl shadow-lg p-6"
      >
        <h3 className="text-xl font-bold text-gray-900 mb-6">MSP Benefits</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <CheckCircleIcon className="h-6 w-6 text-green-600 mt-1" />
              <div>
                <h4 className="font-semibold text-gray-900">Price Protection</h4>
                <p className="text-sm text-gray-600">Guaranteed minimum price for your produce</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <CheckCircleIcon className="h-6 w-6 text-green-600 mt-1" />
              <div>
                <h4 className="font-semibold text-gray-900">Income Security</h4>
                <p className="text-sm text-gray-600">Stable income even during market fluctuations</p>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <CheckCircleIcon className="h-6 w-6 text-green-600 mt-1" />
              <div>
                <h4 className="font-semibold text-gray-900">Government Support</h4>
                <p className="text-sm text-gray-600">Direct procurement by government agencies</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <CheckCircleIcon className="h-6 w-6 text-green-600 mt-1" />
              <div>
                <h4 className="font-semibold text-gray-900">Fair Pricing</h4>
                <p className="text-sm text-gray-600">Transparent pricing based on production costs</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        <button className="bg-primary-600 text-white py-4 px-6 rounded-xl font-semibold hover:bg-primary-700 transition-colors shadow-lg">
          Apply for MSP
        </button>
        <button className="bg-green-600 text-white py-4 px-6 rounded-xl font-semibold hover:bg-green-700 transition-colors shadow-lg">
          Contact Procurement Center
        </button>
      </motion.div>
    </AnimatedPage>
  );
};

export default MSPPage;
