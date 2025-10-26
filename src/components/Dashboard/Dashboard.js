import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  CurrencyRupeeIcon, 
  ChartBarIcon, 
  ShieldCheckIcon,
  SunIcon 
} from '@heroicons/react/24/outline';
import PriceCard from './PriceCard';
import WeatherWidget from './WeatherWidget';
import PriceTrendChart from './PriceTrendChart';
import { marketPriceAPI, weatherAPI, mspAPI, predictionAPI } from '../../services/api';
import toast from 'react-hot-toast';

const Dashboard = () => {
  const { t } = useTranslation();
  const [marketPrices, setMarketPrices] = useState(null);
  const [mspData, setMspData] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [priceTrends, setPriceTrends] = useState([]);
  const [predictions, setPredictions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    setLoading(true);
    try {
      const [
        prices,
        msp,
        weather,
        trends,
        prediction
      ] = await Promise.all([
        marketPriceAPI.getCurrentPrices(),
        mspAPI.getCurrentMSP(),
        weatherAPI.getWeather(),
        marketPriceAPI.getPriceTrends(),
        predictionAPI.getPricePrediction()
      ]);

      setMarketPrices(prices);
      setMspData(msp);
      setWeatherData(weather);
      setPriceTrends(trends);
      setPredictions(prediction);
    } catch (error) {
      console.error('Error loading dashboard data:', error);
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-gray-200 rounded w-1/4"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-32 bg-gray-200 rounded-xl"></div>
              ))}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="h-80 bg-gray-200 rounded-xl"></div>
              <div className="h-80 bg-gray-200 rounded-xl"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {t('dashboard')}
          </h1>
          <p className="text-gray-600">
            Welcome to your farming dashboard. Track prices, weather, and market trends.
          </p>
        </div>

        {/* Price Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <PriceCard
            title={t('todayPrice')}
            price={marketPrices?.mandi?.nizamabad}
            change={150}
            changePercent={1.8}
            location="Nizamabad"
            icon={<CurrencyRupeeIcon className="h-6 w-6 text-primary-600" />}
            color="primary"
          />
          
          <PriceCard
            title={t('mspPrice')}
            price={mspData?.turmeric?.current}
            change={mspData?.turmeric?.change}
            changePercent={mspData?.turmeric?.changePercent}
            location="Government MSP"
            icon={<ShieldCheckIcon className="h-6 w-6 text-green-600" />}
            color="green"
          />
          
          <PriceCard
            title="Hyderabad"
            price={marketPrices?.mandi?.hyderabad}
            change={200}
            changePercent={2.4}
            location="Mandi Price"
            icon={<ChartBarIcon className="h-6 w-6 text-blue-600" />}
            color="blue"
          />
          
          <PriceCard
            title="Export"
            price={marketPrices?.export?.chennai}
            change={300}
            changePercent={3.2}
            location="Chennai Port"
            icon={<SunIcon className="h-6 w-6 text-turmeric-600" />}
            color="turmeric"
          />
        </div>

        {/* Charts and Widgets */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <PriceTrendChart 
            priceData={priceTrends} 
            predictions={predictions}
          />
          <WeatherWidget weatherData={weatherData} />
        </div>

        {/* Market Insights */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Market Insights
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600 mb-2">
                ₹{((marketPrices?.mandi?.nizamabad || 0) - (mspData?.turmeric?.current || 0)).toLocaleString()}
              </div>
              <div className="text-sm text-gray-600">Above MSP</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600 mb-2">
                {weatherData?.current?.temperature}°C
              </div>
              <div className="text-sm text-gray-600">Current Temperature</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-turmeric-600 mb-2">
                {predictions?.[0]?.confidence ? `${(predictions[0].confidence * 100).toFixed(0)}%` : 'N/A'}
              </div>
              <div className="text-sm text-gray-600">Prediction Confidence</div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 bg-gradient-to-r from-primary-500 to-turmeric-500 rounded-xl p-6 text-white">
          <h3 className="text-xl font-semibold mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg p-4 text-left transition-colors">
              <div className="font-medium">Record Sale</div>
              <div className="text-sm opacity-90">Add your turmeric sale</div>
            </button>
            <button className="bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg p-4 text-left transition-colors">
              <div className="font-medium">Watch Videos</div>
              <div className="text-sm opacity-90">Learn farming techniques</div>
            </button>
            <button className="bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg p-4 text-left transition-colors">
              <div className="font-medium">Check Payments</div>
              <div className="text-sm opacity-90">View payment status</div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
