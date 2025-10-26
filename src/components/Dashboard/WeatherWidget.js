import React from 'react';
import { useTranslation } from 'react-i18next';
import { 
  SunIcon, 
  CloudIcon, 
  CloudArrowDownIcon, 
  BoltIcon,
  EyeIcon,
  SignalIcon 
} from '@heroicons/react/24/outline';

const WeatherWidget = ({ weatherData }) => {
  const { t } = useTranslation();

  const getWeatherIcon = (condition) => {
    const conditionLower = condition?.toLowerCase() || '';
    
    if (conditionLower.includes('sunny') || conditionLower.includes('clear')) {
      return <SunIcon className="h-6 w-6 text-yellow-500" />;
    } else if (conditionLower.includes('cloud') || conditionLower.includes('overcast')) {
      return <CloudIcon className="h-6 w-6 text-gray-500" />;
    } else if (conditionLower.includes('rain') || conditionLower.includes('drizzle')) {
      return <CloudArrowDownIcon className="h-6 w-6 text-blue-500" />;
    } else if (conditionLower.includes('storm') || conditionLower.includes('thunder')) {
      return <BoltIcon className="h-6 w-6 text-purple-500" />;
    }
    return <SunIcon className="h-6 w-6 text-yellow-500" />;
  };

  const getWeatherColor = (condition) => {
    const conditionLower = condition?.toLowerCase() || '';
    
    if (conditionLower.includes('sunny') || conditionLower.includes('clear')) {
      return 'from-yellow-400 to-orange-500';
    } else if (conditionLower.includes('cloud') || conditionLower.includes('overcast')) {
      return 'from-gray-400 to-gray-600';
    } else if (conditionLower.includes('rain') || conditionLower.includes('drizzle')) {
      return 'from-blue-400 to-blue-600';
    }
    return 'from-yellow-400 to-orange-500';
  };

  if (!weatherData) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="h-8 bg-gray-200 rounded w-1/2 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">{t('weather')}</h3>
        <div className={`p-2 rounded-lg bg-gradient-to-r ${getWeatherColor(weatherData.current?.condition)}`}>
          {getWeatherIcon(weatherData.current?.condition)}
        </div>
      </div>

      {/* Current Weather */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-3xl font-bold text-gray-900">
              {weatherData.current?.temperature}°C
            </div>
            <div className="text-sm text-gray-600">
              {weatherData.current?.condition}
            </div>
          </div>
          <div className="text-right space-y-1">
            <div className="flex items-center text-sm text-gray-600">
              <EyeIcon className="h-4 w-4 mr-1" />
              {weatherData.current?.humidity}% humidity
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <SignalIcon className="h-4 w-4 mr-1" />
              {weatherData.current?.windSpeed} km/h
            </div>
          </div>
        </div>
      </div>

      {/* Forecast */}
      {weatherData.forecast && (
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-3">{t('next7Days')}</h4>
          <div className="space-y-2">
            {weatherData.forecast.slice(0, 3).map((day, index) => (
              <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                <div className="flex items-center space-x-3">
                  {getWeatherIcon(day.condition)}
                  <div>
                    <div className="text-sm font-medium text-gray-900">
                      {new Date(day.date).toLocaleDateString('en-IN', { 
                        weekday: 'short',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </div>
                    <div className="text-xs text-gray-500">{day.condition}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-gray-900">
                    {day.high}° / {day.low}°
                  </div>
                  {day.precipitation > 0 && (
                    <div className="text-xs text-blue-600">
                      {day.precipitation}% rain
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherWidget;
