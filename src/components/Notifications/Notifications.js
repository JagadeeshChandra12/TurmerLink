import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  BellIcon, 
  CurrencyRupeeIcon, 
  ExclamationTriangleIcon,
  CheckCircleIcon,
  InformationCircleIcon,
  EyeIcon,
  TrashIcon
} from '@heroicons/react/24/outline';

const Notifications = () => {
  const { t } = useTranslation();
  const [notifications, setNotifications] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadNotifications();
  }, []);

  const loadNotifications = () => {
    setLoading(true);
    // Mock data - in real app, this would come from API
    const mockNotifications = [
      {
        id: 1,
        type: 'price_alert',
        title: 'Price Alert: Turmeric prices increased',
        message: 'Nizamabad mandi price is now ₹8,500/kg, up by ₹200 from yesterday',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
        read: false,
        priority: 'high'
      },
      {
        id: 2,
        type: 'payment_alert',
        title: 'Payment Received',
        message: 'Payment of ₹45,000 has been credited to your account for sale on 15th Jan',
        timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
        read: false,
        priority: 'medium'
      },
      {
        id: 3,
        type: 'market_alert',
        title: 'MSP Update',
        message: 'Government has announced new MSP of ₹7,500/kg for turmeric',
        timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
        read: true,
        priority: 'high'
      },
      {
        id: 4,
        type: 'weather_alert',
        title: 'Weather Warning',
        message: 'Heavy rainfall expected in next 2 days. Consider harvesting early',
        timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
        read: true,
        priority: 'high'
      },
      {
        id: 5,
        type: 'learning',
        title: 'New Video Available',
        message: 'Watch our latest video on "Post-Harvest Processing Techniques"',
        timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
        read: false,
        priority: 'low'
      }
    ];

    setNotifications(mockNotifications);
    setLoading(false);
  };

  const getNotificationIcon = (type, priority) => {
    const iconClass = `h-5 w-5 ${
      priority === 'high' ? 'text-red-500' : 
      priority === 'medium' ? 'text-yellow-500' : 
      'text-blue-500'
    }`;

    switch (type) {
      case 'price_alert':
        return <CurrencyRupeeIcon className={iconClass} />;
      case 'payment_alert':
        return <CheckCircleIcon className={iconClass} />;
      case 'market_alert':
        return <ExclamationTriangleIcon className={iconClass} />;
      case 'weather_alert':
        return <ExclamationTriangleIcon className={iconClass} />;
      case 'learning':
        return <InformationCircleIcon className={iconClass} />;
      default:
        return <BellIcon className={iconClass} />;
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'border-l-red-500 bg-red-50';
      case 'medium':
        return 'border-l-yellow-500 bg-yellow-50';
      case 'low':
        return 'border-l-blue-500 bg-blue-50';
      default:
        return 'border-l-gray-500 bg-gray-50';
    }
  };

  const markAsRead = (id) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  const deleteNotification = (id) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  const filteredNotifications = notifications.filter(notification => {
    if (filter === 'all') return true;
    if (filter === 'unread') return !notification.read;
    return notification.type === filter;
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-gray-200 rounded w-1/4"></div>
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-20 bg-gray-200 rounded-xl"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {t('notifications')}
            </h1>
            <p className="text-gray-600">
              Stay updated with market prices, payments, and farming alerts
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <BellIcon className="h-6 w-6 text-gray-400" />
            {unreadCount > 0 && (
              <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                {unreadCount}
              </span>
            )}
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex space-x-1 bg-white rounded-lg p-1 shadow-sm mb-6">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              filter === 'all'
                ? 'bg-primary-600 text-white'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            All ({notifications.length})
          </button>
          <button
            onClick={() => setFilter('unread')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              filter === 'unread'
                ? 'bg-primary-600 text-white'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Unread ({unreadCount})
          </button>
          <button
            onClick={() => setFilter('price_alert')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              filter === 'price_alert'
                ? 'bg-primary-600 text-white'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Price Alerts
          </button>
          <button
            onClick={() => setFilter('payment_alert')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              filter === 'payment_alert'
                ? 'bg-primary-600 text-white'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Payments
          </button>
        </div>

        {/* Notifications List */}
        <div className="space-y-4">
          {filteredNotifications.length === 0 ? (
            <div className="bg-white rounded-xl shadow-lg p-8 text-center">
              <BellIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No notifications
              </h3>
              <p className="text-gray-500">
                {filter === 'unread' 
                  ? 'All notifications have been read'
                  : 'No notifications match the selected filter'
                }
              </p>
            </div>
          ) : (
            filteredNotifications.map((notification) => (
              <div
                key={notification.id}
                className={`bg-white rounded-xl shadow-lg border-l-4 ${getPriorityColor(notification.priority)} ${
                  !notification.read ? 'ring-2 ring-primary-200' : ''
                }`}
              >
                <div className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      {getNotificationIcon(notification.type, notification.priority)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h3 className={`text-lg font-semibold ${
                          !notification.read ? 'text-gray-900' : 'text-gray-700'
                        }`}>
                          {notification.title}
                        </h3>
                        <div className="flex items-center space-x-2">
                          {!notification.read && (
                            <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                          )}
                          <span className="text-sm text-gray-500">
                            {notification.timestamp.toLocaleDateString('en-IN', {
                              month: 'short',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </span>
                        </div>
                      </div>
                      <p className="mt-2 text-gray-600">
                        {notification.message}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      {!notification.read && (
                        <button
                          onClick={() => markAsRead(notification.id)}
                          className="text-primary-600 hover:text-primary-700 p-1"
                          title="Mark as read"
                        >
                          <EyeIcon className="h-4 w-4" />
                        </button>
                      )}
                      <button
                        onClick={() => deleteNotification(notification.id)}
                        className="text-gray-400 hover:text-red-500 p-1"
                        title="Delete notification"
                      >
                        <TrashIcon className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Quick Actions */}
        <div className="mt-8 bg-gradient-to-r from-primary-500 to-turmeric-500 rounded-xl p-6 text-white">
          <h3 className="text-xl font-semibold mb-4">Notification Settings</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg p-4 text-left transition-colors">
              <div className="font-medium">Price Alerts</div>
              <div className="text-sm opacity-90">Daily price updates</div>
            </button>
            <button className="bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg p-4 text-left transition-colors">
              <div className="font-medium">Payment Alerts</div>
              <div className="text-sm opacity-90">Payment notifications</div>
            </button>
            <button className="bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg p-4 text-left transition-colors">
              <div className="font-medium">Weather Alerts</div>
              <div className="text-sm opacity-90">Weather warnings</div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notifications;
