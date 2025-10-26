import React from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowTrendingUpIcon, ArrowTrendingDownIcon, MinusIcon } from '@heroicons/react/24/outline';

const PriceCard = ({ title, price, change, changePercent, location, icon, color = 'primary' }) => {
  const { t } = useTranslation();

  const getTrendIcon = () => {
    if (change > 0) return <ArrowTrendingUpIcon className="h-4 w-4 text-green-500" />;
    if (change < 0) return <ArrowTrendingDownIcon className="h-4 w-4 text-red-500" />;
    return <MinusIcon className="h-4 w-4 text-gray-500" />;
  };

  const getTrendColor = () => {
    if (change > 0) return 'text-green-600';
    if (change < 0) return 'text-red-600';
    return 'text-gray-600';
  };

  return (
    <div className={`bg-white rounded-xl shadow-lg p-6 border-l-4 border-${color}-500 hover:shadow-xl transition-shadow duration-300`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`p-2 bg-${color}-100 rounded-lg`}>
            {icon}
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-600">{title}</h3>
            {location && (
              <p className="text-xs text-gray-500">{location}</p>
            )}
          </div>
        </div>
        {getTrendIcon()}
      </div>

      <div className="space-y-2">
        <div className="flex items-baseline space-x-2">
          <span className="text-2xl font-bold text-gray-900">
            ₹{price?.toLocaleString()}
          </span>
          <span className="text-sm text-gray-500">/kg</span>
        </div>

        {change !== undefined && (
          <div className={`flex items-center space-x-1 text-sm ${getTrendColor()}`}>
            <span className="font-medium">
              {change > 0 ? '+' : ''}{change}
            </span>
            <span>({changePercent > 0 ? '+' : ''}{changePercent?.toFixed(1)}%)</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default PriceCard;
