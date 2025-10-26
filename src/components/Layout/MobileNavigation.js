import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, Link } from 'react-router-dom';
import {
  HomeIcon,
  BookOpenIcon,
  AcademicCapIcon,
  BellIcon,
  UserIcon,
  Bars3Icon,
  XMarkIcon
} from '@heroicons/react/24/outline';

const MobileNavigation = ({ user, onLogout, onLanguageToggle }) => {
  const { t } = useTranslation();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const navigationItems = [
    {
      name: t('dashboard'),
      href: '/dashboard',
      icon: HomeIcon,
      current: location.pathname === '/dashboard'
    },
    {
      name: t('ledger'),
      href: '/ledger',
      icon: BookOpenIcon,
      current: location.pathname === '/ledger'
    },
    {
      name: t('learning'),
      href: '/learning',
      icon: AcademicCapIcon,
      current: location.pathname === '/learning'
    },
    {
      name: t('notifications'),
      href: '/notifications',
      icon: BellIcon,
      current: location.pathname === '/notifications'
    }
  ];

  // Add admin link for admin users
  if (user?.role === 'admin') {
    navigationItems.push({
      name: 'Admin',
      href: '/admin',
      icon: UserIcon,
      current: location.pathname === '/admin'
    });
  }

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* Mobile menu button */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
        <div className="flex items-center justify-around py-2">
          {navigationItems.slice(0, 4).map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                to={item.href}
                onClick={handleLinkClick}
                className={`flex flex-col items-center space-y-1 px-3 py-2 rounded-lg transition-colors ${
                  item.current
                    ? 'text-primary-600 bg-primary-50'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Icon className="h-5 w-5" />
                <span className="text-xs font-medium">{item.name}</span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Mobile hamburger menu */}
      <div className="md:hidden fixed top-4 right-4 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-white rounded-lg shadow-lg p-2"
        >
          {isOpen ? (
            <XMarkIcon className="h-6 w-6 text-gray-600" />
          ) : (
            <Bars3Icon className="h-6 w-6 text-gray-600" />
          )}
        </button>
      </div>

      {/* Mobile slide-out menu */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 z-40">
          <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setIsOpen(false)} />
          <div className="fixed right-0 top-0 h-full w-80 bg-white shadow-xl">
            <div className="p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-turmeric-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">T</span>
                  </div>
                  <span className="text-xl font-bold text-gray-900">TurmerLink</span>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <XMarkIcon className="h-6 w-6" />
                </button>
              </div>

              {/* User Info */}
              <div className="mb-8 p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                    <UserIcon className="h-6 w-6 text-primary-600" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">
                      {user?.name || 'Farmer'}
                    </div>
                    <div className="text-sm text-gray-500">
                      {user?.phoneNumber}
                    </div>
                  </div>
                </div>
              </div>

              {/* Navigation Items */}
              <div className="space-y-2 mb-8">
                {navigationItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      onClick={handleLinkClick}
                      className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                        item.current
                          ? 'bg-primary-100 text-primary-700'
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                      <span className="font-medium">{item.name}</span>
                    </Link>
                  );
                })}
              </div>

              {/* Actions */}
              <div className="space-y-4">
                <button
                  onClick={onLanguageToggle}
                  className="w-full flex items-center space-x-3 px-4 py-3 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <span className="text-lg">🌐</span>
                  <span className="font-medium">తెలుగు / English</span>
                </button>
                
                <button
                  onClick={onLogout}
                  className="w-full flex items-center space-x-3 px-4 py-3 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <span className="text-lg">🚪</span>
                  <span className="font-medium">{t('logout')}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add padding to main content for mobile navigation */}
      <div className="md:hidden pb-20" />
    </>
  );
};

export default MobileNavigation;
