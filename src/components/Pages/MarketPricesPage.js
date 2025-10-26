import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../contexts/LanguageContext';
import {
  CurrencyRupeeIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  ArrowPathIcon,
  ExclamationTriangleIcon,
  CreditCardIcon,
  SpeakerWaveIcon,
  LightBulbIcon
} from '@heroicons/react/24/outline';
import AnimatedPage from './AnimatedPage';

const MarketPricesPage = ({ onBack }) => {
  const [prices, setPrices] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [error, setError] = useState(null);
  const [showPayment, setShowPayment] = useState(false);
  const { language } = useLanguage();

  // Simple price prediction
  const getPricePrediction = (currentPrice) => {
    const trend = Math.random() > 0.5 ? 'up' : 'down';
    const change = Math.floor(Math.random() * 500) + 100;
    return {
      trend,
      predictedPrice: trend === 'up' ? currentPrice + change : currentPrice - change,
      confidence: Math.floor(Math.random() * 20) + 70
    };
  };

  // Simple voice announcement
  const announcePrices = () => {
    if ('speechSynthesis' in window && prices) {
      const message = language === 'te' 
        ? `నిజామాబాద్ లో టర్మరిక్ ధర ₹${prices.nizamabad.price.toLocaleString()}. ఇది MSP కంటే ₹${prices.nizamabad.price - prices.msp.price} ఎక్కువ.`
        : `Turmeric price in Nizamabad is ₹${prices.nizamabad.price.toLocaleString()}. This is ₹${prices.nizamabad.price - prices.msp.price} above MSP.`;
      
      const utterance = new SpeechSynthesisUtterance(message);
      utterance.volume = 0.7;
      utterance.rate = 0.8;
      speechSynthesis.speak(utterance);
    }
  };

  // Market locations with coordinates
  const markets = {
    nizamabad: {
      name: language === 'te' ? 'నిజామాబాద్' : 'Nizamabad',
      lat: 18.6715,
      lon: 78.0938,
      state: language === 'te' ? 'తెలంగాణ' : 'Telangana',
      type: 'local'
    },
    hyderabad: {
      name: language === 'te' ? 'హైదరాబాద్' : 'Hyderabad',
      lat: 17.3850,
      lon: 78.4867,
      state: language === 'te' ? 'తెలంగాణ' : 'Telangana',
      type: 'state_capital'
    },
    mumbai: {
      name: language === 'te' ? 'ముంబై' : 'Mumbai',
      lat: 19.0760,
      lon: 72.8777,
      state: language === 'te' ? 'మహారాష్ట్ర' : 'Maharashtra',
      type: 'export'
    },
    delhi: {
      name: language === 'te' ? 'ఢిల్లీ' : 'Delhi',
      lat: 28.7041,
      lon: 77.1025,
      state: language === 'te' ? 'ఢిల్లీ' : 'Delhi',
      type: 'national'
    }
  };

  // API endpoints for market prices (for future use)
  // const API_ENDPOINTS = {
  //   // Primary API - Agricultural Market Information System (AMIS)
  //   amis: 'https://data.gov.in/api/datastore/resource.json',
  //   
  //   // Secondary API - Commodity prices
  //   commodity: 'https://api.commodity.com/v1/prices',
  //   
  //   // Tertiary API - Market rates
  //   market: 'https://api.marketrates.com/v1/turmeric'
  // };

  const fetchMarketPrices = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // For demo purposes, we'll simulate real market data
      // In production, replace with actual API calls:
      
      /*
      // Real API implementation example:
      const response = await fetch(`${API_ENDPOINTS.amis}?resource_id=your_resource_id&api-key=your_api_key`);
      const data = await response.json();
      */
      
      // Mock realistic market data (replace with real API calls)
      const mockPrices = {
        nizamabad: {
          price: Math.floor(Math.random() * 2000) + 7000, // ₹7000-9000 range
          change: Math.floor(Math.random() * 400) - 200, // ±₹200 variation
          trend: Math.random() > 0.5 ? 'up' : 'down',
          volume: Math.floor(Math.random() * 1000) + 500, // 500-1500 quintals
          quality: 'Grade A'
        },
        hyderabad: {
          price: Math.floor(Math.random() * 2000) + 7200, // ₹7200-9200 range
          change: Math.floor(Math.random() * 400) - 200,
          trend: Math.random() > 0.5 ? 'up' : 'down',
          volume: Math.floor(Math.random() * 2000) + 1000, // 1000-3000 quintals
          quality: 'Grade A'
        },
        mumbai: {
          price: Math.floor(Math.random() * 2000) + 8000, // ₹8000-10000 range
          change: Math.floor(Math.random() * 400) - 200,
          trend: Math.random() > 0.5 ? 'up' : 'down',
          volume: Math.floor(Math.random() * 5000) + 2000, // 2000-7000 quintals
          quality: 'Export Grade'
        },
        delhi: {
          price: Math.floor(Math.random() * 2000) + 7500, // ₹7500-9500 range
          change: Math.floor(Math.random() * 400) - 200,
          trend: Math.random() > 0.5 ? 'up' : 'down',
          volume: Math.floor(Math.random() * 3000) + 1500, // 1500-4500 quintals
          quality: 'Grade A'
        },
        msp: {
          price: 7500, // Fixed MSP rate
          change: 0,
          trend: 'stable',
          volume: 'N/A',
          quality: 'MSP Rate'
        }
      };

      setPrices(mockPrices);
      setLastUpdated(new Date());
      setLoading(false);
    } catch (error) {
      console.error('Error fetching market prices:', error);
      setError('Failed to fetch market prices');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMarketPrices();
    
    // Auto-refresh every 30 minutes
    const interval = setInterval(() => {
      fetchMarketPrices();
    }, 30 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  const PriceCard = ({ title, price, change, trend, location, volume, quality }) => {
    const prediction = getPricePrediction(price);
    
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-primary-500"
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
            <p className="text-sm text-gray-600">{location}</p>
            <p className="text-xs text-blue-600 font-medium">{quality}</p>
          </div>
          <div className={`p-2 rounded-full ${trend === 'up' ? 'bg-green-100' : trend === 'down' ? 'bg-red-100' : 'bg-gray-100'}`}>
            {trend === 'up' ? (
              <ArrowTrendingUpIcon className="h-5 w-5 text-green-600" />
            ) : trend === 'down' ? (
              <ArrowTrendingDownIcon className="h-5 w-5 text-red-600" />
            ) : (
              <CurrencyRupeeIcon className="h-5 w-5 text-gray-600" />
            )}
          </div>
        </div>

        <div className="space-y-2">
          <div className="text-3xl font-bold text-gray-900">
            ₹{price?.toLocaleString()}
          </div>
          <div className={`text-sm font-medium ${trend === 'up' ? 'text-green-600' : trend === 'down' ? 'text-red-600' : 'text-gray-600'}`}>
            {trend === 'up' ? '+' : trend === 'down' ? '-' : ''}₹{Math.abs(change)} ({trend === 'up' ? '+' : trend === 'down' ? '-' : ''}{(Math.abs(change)/price*100).toFixed(1)}%)
          </div>
          {volume !== 'N/A' && (
            <div className="text-xs text-gray-500">
              {language === 'te' ? 'వాల్యూమ్' : 'Volume'}: {volume} {language === 'te' ? 'క్వింటాళ్లు' : 'quintals'}
            </div>
          )}
        </div>

        {/* Simple Price Prediction */}
        <div className="mt-4 p-3 bg-blue-50 rounded-lg">
          <div className="flex items-center space-x-2 mb-2">
            <LightBulbIcon className="h-4 w-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-800">
              {language === 'te' ? 'అంచనా' : 'Prediction'}
            </span>
          </div>
          <div className="text-sm text-blue-700">
            {language === 'te' ? 'తదుపరి వారం' : 'Next week'}: ₹{prediction.predictedPrice.toLocaleString()}
            <span className={`ml-2 ${prediction.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
              ({prediction.trend === 'up' ? '↗' : '↘'} {prediction.confidence}%)
            </span>
          </div>
        </div>

        {/* Simple Payment Option */}
        <div className="mt-3">
          <button
            onClick={() => setShowPayment(true)}
            className="w-full bg-green-600 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors flex items-center justify-center space-x-2"
          >
            <CreditCardIcon className="h-4 w-4" />
            <span>{language === 'te' ? 'చెల్లింపు చేయండి' : 'Make Payment'}</span>
          </button>
        </div>
      </motion.div>
    );
  };

  const handleRefresh = () => {
    fetchMarketPrices();
  };

  if (loading && !prices) {
    return (
      <AnimatedPage title={language === 'te' ? 'మార్కెట్ ధరలు' : 'Market Prices'} onBack={onBack} icon={CurrencyRupeeIcon}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white rounded-2xl shadow-lg p-6 animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-1/3 mb-4"></div>
              <div className="h-8 bg-gray-200 rounded w-1/2 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            </div>
          ))}
        </div>
      </AnimatedPage>
    );
  }

  if (error) {
    return (
      <AnimatedPage title={language === 'te' ? 'మార్కెట్ ధరలు' : 'Market Prices'} onBack={onBack} icon={CurrencyRupeeIcon}>
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
          <ExclamationTriangleIcon className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-red-800 mb-2">
            {language === 'te' ? 'ధరలు లోడ్ చేయడంలో లోపం' : 'Error Loading Prices'}
          </h3>
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={handleRefresh}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            {language === 'te' ? 'మళ్లీ ప్రయత్నించండి' : 'Try Again'}
          </button>
        </div>
      </AnimatedPage>
    );
  }

  return (
    <AnimatedPage title={language === 'te' ? 'మార్కెట్ ధరలు' : 'Market Prices'} onBack={onBack} icon={CurrencyRupeeIcon}>
      {/* Header with refresh button */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            {language === 'te' ? 'లైవ్ టర్మరిక్ ధరలు' : 'Live Turmeric Prices'}
          </h2>
          <p className="text-gray-600">
            {lastUpdated && (
              <>
                {language === 'te' ? 'చివరిగా నవీకరించబడినది' : 'Last updated'}: {lastUpdated.toLocaleTimeString()}
              </>
            )}
          </p>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={announcePrices}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <SpeakerWaveIcon className="h-5 w-5" />
            <span>{language === 'te' ? 'వినండి' : 'Listen'}</span>
          </button>
          <button
            onClick={handleRefresh}
            className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <ArrowPathIcon className="h-5 w-5" />
            <span>{language === 'te' ? 'నవీకరించండి' : 'Refresh'}</span>
          </button>
        </div>
      </div>

      {/* Price Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <PriceCard
          title={markets.nizamabad.name}
          price={prices?.nizamabad?.price}
          change={prices?.nizamabad?.change}
          trend={prices?.nizamabad?.trend}
          location={language === 'te' ? 'స్థానిక మార్కెట్' : 'Local Market'}
          volume={prices?.nizamabad?.volume}
          quality={prices?.nizamabad?.quality}
        />
        <PriceCard
          title={markets.hyderabad.name}
          price={prices?.hyderabad?.price}
          change={prices?.hyderabad?.change}
          trend={prices?.hyderabad?.trend}
          location={language === 'te' ? 'రాష్ట్ర రాజధాని' : 'State Capital'}
          volume={prices?.hyderabad?.volume}
          quality={prices?.hyderabad?.quality}
        />
        <PriceCard
          title={markets.mumbai.name}
          price={prices?.mumbai?.price}
          change={prices?.mumbai?.change}
          trend={prices?.mumbai?.trend}
          location={language === 'te' ? 'ఎగుమతి మార్కెట్' : 'Export Market'}
          volume={prices?.mumbai?.volume}
          quality={prices?.mumbai?.quality}
        />
        <PriceCard
          title={language === 'te' ? 'MSP రేట్' : 'MSP Rate'}
          price={prices?.msp?.price}
          change={prices?.msp?.change}
          trend={prices?.msp?.trend}
          location={language === 'te' ? 'ప్రభుత్వ రేట్' : 'Government Rate'}
          volume={prices?.msp?.volume}
          quality={prices?.msp?.quality}
        />
      </div>

      {/* Market Insights */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="bg-white rounded-2xl shadow-lg p-6 mb-8"
      >
        <h3 className="text-xl font-bold text-gray-900 mb-4">
          {language === 'te' ? 'మార్కెట్ అంతర్దృష్టులు' : 'Market Insights'}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600 mb-2">
              ₹{prices?.nizamabad?.price - prices?.msp?.price}
            </div>
            <div className="text-sm text-gray-600">
              {language === 'te' ? 'MSP కంటే ఎక్కువ' : 'Above MSP'}
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600 mb-2">
              {language === 'te' ? 'మంచిది' : 'Good'}
            </div>
            <div className="text-sm text-gray-600">
              {language === 'te' ? 'మార్కెట్ పరిస్థితి' : 'Market Condition'}
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600 mb-2">
              +5.2%
            </div>
            <div className="text-sm text-gray-600">
              {language === 'te' ? 'వారపు వృద్ధి' : 'Weekly Growth'}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        <button className="bg-primary-600 text-white py-4 px-6 rounded-xl font-semibold hover:bg-primary-700 transition-colors shadow-lg">
          {language === 'te' ? 'ధర అలర్ట్ సెట్ చేయండి' : 'Set Price Alert'}
        </button>
        <button className="bg-green-600 text-white py-4 px-6 rounded-xl font-semibold hover:bg-green-700 transition-colors shadow-lg">
          {language === 'te' ? 'ధర చరిత్ర చూడండి' : 'View Price History'}
        </button>
      </motion.div>

      {/* Simple Payment Modal */}
      {showPayment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl p-6 max-w-md w-full mx-4"
          >
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              {language === 'te' ? 'చెల్లింపు చేయండి' : 'Make Payment'}
            </h3>
            <div className="space-y-4">
              <div className="p-4 bg-green-50 rounded-lg">
                <div className="text-sm text-green-800">
                  {language === 'te' ? 'ఎంచుకోండి' : 'Choose payment method'}
                </div>
              </div>
              <div className="space-y-2">
                <button className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                  {language === 'te' ? 'UPI చెల్లింపు' : 'UPI Payment'}
                </button>
                <button className="w-full bg-green-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-green-700 transition-colors">
                  {language === 'te' ? 'బ్యాంక్ ట్రాన్స్ఫర్' : 'Bank Transfer'}
                </button>
                <button className="w-full bg-gray-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-gray-700 transition-colors">
                  {language === 'te' ? 'నగదు చెల్లింపు' : 'Cash Payment'}
                </button>
              </div>
              <button
                onClick={() => setShowPayment(false)}
                className="w-full bg-gray-300 text-gray-700 py-2 px-4 rounded-lg font-medium hover:bg-gray-400 transition-colors"
              >
                {language === 'te' ? 'రద్దు చేయండి' : 'Cancel'}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatedPage>
  );
};

export default MarketPricesPage;
