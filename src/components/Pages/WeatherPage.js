import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../contexts/LanguageContext';
import {
  SunIcon,
  CloudIcon,
  CloudArrowDownIcon,
  BoltIcon,
  EyeIcon,
  BeakerIcon,
  SignalIcon,
  FireIcon,
  ArrowPathIcon
} from '@heroicons/react/24/outline';
import AnimatedPage from './AnimatedPage';

const WeatherPage = ({ onBack }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState('nizamabad');
  const { language } = useLanguage();

  const locations = {
    nizamabad: {
      name: language === 'te' ? 'నిజామాబాద్' : 'Nizamabad',
      lat: 18.6715,
      lon: 78.0938,
      state: language === 'te' ? 'తెలంగాణ' : 'Telangana'
    },
    hyderabad: {
      name: language === 'te' ? 'హైదరాబాద్' : 'Hyderabad',
      lat: 17.3850,
      lon: 78.4867,
      state: language === 'te' ? 'తెలంగాణ' : 'Telangana'
    }
  };

  // OpenWeatherMap API key (you should replace this with your own free API key)
  const API_KEY = 'your_openweathermap_api_key_here';
  const API_URL = `https://api.openweathermap.org/data/2.5/weather`;

  const fetchWeatherData = async (location) => {
    try {
      setLoading(true);
      
      // For demo purposes, we'll use mock data since we don't have a real API key
      // In production, replace this with actual API call:
      /*
      const response = await fetch(
        `${API_URL}?lat=${location.lat}&lon=${location.lon}&appid=${API_KEY}&units=metric`
      );
      const data = await response.json();
      */
      
      // Mock data for demo (replace with real API call)
      const mockData = {
        main: {
          temp: Math.floor(Math.random() * 10) + 25, // 25-35°C
          feels_like: Math.floor(Math.random() * 10) + 25,
          humidity: Math.floor(Math.random() * 30) + 40, // 40-70%
          pressure: Math.floor(Math.random() * 50) + 1000 // 1000-1050 hPa
        },
        weather: [
          {
            main: ['Clear', 'Clouds', 'Rain', 'Thunderstorm'][Math.floor(Math.random() * 4)],
            description: ['clear sky', 'few clouds', 'scattered clouds', 'light rain'][Math.floor(Math.random() * 4)],
            icon: ['01d', '02d', '03d', '10d'][Math.floor(Math.random() * 4)]
          }
        ],
        wind: {
          speed: Math.floor(Math.random() * 15) + 5, // 5-20 km/h
          deg: Math.floor(Math.random() * 360)
        },
        visibility: Math.floor(Math.random() * 5000) + 5000, // 5-10 km
        dt: Math.floor(Date.now() / 1000)
      };

      setWeatherData({
        ...mockData,
        location: location.name,
        state: location.state
      });
      
      setLastUpdated(new Date());
      setLoading(false);
    } catch (error) {
      console.error('Error fetching weather data:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeatherData(locations[selectedLocation]);
    
    // Auto-refresh every 10 minutes
    const interval = setInterval(() => {
      fetchWeatherData(locations[selectedLocation]);
    }, 10 * 60 * 1000);

    return () => clearInterval(interval);
  }, [selectedLocation]);

  const getWeatherIcon = (weatherMain) => {
    switch (weatherMain) {
      case 'Clear':
        return <SunIcon className="h-16 w-16 text-yellow-500" />;
      case 'Clouds':
        return <CloudIcon className="h-16 w-16 text-gray-500" />;
      case 'Rain':
        return <CloudArrowDownIcon className="h-16 w-16 text-blue-500" />;
      case 'Thunderstorm':
        return <BoltIcon className="h-16 w-16 text-purple-500" />;
      default:
        return <SunIcon className="h-16 w-16 text-yellow-500" />;
    }
  };

  const getWeatherColor = (weatherMain) => {
    switch (weatherMain) {
      case 'Clear':
        return 'from-yellow-400 to-orange-500';
      case 'Clouds':
        return 'from-gray-400 to-gray-600';
      case 'Rain':
        return 'from-blue-400 to-blue-600';
      case 'Thunderstorm':
        return 'from-purple-400 to-purple-600';
      default:
        return 'from-yellow-400 to-orange-500';
    }
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleTimeString();
  };

  const handleRefresh = () => {
    fetchWeatherData(locations[selectedLocation]);
  };

  if (loading && !weatherData) {
    return (
      <AnimatedPage title={language === 'te' ? 'వాతావరణం' : 'Weather'} onBack={onBack} icon={SunIcon}>
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

  return (
    <AnimatedPage title={language === 'te' ? 'వాతావరణం' : 'Weather'} onBack={onBack} icon={SunIcon}>
      {/* Location Selector */}
      <div className="mb-8">
        <div className="flex space-x-2 bg-white rounded-xl p-1 shadow-sm">
          {Object.entries(locations).map(([key, location]) => (
            <button
              key={key}
              onClick={() => setSelectedLocation(key)}
              className={`flex-1 py-3 px-4 rounded-lg font-medium transition-colors ${
                selectedLocation === key
                  ? 'bg-green-600 text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {location.name}
            </button>
          ))}
        </div>
      </div>

      {/* Current Weather */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-xl p-8 text-white mb-8"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold">{weatherData?.location}</h2>
            <p className="text-blue-100">{weatherData?.state}</p>
          </div>
          <button
            onClick={handleRefresh}
            className="p-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors"
          >
            <ArrowPathIcon className="h-6 w-6" />
          </button>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            {getWeatherIcon(weatherData?.weather[0]?.main)}
            <div>
              <div className="text-6xl font-bold">{weatherData?.main?.temp}°C</div>
              <div className="text-xl text-blue-100 capitalize">
                {weatherData?.weather[0]?.description}
              </div>
            </div>
          </div>
          <div className="text-right">
            <p className="text-blue-100">
              {language === 'te' ? 'అనుభవం' : 'Feels like'} {weatherData?.main?.feels_like}°C
            </p>
            <p className="text-sm text-blue-200">
              {lastUpdated && lastUpdated.toLocaleTimeString()}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Weather Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white rounded-2xl shadow-lg p-6"
        >
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <BeakerIcon className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">
                {language === 'te' ? 'తేమ' : 'Humidity'}
              </h3>
              <p className="text-sm text-gray-600">
                {language === 'te' ? 'వాతావరణ తేమ' : 'Air moisture'}
              </p>
            </div>
          </div>
          <div className="text-3xl font-bold text-blue-600">
            {weatherData?.main?.humidity}%
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-2xl shadow-lg p-6"
        >
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <SignalIcon className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">
                {language === 'te' ? 'గాలి వేగం' : 'Wind Speed'}
              </h3>
              <p className="text-sm text-gray-600">
                {language === 'te' ? 'కిమీ/గంట' : 'km/h'}
              </p>
            </div>
          </div>
          <div className="text-3xl font-bold text-green-600">
            {weatherData?.wind?.speed}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-white rounded-2xl shadow-lg p-6"
        >
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
              <EyeIcon className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">
                {language === 'te' ? 'దృశ్యత' : 'Visibility'}
              </h3>
              <p className="text-sm text-gray-600">
                {language === 'te' ? 'కిలోమీటర్లు' : 'kilometers'}
              </p>
            </div>
          </div>
          <div className="text-3xl font-bold text-purple-600">
            {(weatherData?.visibility / 1000).toFixed(1)}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-white rounded-2xl shadow-lg p-6"
        >
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
              <FireIcon className="h-6 w-6 text-orange-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">
                {language === 'te' ? 'ఒత్తిడి' : 'Pressure'}
              </h3>
              <p className="text-sm text-gray-600">
                {language === 'te' ? 'హెక్టోపాస్కల్' : 'hPa'}
              </p>
            </div>
          </div>
          <div className="text-3xl font-bold text-orange-600">
            {weatherData?.main?.pressure}
          </div>
        </motion.div>
      </div>

      {/* Weather Alert */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl shadow-lg p-6 text-white"
      >
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
            <SunIcon className="h-6 w-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold">
              {language === 'te' ? 'వ్యవసాయ సలహా' : 'Farming Advice'}
            </h3>
            <p className="text-green-100">
              {weatherData?.main?.temp > 30 
                ? (language === 'te' ? 'ఈ రోజు వేడి వాతావరణం. మీ పంటలకు తగినంత నీరు ఇవ్వండి.' : 'Hot weather today. Ensure adequate watering for your crops.')
                : (language === 'te' ? 'మంచి వాతావరణం వ్యవసాయం కోసం. పంటలను తనిఖీ చేయండి.' : 'Good weather for farming. Check your crops.')
              }
            </p>
          </div>
        </div>
      </motion.div>

      {/* API Setup Instructions */}
    </AnimatedPage>
  );
};

export default WeatherPage;