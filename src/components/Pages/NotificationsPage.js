import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../contexts/LanguageContext';
import { 
  BellIcon, 
  CheckCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import AnimatedPage from './AnimatedPage';

const NotificationsPage = ({ onBack }) => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const { language } = useLanguage();

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setNotifications([
        {
          id: 1,
          type: 'price',
          title: 'Price Alert',
          message: 'Turmeric price increased to ₹8,500 per kg',
          time: '2 hours ago',
          read: false,
          icon: InformationCircleIcon,
          color: 'blue'
        },
        {
          id: 2,
          type: 'weather',
          title: 'Weather Update',
          message: 'Rain expected in next 3 days. Plan harvesting accordingly.',
          time: '4 hours ago',
          read: false,
          icon: ExclamationTriangleIcon,
          color: 'yellow'
        },
        {
          id: 3,
          type: 'msp',
          title: 'MSP Update',
          message: 'New MSP rate announced: ₹7,500 per kg',
          time: '1 day ago',
          read: true,
          icon: CheckCircleIcon,
          color: 'green'
        },
        {
          id: 4,
          type: 'payment',
          title: 'Payment Received',
          message: 'Payment of ₹42,500 received for your sale',
          time: '2 days ago',
          read: true,
          icon: CheckCircleIcon,
          color: 'green'
        }
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const markAsRead = (id) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const deleteNotification = (id) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const getColorClasses = (color) => {
    switch (color) {
      case 'blue':
        return 'bg-blue-100 text-blue-800';
      case 'green':
        return 'bg-green-100 text-green-800';
      case 'yellow':
        return 'bg-yellow-100 text-yellow-800';
      case 'red':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <AnimatedPage title="Notifications" onBack={onBack} icon={BellIcon}>
        <div className="space-y-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white rounded-2xl shadow-lg p-6 animate-pulse">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                <div className="flex-1">
                  <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3 mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/4"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </AnimatedPage>
    );
  }

  return (
    <AnimatedPage title="Notifications" onBack={onBack} icon={BellIcon}>
      {/* Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
      >
        <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
          <div className="text-3xl font-bold text-blue-600 mb-2">
            {notifications.filter(n => !n.read).length}
          </div>
          <div className="text-sm text-gray-600">Unread</div>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
          <div className="text-3xl font-bold text-green-600 mb-2">
            {notifications.filter(n => n.read).length}
          </div>
          <div className="text-sm text-gray-600">Read</div>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
          <div className="text-3xl font-bold text-orange-600 mb-2">
            {notifications.length}
          </div>
          <div className="text-sm text-gray-600">Total</div>
        </div>
      </motion.div>

      {/* Notifications List */}
      <div className="space-y-4">
        {notifications.map((notification, index) => {
          const Icon = notification.icon;
          return (
            <motion.div
              key={notification.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`bg-white rounded-2xl shadow-lg p-6 border-l-4 ${
                notification.read ? 'border-gray-300' : 'border-primary-500'
              }`}
            >
              <div className="flex items-start space-x-4">
                <div className={`p-3 rounded-full ${getColorClasses(notification.color)}`}>
                  <Icon className="h-6 w-6" />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className={`font-semibold ${notification.read ? 'text-gray-600' : 'text-gray-900'}`}>
                      {notification.title}
                    </h3>
                    <div className="flex items-center space-x-2">
                      {!notification.read && (
                        <button
                          onClick={() => markAsRead(notification.id)}
                          className="text-xs bg-primary-100 text-primary-600 px-2 py-1 rounded-full hover:bg-primary-200 transition-colors"
                        >
                          Mark Read
                        </button>
                      )}
                      <button
                        onClick={() => deleteNotification(notification.id)}
                        className="text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <XMarkIcon className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  
                  <p className={`text-sm mb-2 ${notification.read ? 'text-gray-500' : 'text-gray-700'}`}>
                    {notification.message}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-400">{notification.time}</span>
                    <span className={`text-xs px-2 py-1 rounded-full ${getColorClasses(notification.color)}`}>
                      {notification.type}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        <button className="bg-primary-600 text-white py-4 px-6 rounded-xl font-semibold hover:bg-primary-700 transition-colors shadow-lg">
          Mark All Read
        </button>
        <button className="bg-green-600 text-white py-4 px-6 rounded-xl font-semibold hover:bg-green-700 transition-colors shadow-lg">
          Notification Settings
        </button>
      </motion.div>

      {/* Notification Settings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="mt-8 bg-white rounded-2xl shadow-lg p-6"
      >
        <h3 className="text-xl font-bold text-gray-900 mb-6">Notification Preferences</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-semibold text-gray-900">Price Alerts</h4>
              <p className="text-sm text-gray-600">Get notified when prices change significantly</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
            </label>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-semibold text-gray-900">Weather Updates</h4>
              <p className="text-sm text-gray-600">Daily weather forecasts and alerts</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
            </label>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-semibold text-gray-900">MSP Updates</h4>
              <p className="text-sm text-gray-600">Government MSP announcements</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
            </label>
          </div>
        </div>
      </motion.div>
    </AnimatedPage>
  );
};

export default NotificationsPage;
